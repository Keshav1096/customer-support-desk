require("dotenv").config();

let mode = process.env.NODE_ENV;
let config = {};
switch (mode) {
  case "development":
    config = {
      db_uri: process.env.db_uri,
      redis_port: process.env.redis_port,
      jwt_token:
        "6cee0639885c437100dd73db635b97eca9320052ebe0e04ba7abdd7817bbb9973d4797714132e77ceeffb6c2ce140b41123b6746d7026b103b8ccdd5ca94a561",
    };
    break;
  case "production":
    config = {
      db_uri: "mongodb://mongo:27020",
      redis_port: "6379",
      jwt_token:
        "6cee0639885c437100dd73db635b97eca9320052ebe0e04ba7abdd7817bbb9973d4797714132e77ceeffb6c2ce140b41123b6746d7026b103b8ccdd5ca94a561",
    };
    break;
  default:
    config = {
      db_uri: "mongodb://mongo:27020",
      redis_port: "6379",
      jwt_token:
        "6cee0639885c437100dd73db635b97eca9320052ebe0e04ba7abdd7817bbb9973d4797714132e77ceeffb6c2ce140b41123b6746d7026b103b8ccdd5ca94a561",
    };
    break;
}
module.exports = config;
