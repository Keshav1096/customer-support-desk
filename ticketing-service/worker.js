// add all requires here
const { consume } = require("./controller/rabbitmq");
const Redis = require("./helper/redis");

module.exports = () => {
  // consume all messages here
  consume("agents-updated", async (data) => {
    try {
      data = typeof data === "string" ? JSON.parse(data) : data;
      if (data) {
        // write your logic here
        console.log(data);
        await Redis.set("activeAgents", data);
      }
    } catch (err) {}
  });
};
