const express = require("express");

const router = express.Router();

const { getTop10Cities } = require("../controllers/citiesControllers");

router.get("/top10", getTop10Cities);

module.exports = router;
