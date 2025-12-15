import express from "express";
import { getMonthlySummary } from "../controllers/summaryController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

// GET /months/summary?month=2025-01
router.get("/summary", auth, getMonthlySummary);

export default router;
