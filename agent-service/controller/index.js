const { createUser, updateAgentStatus, loginAgent } = require("./agents.ctrl");
const { createWorkSpace } = require("./workspace.ctrl");

module.exports = { createUser, updateAgentStatus, loginAgent, createWorkSpace };
