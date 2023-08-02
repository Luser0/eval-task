import StockCard from "@/components/StockCard";
import useFetchStocks from "@/hooks/useFetchStocks";
import { TtickerInfoResults } from "@/types/TtickerInfoResults";
import { useEffect, useState } from "react";

export default function Home() {
  const [tickers, setTickers] = useState<TtickerInfoResults[]>([]);
  const [needToLoad, setNeedToLoad] = useState<boolean>(false);
  const [rateLimitHit, setRateLimitHit] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TtickerInfoResults>();

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

  useEffect(() => {
    if (searchTerm == "") {
      setSearching(false);
      setSearchOpen(false);
      setSearchResults(undefined);
      setNeedToLoad(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setSearching(true);
      setSearchOpen(true);
      fetch(`/api/search?ticker=${searchTerm}`)
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res);
          setSearching(false);
        })
        .catch(() => {});
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <main
      onScroll={handleScroll}
      className="flex flex-col gap-4 container mx-auto "
    >
      <input
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val.currentTarget.value);
        }}
        type="text"
        id="search"
        placeholder="search"
        className="p-2 border-2 text-black border-slate-700 rounded-md "
      />

      {!searching && !searchResults && searchOpen && <p>No Results Found</p>}
      {searchResults && searchOpen && <StockCard ticker={searchResults} />}

      {loading ||
        (searching && (
          <img
            className="aspect-square w-16 mx-auto"
            src="/Youtube_loading_symbol_1_(wobbly).gif"
          ></img>
        ))}

      {rateLimitHit && <p>Rate Limit Hit</p>}
      {tickers &&
        !rateLimitHit &&
        !searchOpen &&
        tickers.map((ticker: TtickerInfoResults, idx) => {
          return <StockCard ticker={ticker} key={idx} />;
        })}

      {needToLoad ? (
        <img
          className="aspect-square w-16 mx-auto"
          src="/Youtube_loading_symbol_1_(wobbly).gif"
        ></img>
      ) : null}
    </main>
  );
}
