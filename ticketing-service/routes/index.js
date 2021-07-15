const express = require("express");
const router = express();

// define all your imports in here
const { getAllTicketsPaginated, createTicket } = require("../controller");

// define your routes here
router.get("/getAllTickets", getAllTicketsPaginated);
router.post("/createTicket", createTicket);

module.exports = router;
