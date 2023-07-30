import { TtickerInfo } from "@/types/TtickerInfo";

export default function StockCard({
  ticker,
  idx,
}: {
  ticker: TtickerInfo;
  idx: number;
}) {
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
}
