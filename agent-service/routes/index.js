const express = require("express");
const router = express();
// define all your imports in here
const { createUser } = require("../controller");
router.post("/create", createUser);
module.exports = router;
