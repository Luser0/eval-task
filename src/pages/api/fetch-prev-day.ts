import { TtickersResJson } from "@/types/TtickersResJson";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const stockPrevDayRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${req.body.ticker.toUpperCase()}/prev?adjusted=true&apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    try {
      const stockPrevDayResJson: TtickersResJson = await stockPrevDayRes.json();
      res.status(stockPrevDayRes.status).json(stockPrevDayResJson);
    } catch (error) {
      res.status(500).send("");
    }
  } catch (error) {
    res.status(500).send("");
  }
};
