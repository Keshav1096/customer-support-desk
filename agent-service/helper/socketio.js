const Redis = require("./redis");
const Rabbit = require("./rabbit");
const _ = require("lodash");

module.exports = (io) => {
  console.log("starting socket");
  io.on("connection", (socket) => {
    socket.on("agent-loggedin", async (data) => {
      let activeAgents = await Redis.get(`list_of_agents`)
        .then(JSON.parse)
        .catch((err) => []);
      data.socketId = socket.id;
      data.loggedInAt = new Date();
      // data.socket = socket;
      activeAgents.push(data);
      await Redis.set(`list_of_agents`, activeAgents);
      Rabbit.publish("agents-updated", activeAgents);
    });

    socket.on("disconnecting", async (data) => {
      console.log(`[DISCONNECT] ${data}`);
      console.log(`[DISCONNECT] ${socket.id}`);
      let activeAgents = await Redis.get(`list_of_agents`)
        .then(JSON.parse)
        .catch((err) => []);
      let updatedAgents = _.filter(
        activeAgents,
        (agent) => agent.socketId !== socket.id
      );
      await Redis.set(`list_of_agents`, updatedAgents);
      Rabbit.publish("agents-updated", updatedAgents);
    });
  });
};
