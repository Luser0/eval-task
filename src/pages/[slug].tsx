import { TprevDayInfo } from "@/types/TprevDayInfo";
import { TtickerDetailsResults } from "@/types/TtickerDetailsResults";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function stockPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tickerInfo, setTickerInfo] = useState<TtickerDetailsResults>();
  const [prevDayInfo, setPrevDayInfo] = useState<TprevDayInfo>();

  useEffect(() => {
    if (router.query.slug) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker: router.query.slug }),
      };

      fetch("/api/fetch-stock-details", options)
        .then((detailsRes) => detailsRes.json())
        .then((detailsRes) => {
          fetch("/api/fetch-prev-day", options)
            .then((prevDayRes) => prevDayRes.json())
            .then((prevDayRes) => {
              setTickerInfo(detailsRes.results);
              setPrevDayInfo(prevDayRes);
              setIsLoading(false);
            });
        });
    }
  }, [router.query.slug]);

  return (
    <div>
      {isLoading ? (
        <img
          className="aspect-square w-16 mx-auto"
          src="/Youtube_loading_symbol_1_(wobbly).gif"
        ></img>
      ) : (
        <div className="container mx-auto">
          <Link href="/" className="text-4xl p-2 rounded-md">
            {"<"}
          </Link>
          <div className="flex gap-2">
            {tickerInfo?.branding.icon_url ? (
              <img
                src={`${tickerInfo?.branding.icon_url}?apiKey=${""}`}
                className="row-span-2 h-32 aspect-square"
                alt=""
              />
            ) : (
              <div className="row-span-2 h-32 items-center justify-center text-4xl flex aspect-square">
                <p>{tickerInfo?.ticker.slice(0, 2)}</p>
              </div>
            )}
            <div className="flex flex-col">
              <h1>{tickerInfo?.name}</h1>
              <p>{tickerInfo?.ticker}</p>
            </div>
          </div>
          {prevDayInfo ? (
            <div className="grid grid-cols-3">
              <div>
                <p>Close</p>
                <p>{prevDayInfo?.results[0].c}</p>
              </div>
              <div>
                <p>Open</p>
                <p>{prevDayInfo?.results[0].o}</p>
              </div>
              <div>
                <p>High</p>
                <p>{prevDayInfo?.results[0].h}</p>
              </div>
              <div>
                <p>Low</p>
                <p>{prevDayInfo?.results[0].l}</p>
              </div>
              <div>
                <p>Volume</p>
                <p>{prevDayInfo?.results[0].v}</p>
              </div>
            </div>
          ) : null}
          <div className="p-4 flex w-full gap-4 flex-col border-2 rounded-md">
            <div className="flex w-full justify-between">
              <p className="font-bold text-2xl">About</p>
              {tickerInfo?.homepage_url ? (
                <a
                  className="rounded-sm underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={tickerInfo.homepage_url}
                >
                  Visit website
                </a>
              ) : null}
            </div>
            {tickerInfo?.sic_description ? (
              <div className="flex flex-col">
                <p className="font-bold text-lg">Industry</p>
                <p>{tickerInfo.sic_description}</p>
              </div>
            ) : null}

            {tickerInfo?.description ? (
              <div className="flex flex-col">
                <p className="font-bold text-lg">Description</p>
                <p>{tickerInfo.description}</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
