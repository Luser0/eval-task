import Redis from "ioredis";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ticker = req.query.ticker;
  if (!ticker || typeof ticker != "string") {
    res.status(400).send("");
    return;
  }

  const redis = new Redis(process.env.REDIS_URL as string);

  let cache = await redis.get(ticker.toUpperCase() + "-details");
  if (cache) {
    res.send(cache);
    return;
  }

  try {
    const stockDetailsRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${ticker.toUpperCase()}?apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    try {
      const stockDetailsResJson = await stockDetailsRes.json();
      res.status(stockDetailsRes.status).json(stockDetailsResJson.results);
      await redis.set(
        ticker + "-details",
        JSON.stringify(stockDetailsResJson.results),
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
