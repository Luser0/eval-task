import { TtickersResJson } from "@/types/TtickersResJson";
import { useState, useEffect } from "react";

function useFetchStocks() {
  const [data, setData] = useState<any>(undefined);
  const [firstFetch, setFisrtFetch] = useState<boolean>(true);
  const [nextTickerFetchUrl, setNextTickerFetchUrl] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  function callback() {
    setLoading(true);
    setData(undefined);
    setError("");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstFetch: firstFetch,
        nextTickerFetchUrl: nextTickerFetchUrl,
      }),
    };
    fetch("/api/fetch-stocks", options)
      .then((res) => res.json())
      .then((res: TtickersResJson) => {
        setData(res);
        setLoading(false);
        setFisrtFetch(false);
        setNextTickerFetchUrl(res.next_url);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError("fetch error");
      });
  }
  useEffect(() => {
    callback();
  }, []);

  return { data, loading, error, callback };
}

export default useFetchStocks;
