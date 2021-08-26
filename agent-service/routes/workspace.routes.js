const express = require("express");
const router = express();
const { createWorkSpace } = require("../controller");

router.post("/create", createWorkSpace);

module.exports = router;
