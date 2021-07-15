const express = require("express");
const app = express();
const port = 3001;
const Routes = require("./routes");

//initializing processes

require("./database");
require("./worker")();


const httpServer = require("http").createServer(app);
const options = {};
const io = require("socket.io")(httpServer, options);
require("./helper/socketio")(io);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Agent service");
});

app.use("/api/user", Routes);

httpServer.listen(port, () => {
  console.log(`Agent service on port ${port}`);
});
