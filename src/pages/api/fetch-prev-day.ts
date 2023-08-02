import Redis from "ioredis";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ticker = req.query.ticker;
  if (!ticker || typeof ticker != "string") {
    res.status(400).send("");
    return;
  }

  const redis = new Redis(process.env.REDIS_URL as string);

  let cache = await redis.get(ticker.toUpperCase() + "-prev-day");
  if (cache) {
    res.send(cache);
    return;
  }

  try {
    const stockPrevDayRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker.toUpperCase()}/prev?adjusted=true&apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    try {
      const stockPrevDayResJson = await stockPrevDayRes.json();
      res.status(stockPrevDayRes.status).json(stockPrevDayResJson.results[0]);
      await redis.set(
        ticker + "-prev-day",
        JSON.stringify(stockPrevDayResJson.results[0]),
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
