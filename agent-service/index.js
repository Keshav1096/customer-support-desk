const express = require("express");
const app = express();
const port = 3001;
const Routes = require("./routes");
const { verifyToken } = require("./utils/jwt");

//initializing processes

require("./database");
// require("./worker")();

const httpServer = require("http").createServer(app);
const options = {};
const io = require("socket.io")(httpServer, options);
require("./helper/socketio")(io);

app.use(express.json());

app.get("/health-check", (req, res) => res.send("Health OK"));

app.use("/api", (req, res, next) => {
  req.authenticate = async () => {
    let token = req.headers.authorization.split(" ")[1];
    let isAuth = await verifyToken(token).catch((err) => false);
    if (!isAuth)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorised", data: {} });
  };

  res.publish = ({ success = true, status, message = "", data = {} }) => {
    res.status(status).json({
      success,
      message,
      data,
    });
  };
  next();
});

app.get("/", (req, res) => {
  res.send("Howlyst Inbox");
});

app.use("/api", Routes);

httpServer.listen(port, () => {
  console.log(`Howlyst Inbox on port ${port}`);
});
