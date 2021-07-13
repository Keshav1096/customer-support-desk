// add all requires here
const { consume } = require("./controller/rabbitmq");

module.exports = () => {
  // consume all messages here
  // consume("queue", (data) => {
  //   try {
  //     data = typeof data === "string" ? JSON.parse(data) : data;
  //     if (data) {
  //       // write your logic here
  //     }
  //   } catch (err) {}
  // });
};
