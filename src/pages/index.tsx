import useFetchStocks from "@/hooks/useFetchStocks";
import { TtickerInfo } from "@/types/TtickerInfo";
import { TtickersResJson } from "@/types/TtickersResJson";
import { useEffect, useState } from "react";

export default function Home() {
  const [tickers, setTickers] = useState<TtickerInfo[]>([]);
  const [needToLoad, setNeedToLoad] = useState<boolean>(false);
  const [rateLimitHit, setRateLimitHit] = useState<boolean>(false);

  const {
    data: tickersData,
    loading,
    error,
    callback,
  }: {
    data: TtickersResJson;
    loading: any;
    error: any;
    callback: any;
  } = useFetchStocks();

  useEffect(() => {
    if (tickersData) {
      if (tickersData.status == "OK") {
        setTickers(tickers.concat(tickersData.results));
      } else {
        setRateLimitHit(true);
      }
    }
  }, [tickersData]);

  useEffect(() => {
    if (needToLoad) {
      callback();
      setNeedToLoad(false);
    }
  }, [needToLoad]);

  function handleScroll() {
    if (
      window.innerHeight + Math.round(document.documentElement.scrollTop) ===
        document.documentElement.offsetHeight &&
      !needToLoad
    ) {
      setNeedToLoad(true);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      onScroll={handleScroll}
      className="flex flex-col gap-4 container mx-auto "
    >
      <input
        type="text"
        id="search"
        placeholder="search"
        className="p-2 border-2 text-black border-slate-700 rounded-md "
      />

      {loading && (
        <img
          className="aspect-square w-16 mx-auto"
          src="/Youtube_loading_symbol_1_(wobbly).gif"
        ></img>
      )}

      {rateLimitHit && <p>Rate Limit Hit</p>}
      {tickers &&
        !rateLimitHit &&
        tickers.map((ticker: TtickerInfo, idx) => {
          return (
            <a
              key={idx}
              href={`/${ticker.ticker}`}
              className="p-4 border-2 border-black  bg-slate-600 rounded-md"
            >
              <p>{ticker.name}</p>
              <p>{ticker.ticker}</p>
            </a>
          );
        })}

      {error && <p>{error}</p>}

      {needToLoad ? (
        <img
          className="aspect-square w-16 mx-auto"
          src="/Youtube_loading_symbol_1_(wobbly).gif"
        ></img>
      ) : null}
    </main>
  );
}
