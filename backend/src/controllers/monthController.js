// controllers/monthController.js
import mongoose from "mongoose";
import Month from "../models/Month.js";

/**
 * GET /api/months
 */
export const listMonths = async (req, res) => {
  try {
    const months = await Month.find({ userId: req.user.id });
    res.json(months);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * POST /api/months
 */
export const createMonth = async (req, res) => {
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
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /api/months/:monthId
 */
export const getMonth = async (req, res) => {
  try {
    const month = await Month.findById(req.params.monthId);
    if (!month) return res.status(404).json({ error: "Month not found" });

    if (month.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(month);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * PATCH /api/months/:monthId
 */
export const updateMonth = async (req, res) => {
  try {
    const month = await Month.findById(req.params.monthId);
    if (!month) return res.status(404).json({ error: "Month not found" });

    if (month.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updates = { ...req.body };

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
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * DELETE /api/months/:monthId
 */
export const deleteMonth = async (req, res) => {
  try {
    const month = await Month.findById(req.params.monthId);
    if (!month) return res.status(404).json({ error: "Month not found" });

    if (month.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Month.findByIdAndDelete(req.params.monthId);
    res.json({ message: "Month deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
