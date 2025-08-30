import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

/**
 * GET /api/transactions/:monthId
 */
export const listTransactions = async (req, res) => {
  const { monthId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(monthId)) {
    return res.status(400).json({ error: "Invalid month ID" });
  }

  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
      monthId,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * POST /api/transactions/:monthId
 */
export const createTransaction = async (req, res) => {
  const userId = req.user.id;
  const { monthId } = req.params;
  const { value, categoryType, category, note, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(monthId)) {
    return res.status(400).json({ error: "Invalid month ID" });
  }

  try {
    // default to today if no date provided
    const transactionDate =
      date && date.length > 0 ? date : new Date().toISOString().slice(0, 10);

    // validate required fields
    if (!value || !categoryType || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTransaction = new Transaction({
      userId,
      monthId,
      value,
      categoryType,
      category,
      date: transactionDate,
      note: note || "",
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /api/transactions/:transactionId
 */
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * PATCH /api/transactions/:transactionId
 */
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updates = { ...req.body };

    // prevent unsafe updates
    if ("userId" in updates || "monthId" in updates) {
      return res
        .status(400)
        .json({ error: "You cannot update userId or monthId." });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.transactionId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * DELETE /api/transactions/:transactionId
 */
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Transaction.findByIdAndDelete(req.params.transactionId);
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
