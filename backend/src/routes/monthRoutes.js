import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";
import { validateMonthId } from "../middleware/validation.js";
import Month from "../models/Month.js";

const router = express.Router();

router.use(authMiddleware);

// GET /api/months — list all months of user
router.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const months = await Month.find({ userId });
    res.json(months);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/months - create new month report
router.post("/", async (req, res) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const currentMonthString = new Date().toISOString().slice(0, 7);

  try {
    const existingMonth = await Month.findOne({
      userId,
      month: currentMonthString,
    });
    if (existingMonth) {
      return res.status(409).json({ error: "Month already exists" });
    }

    const newMonth = new Month({
      userId,
      month: currentMonthString,
      netValue: 0,
      transactions: [],
    });

    const savedMonth = await newMonth.save();
    res.status(201).json(savedMonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/months/:monthId
router.get("/:monthId", validateMonthId, async (req, res) => {
  try {
    const month = await Month.findById(req.params.monthId);
    if (!month) return res.status(404).json({ error: "Month not found" });

    if (month.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(month);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/months/:monthId
router.patch("/:monthId", validateMonthId, async (req, res) => {
  try {
    const month = await Month.findById(req.params.monthId);
    if (!month) return res.status(404).json({ error: "Month not found" });

    if (month.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updates = { ...req.body };

    // Consider whitelisting allowed fields here
    if ("month" in updates || "userId" in updates) {
      return res.status(400).json({ error: "You cannot update these values." });
    }

    const updatedMonth = await Month.findByIdAndUpdate(
      req.params.monthId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updatedMonth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/months/:monthId
router.delete("/:monthId", validateMonthId, async (req, res) => {
  try {
    const month = await Month.findById(req.params.monthId);
    if (!month) return res.status(404).json({ error: "Month not found" });

    if (month.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Month.findByIdAndDelete(req.params.monthId);
    res.json({ message: "Month deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
