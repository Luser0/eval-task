import { TtickersResJson } from "@/types/TtickersResJson";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let fetchUrl = "";
  if (req.query.firstFetch) {
    fetchUrl =
      "https://api.polygon.io/v3/reference/tickers?market=stocks&exchange=XNAS&active=true&order=asc&limit=50&sort=name&apiKey=" +
      process.env.POLYGON_API_KEY;
  } else {
    fetchUrl =
      req.query.nextTickerFetchUrl + "&apiKey=" + process.env.POLYGON_API_KEY;
  }
  try {
    const stocksRes = await fetch(fetchUrl);
    try {
      const stocksResJson: TtickersResJson = await stocksRes.json();

      res.status(stocksRes.status).json(stocksResJson);
    } catch (error) {
      res.status(500).send("");
    }
  } catch (error) {
    res.status(500).send("");
  }
};
