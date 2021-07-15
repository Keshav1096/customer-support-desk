const { getAllTickets } = require("../functions/getAllTickets");
const { createNewTicket } = require("../functions/createTicket");

const getAllTicketsPaginated = (req, res) => {
  let { agentId = null } = req.query;
  getAllTickets(agentId).then((tickets) => {
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  });
};

const createTicket = async (req, res) => {
  let { body } = req;

  if (!body)
    return res.status(400).json({ success: false, err: "Invalid body" });
  let { priority, tags } = body;
  let ticketData = await createNewTicket(priority, tags).catch((err) => {
    // return res.status(500).json({
    //   success: false,
    //   err: err,
    // });
    return null;
  });
  // console.log(ticketData);
  if (!ticketData) {
    return res.status(500).json({
      success: false,
      err: "Unable to create ticket",
    });
  }
  return res.status(200).json({
    success: true,
    data: ticketData,
  });
};

module.exports = { getAllTicketsPaginated, createTicket };
