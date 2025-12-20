const auth = require("../middleware/auth");
const {
	getYearlyStats,
	getMonthlyTrends,
} = require("../controllers/statsController.js");
const express = require("express");
const router = express.Router();

// GET /stats/summary?year=2025
router.get("/summary", auth, getYearlyStats);
// GET /stats/trends?year=2025
router.get("/trends", auth, getMonthlyTrends);

module.exports = router;
