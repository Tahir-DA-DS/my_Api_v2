const redisClient = require("../config/redisclient");
require("dotenv").config({ path: __dirname + "/../.env" });

const CACHE_TTL = process.env.CACHE_TTL || 3600;

const cacheMiddleware = async (req, res, next) => {
  try {
    const cachedData = await redisClient.get(req.originalUrl);
    if (cachedData) {
      console.log("Cache Hit:", req.originalUrl);
      try {
        return res.json(JSON.parse(cachedData)); 
      } catch (parseError) {
        console.error("Error parsing cached data:", parseError);
      }
    }

    console.log("Cache Miss:", req.originalUrl);

    res.locals.cache = async (data) => {
      try {
        await redisClient.setEx(req.originalUrl, CACHE_TTL, JSON.stringify(data));
      } catch (redisErr) {
        console.error("Error caching data in Redis:", redisErr);
      }
    };

    next();
  } catch (err) {
    console.error("Error retrieving data from Redis:", err);
    next();
  }
};

module.exports = cacheMiddleware;
