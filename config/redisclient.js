const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: "DT2ea5MMjNXZNGKoaDLq0xbSSGOihAqw",
  socket: {
    host: "redis-18738.c273.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 18738,
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");

    await redisClient.set("foo", "bar");
    const result = await redisClient.get("foo");
    console.log("Redis Test:", result);
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
};


connectRedis();

module.exports = redisClient;