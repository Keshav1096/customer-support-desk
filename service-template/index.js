const express = require("express");
const morganBody = require("morgan-body");
const app = express();
const port = 8050;
const Routes = require("./routes");
const LogSchema = require("./models/logger");

//initializing processes
require("./database");

const loggerStream = {
  write: (message) => {
    // do anything - emit to websocket? send message somewhere? log to cloud?
    try {
      let logObj = LogSchema({
        log: message,
      });
      logObj.save();
    } catch (err) {
      console.log(err);
    }
  },
};

//defining middelwares
app.use(express.json());
morganBody(app, {
  stream: loggerStream,
});

//defining routes
app.get("/", (req, res) => {
  res.send("Service template");
});

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`service template on port ${port}`);
});
