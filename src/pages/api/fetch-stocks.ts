import { TtickersResJson } from "@/types/TtickersResJson";
import Redis from "ioredis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let fetchUrl: string;

  let cacheToSet: string;
  const redis = new Redis(process.env.REDIS_URL as string);
  let cache;

  //i can prob refactor this into somthing nicer but this works for now
  if (req.query.firstFetch === "true") {
    fetchUrl =
      "https://api.polygon.io/v3/reference/tickers?market=stocks&exchange=XNAS&active=true&order=asc&limit=50&sort=name&apiKey=" +
      process.env.POLYGON_API_KEY;

    cache = await redis.get("firstFetch");
    cacheToSet = "firstFetch";

    if (cache) {
      res.send(cache);
      return;
    }
  } else if (
    req.query.nextTickerFetchUrl &&
    typeof req.query.nextTickerFetchUrl === "string"
  ) {
    fetchUrl =
      req.query.nextTickerFetchUrl + "&apiKey=" + process.env.POLYGON_API_KEY;

    cache = await redis.get("nextTickerFetchUrl");
    cacheToSet = req.query.nextTickerFetchUrl;

    if (cache) {
      res.send(cache);
      return;
    }
  } else {
    res.status(500).json({ err: "invalid query" });
    return;
  }

  try {
    const stocksRes = await fetch(fetchUrl);
    try {
      const stocksResJson: TtickersResJson = await stocksRes.json();
      res.status(stocksRes.status).json(stocksResJson);
      await redis.set(cacheToSet, JSON.stringify(stocksResJson), "EX", 60);
    } catch (error) {
      res.status(500).send("");
    }
  } catch (error) {
    res.status(500).send("");
  }
};
