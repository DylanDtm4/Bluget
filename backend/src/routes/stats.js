import express from "express";
import { getYearlySummary } from "../controllers/statsController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

// GET /years/summary?year=2025
router.get("/summary", auth, getYearlySummary);

export default router;
