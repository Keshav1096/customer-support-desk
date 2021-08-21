const express = require("express");
const router = express();
// define all your imports in here
const authenticate = require("../middlewares/authenticate");
const { createUser, updateAgentStatus, loginAgent } = require("../controller");

//define your routes here
router.post("/signup", createUser);
router.post("/login", loginAgent);
router.patch("/status", authenticate, updateAgentStatus);

module.exports = router;
