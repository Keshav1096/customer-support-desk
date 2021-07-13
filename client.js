const io = require("socket.io-client");
const socket = io("http://127.0.0.1:3000");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.emit("user-register", { email: "kesav", id: 12345 });
