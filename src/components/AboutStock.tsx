import { TtickerDetailsResults } from "@/types/TtickerDetailsResults";

export default function AboutStock({
  tickerInfo,
}: {
  tickerInfo: TtickerDetailsResults;
}) {
  return (
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
  );
}
