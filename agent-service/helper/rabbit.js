// const open = require("amqplib").connect("amqp://localhost:5672");

// // Publisher
// function publish(q, data) {
//   data = typeof data !== "string" ? JSON.stringify(data) : data;
//   return open
//     .then(function (conn) {
//       return conn.createChannel();
//     })
//     .then(function (ch) {
//       return ch.assertQueue(q).then(function (ok) {
//         return ch.sendToQueue(q, Buffer.from(data));
//       });
//     })
//     .catch(console.warn);
// }

// // Consumer
// async function consume(q, callback) {
//   console.log("[RabbitMQ] listening to " + q);
//   let conn = await open;
//   let ch = await conn.createChannel();
//   await ch.assertQueue(q);
//   return ch.consume(q, (msg) => {
//     if (msg !== null) {
//       ch.ack(msg);
//       callback(msg.content.toString());
//     }
//   });
// }
// module.exports = { publish, consume };
