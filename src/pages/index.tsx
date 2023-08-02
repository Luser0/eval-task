import StockCard from "@/components/StockCard";
import useFetchStocks from "@/hooks/useFetchStocks";
import { TtickerInfoResults } from "@/types/TtickerInfoResults";
import { useEffect, useState } from "react";

export default function Home() {
  const [tickers, setTickers] = useState<TtickerInfoResults[]>([]);
  const [needToLoad, setNeedToLoad] = useState<boolean>(false);
  const [rateLimitHit, setRateLimitHit] = useState<boolean>(false);

  const {
    data: tickersData,
    loading,
    error,
    callback,
  }: {
    data: TtickerInfoResults;
    loading: any;
    error: any;
    callback: any;
  } = useFetchStocks();

  useEffect(() => {
    if (tickersData) {
      setTickers(tickers.concat(tickersData));
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
        tickers.map((ticker: TtickerInfoResults, idx) => {
          return <StockCard ticker={ticker} key={idx} />;
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
