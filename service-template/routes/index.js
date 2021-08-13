const express = require("express");
const router = express();

// define all your imports in here
const { search, filters } = require("../controller");

router.get("/search/movie", search);
router.get("/filters", filters);

module.exports = router;
