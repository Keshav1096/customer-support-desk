const { createNewTicket } = require("../functions/tickets");

const createTicket = async (req, res) => {
  let { body } = req;

  let { priority, tags } = body;
  if (!priority || !tags)
    return res.publish({ status: 400, message: "Params missing" });
  let ticketData = await createNewTicket(priority, tags).catch((err) => {
    return res.publish({ status: 500, message: err.message });
  });

  if (!ticketData) {
    return res.publish({ status: 500, message: "Unable to create ticket" });
  }
  return res.publish({ status: 200, message: "", data: ticketData });
};
module.exports = { createTicket };
