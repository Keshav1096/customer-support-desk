const Redis = require("../helper/redis");
const _ = require("lodash");

const fetchRandomAgent = () => {
  return new Promise(async (resolve, reject) => {
    let agents = await Redis.get(`activeAgents`)
      .then(JSON.parse)
      .catch(() => []);
    let activeAgents = agents.filter((agent) => agent.agentStatus === "ACTIVE");
    if (activeAgents.length > 0) {
      return resolve(
        activeAgents[Math.floor(Math.random() * activeAgents.length)]
      );
    } else {
      return reject(new Error("No agent available"));
    }
  });
};
module.exports = { fetchRandomAgent };
