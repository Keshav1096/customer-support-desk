const express = require("express");
const router = express();
// define all your imports in here
const { createUser, updateAgentStatus } = require("../controller");
router.post("/create", createUser);
router.post("/updateAgentStatus", updateAgentStatus);
module.exports = router;
