const open = require("amqplib").connect("amqp://localhost:5672");

// Publisher
function publish(q, data) {
  data = typeof data !== "string" ? JSON.stringify(data) : data;
  console.log(data);
  return open
    .then(function (conn) {
      return conn.createChannel();
    })
    .then(function (ch) {
      return ch.assertQueue(q).then(function (ok) {
        return ch.sendToQueue(q, Buffer.from(data));
      });
    })
    .catch(console.warn);
}

module.exports = { publish };
