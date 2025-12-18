const auth = require("../middleware/auth");
const {
	getYearlyStats,
	getMonthlyTrends,
} = require("../controllers/statsController.js");
const express = require("express");
const router = express.Router();

// GET /years/summary?year=2025
router.get("/summary", auth, getYearlyStats);

module.exports = router;
