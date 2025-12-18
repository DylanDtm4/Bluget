const auth = require("../middleware/auth");
const getMonthlySummary = require("../controllers/summaryController");
const express = require("express");
const router = express.Router();

// GET /months/summary?month=2025-01
router.get("/summary", auth, getMonthlySummary);

module.exports = router;
