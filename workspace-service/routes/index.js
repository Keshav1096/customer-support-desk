const express = require("express");
const router = express();
const { createWorkSpace } = require("../controllers");

router.post("/create", createWorkSpace);

module.exports = router;
