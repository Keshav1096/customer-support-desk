const { Ticket } = require("../models");
const { generateUuid, generateTicketId } = require("../utils/uuid");
const { fetchRandomAgent } = require("./fetchAgents");

function createNewTicket(priority, tags) {
  return new Promise(async (resolve, reject) => {
    if (!priority || !tags.length) return reject("Invalid parameters");
    let assignedTo = await fetchRandomAgent().catch(() => null);
    let ticketId = generateTicketId();
    if (!assignedTo) return reject("No agent Available");
    let newTicketData = {
      ticketId: ticketId,
      assignedTo: assignedTo.userId,
      priority: priority,
      tags: tags,
      isResolved: false,
    };
    let ticketToSave = Ticket(newTicketData);
    ticketToSave
      .save()
      .then((data) => {
        // console.log(data);
        return resolve(data);
      })
      .catch((err) => reject(err));
  });
}

module.exports = { createNewTicket };
