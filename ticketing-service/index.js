const express = require("express");
const app = express();
const port = 3002;
const Routes = require("./routes");

//initializing processes
require("./database");
require("./worker")();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ticketing Service");
});

app.use("/api/tickets", Routes);

app.listen(port, () => {
  console.log(`Ticketing Service on port ${port}`);
});
