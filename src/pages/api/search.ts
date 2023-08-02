import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ticker = req.query.ticker;
  if (!ticker || typeof ticker != "string") {
    res.status(400).send("");
    return;
  }

  const redis = new Redis(process.env.REDIS_URL as string);

  let cache = await redis.get(ticker.toUpperCase() + "-search");
  if (cache) {
    res.send(cache);
    return;
  }

  try {
    const searchRes = await fetch(
      `https://api.polygon.io/v3/reference/tickers?ticker=${ticker.toUpperCase()}&active=true&apiKey=${
        process.env.POLYGON_API_KEY
      }`
    );
    const searchResJson = await searchRes.json();
    res.json(searchResJson.results[0]);

    await redis.set(
      req.body.ticker + "-search",
      JSON.stringify(searchResJson.results[0]),
      "EX",
      60
    );
  } catch (error) {
    res.status(500).send("");
    console.log(error);
  }
};
