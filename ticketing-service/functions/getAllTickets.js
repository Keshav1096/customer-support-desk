const { Ticket } = require("../models");
function getAllTickets(assignedTo) {
  return new Promise(async (resolve, reject) => {
    let query = assignedTo ? { assignedTo } : {};

    let ticketData = await Ticket.find(query).catch((err) => {
      return reject(err);
    });
    if (!ticketData) return reject("Error in getting ticket details");

    return resolve(ticketData);
  });
}

module.exports = { getAllTickets };
