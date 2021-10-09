/**
 * Server file for reference
 */

//this is a server file from kesav 1 test

const app = require("express")();
const httpServer = require("http").createServer(app);
const port = 3000;
const options = {
  /* ... */
};
const io = require("socket.io")(httpServer, options);

let user = {};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("user-register", (data) => {
    // console.log(data.id);
    user[data.id] = { socketId: socket.id, socket: socket };
    console.log(user);
  });
});
httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
