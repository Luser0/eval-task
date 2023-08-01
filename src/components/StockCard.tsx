import { TtickerInfoResults } from "@/types/TtickerInfoResults";
import Link from "next/link";

export default function StockCard({ ticker }: { ticker: TtickerInfoResults }) {
  return (
    <Link
      data-testid="stock-card-href"
      href={`/${ticker.ticker}`}
      className="p-4 border-2 border-black  bg-slate-600 rounded-md"
    >
      <p>{ticker.name}</p>
      <p>{ticker.ticker}</p>
    </Link>
  );
}
