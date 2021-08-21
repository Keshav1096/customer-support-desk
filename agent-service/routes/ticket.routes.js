const express = require("express");
const router = express();
// define all your imports in here
const { createTicket } = require("../controller/ticket.ctrl");

//define your routes here
router.post("/", createTicket);

module.exports = router;
