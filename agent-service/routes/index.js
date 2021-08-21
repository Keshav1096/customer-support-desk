const express = require("express");
const router = express();

// define all your imports in here
const userRouter = require("./user.routes");
const ticketRouter = require("./ticket.routes");

//define your routes here
router.use("/user", userRouter);
router.use("/ticket", ticketRouter);

module.exports = router;
