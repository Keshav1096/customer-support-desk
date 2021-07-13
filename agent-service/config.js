require("dotenv").config();
let config = {
  db_uri:
    process.env.NODE_ENV === "development"
      ? process.env.db_uri
      : "mongodb://mongo:27017",
};

module.exports = config;
