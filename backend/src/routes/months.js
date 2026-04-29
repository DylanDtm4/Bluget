const auth = require("../middleware/auth");
const getMonthlySummary = require("../controllers/summaryController");
const getRangeSummary = require("../controllers/rangeController");
const express = require("express");
const router = express.Router();

// GET /months/summary?month=2025-01
router.get("/summary", auth, getMonthlySummary);
// GET /months/range?start=YYYY-MM&end=YYYY-MM
router.get("/range", auth, getRangeSummary);

module.exports = router;
