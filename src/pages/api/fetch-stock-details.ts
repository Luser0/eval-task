import { TtickersResJson } from "@/types/TtickersResJson";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const stockDetailsRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${req.body.ticker.toUpperCase()}?apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    try {
      const stockDetailsResJson: TtickersResJson = await stockDetailsRes.json();

      res.status(stockDetailsRes.status).json(stockDetailsResJson);
    } catch (error) {
      res.status(500).send("");
    }
  } catch (error) {
    res.status(500).send("");
  }
};
