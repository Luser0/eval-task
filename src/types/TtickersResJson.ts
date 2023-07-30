import { TtickerInfo } from "./TtickerInfo";

export type TtickersResJson = {
  count: number;
  next_url: string;
  request_id: string;
  results: TtickerInfo[];
  status: "OK" | "ERROR";
};
