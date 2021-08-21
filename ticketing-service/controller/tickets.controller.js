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

  let { priority, tags } = body;
  if (!priority || !tags)
    // return res.status(400).json({ success: false, err: "Invalid body" });
    return res.publish({ status: 400, message: "Params missing" });
  let ticketData = await createNewTicket(priority, tags).catch((err) => {
    return res.publish({ status: 500, message: err.message });
  });

  if (!ticketData) {
    return res.publish({ status: 500, message: "Unable to create ticket" });
  }
  return res.publish({ status: 200, message: "", data: ticketData });
};

module.exports = { getAllTicketsPaginated, createTicket };
