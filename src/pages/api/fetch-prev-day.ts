import Redis from "ioredis";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const redis = new Redis(process.env.REDIS_URL as string);

  if (!req.body.ticker) {
    res.status(400).send("");
    return;
  }

  let cache = await redis.get(req.body.ticker.toUpperCase() + "-prev-day");
  if (cache) {
    res.send(cache);
    return;
  }

  try {
    const stockPrevDayRes = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${req.body.ticker.toUpperCase()}/prev?adjusted=true&apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    try {
      const stockPrevDayResJson = await stockPrevDayRes.json();
      res.status(stockPrevDayRes.status).json(stockPrevDayResJson.results[0]);
      await redis.set(
        req.body.ticker + "-prev-day",
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
