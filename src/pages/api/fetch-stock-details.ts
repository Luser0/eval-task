import { TtickersResJson } from "@/types/TtickersResJson";
import Redis from "ioredis";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const redis = new Redis(process.env.REDIS_URL as string);

  if (!req.body.ticker) {
    res.status(400).send("");
    return;
  }

  let cache = await redis.get(req.body.ticker.toUpperCase() + "-details");
  if (cache) {
    res.json(cache);
    return;
  }

  try {
    const stockDetailsRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${req.body.ticker.toUpperCase()}?apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    try {
      const stockDetailsResJson: TtickersResJson = await stockDetailsRes.json();
      res.status(stockDetailsRes.status).json(stockDetailsResJson);
      await redis.set(
        req.body.ticker + "-details",
        JSON.stringify(stockDetailsResJson),
        "EX",
        60
      );
    } catch (error) {
      res.status(500).send("");
    }
  } catch (error) {
    res.status(500).send("");
  }
};
