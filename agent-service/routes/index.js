const express = require("express");
const router = express();
// define all your imports in here
const { createUser, updateAgentStatus, loginAgent } = require("../controller");
router.post("/signup", createUser);
router.post("/login", loginAgent);
router.post("/update/status", updateAgentStatus);
module.exports = router;
