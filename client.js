const io = require("socket.io-client");
const socket = io("http://127.0.0.1:3001");

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
let data = {
  workspaces: [],
  email: "janani@howlyst.com",
  name: "janani",
  userId: "1626269616701",
  username: "jananihowlystcom",
  agentStatus: "ACTIVE",
};
socket.emit("agent-loggedin", data);
