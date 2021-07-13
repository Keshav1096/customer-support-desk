const express = require("express");
const app = express();
const port = 3001;
const Routes = require("./routes");

//initializing processes

require("./database");
require("./worker")();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Agent service");
});

app.use("/api/user", Routes);

app.listen(port, () => {
  console.log(`Agent service on port ${port}`);
});
