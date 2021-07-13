const { consume } = require("./controller/rabbitmq");
const { updateUser } = require("./logic/user.logic");

// consume workspace created message
module.exports = () => {
  // console.log("rabbitmq listening");
  consume("workspace_created", (data) => {
    console.log("WORKER " + data);
    try {
      data = typeof data === "string" ? JSON.parse(data) : data;
      if (data) {
        updateUser({ userId: data.users[0], workspaces: data.workspaceId });
      }
    } catch (err) {}
  });
  consume("workspace_updated", (data) => {});
};

// module.exports = { rabbitMqConsume };
