/**
 * Client file to mimic react component
 */
const io = require("socket.io-client");
const socket = io("http://127.0.0.1:3001");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
let data = {
  workspaces: [],
  email: "kesav@howlyst.com",
  name: "kesav",
  userId: "1628084634630",
  username: "kesavhowlystcom",
  agentStatus: "ACTIVE",
};
socket.emit("agent-loggedin", data);
