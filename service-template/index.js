const express = require("express");
const app = express();
const port = 3001;
const Routes = require("./routes");

//initializing processes
require("./database");
require("./worker")();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Service template");
});

app.use("/api/template", Routes);

app.listen(port, () => {
  console.log(`service template on port ${port}`);
});
