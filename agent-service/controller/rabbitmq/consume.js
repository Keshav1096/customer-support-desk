const open = require("amqplib").connect("amqp://localhost:5672");

// Consumer
async function consume(q, callback) {
  console.log("RabbitMQ listening to " + q);
  let conn = await open;
  let ch = await conn.createChannel();
  await ch.assertQueue(q);
  return ch.consume(q, (msg) => {
    if (msg !== null) {
      ch.ack(msg);
      callback(msg.content.toString());
    }
  });
}

module.exports = { consume };
