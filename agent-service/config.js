require("dotenv").config();

let mode = process.env.NODE_ENV;
let config = {};
switch (mode) {
  case "development":
    config = {
      db_uri: process.env.db_uri,
      redis_port: process.env.redis_port,
    };
    break;
  case "production":
    config = {
      db_uri: "mongodb://mongo:27020",
      redis_port: "6379",
    };
    break;
  default:
    config = {
      db_uri: "mongodb://mongo:27020",
      redis_port: "6379",
    };
    break;
}
module.exports = config;
