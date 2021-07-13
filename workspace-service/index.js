const express = require("express");
const app = express();
const port = 3000;

// defining imports
const Routes = require("./routes");
const db = require("./database");
//defining middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Agent service");
});

app.use("/api/workspace", Routes);

app.listen(port, () => {
  console.log(`Workspace on port ${port}`);
});
