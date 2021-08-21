let { v4: uuidv4 } = require("uuid");

const generateUuid = () => uuidv4();
const generateTicketId = () =>
  Math.random().toString(36).slice(2).toUpperCase();

module.exports = { generateUuid, generateTicketId };
