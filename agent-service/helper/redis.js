const config = require("../config");
const Redis = require("ioredis");

const redis = new Redis(config.redis_port);

const get = (key) => {
  return new Promise((resolve, reject) => {
    redis.get(key).then((data) => {
      if (!data) {
        return reject(new Error("[REDIS] no data"));
      } else {
        return resolve(data);
      }
    });
  });
};

const set = async (key, data, expiry) => {
  await redis.set(key, typeof data === "object" ? JSON.stringify(data) : data);
  if (expiry) {
    return redis.expire(key, expiry);
  }
  //172800 seconds is 2 days
  return redis.expire(key, 172800);
};

module.exports = { set, get };
