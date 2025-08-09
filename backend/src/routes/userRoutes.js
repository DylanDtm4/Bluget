import bcrypt from "bcrypt";
import express from "express";
import {
  authMiddleware,
  authorizeUserOrAdmin,
  isAdmin,
} from "../middleware/auth.js";
import { validateUserId } from "../middleware/validation.js";
import User from "../models/User.js";

const router = express.Router();

router.use(authMiddleware);

// GET /api/users — list all users (admin only)
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select("-passwordHash");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users — register new user (no auth required)
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res
        .status(400)
        .json({ error: "Username, email, and password required" });

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser)
      return res.status(409).json({ error: "Email already registered" });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email: email.toLowerCase().trim(),
      passwordHash,
      netValue: 0,
      income: [],
      expenses: [],
      savings: [],
      investments: [],
    });

    const savedUser = await newUser.save();
    const userToReturn = savedUser.toObject();
    delete userToReturn.passwordHash;

    res.status(201).json(userToReturn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/users/:userId — get user info
router.get(
  "/:userId",
  validateUserId,
  authorizeUserOrAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).select(
        "-passwordHash"
      );
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// PATCH /api/users/:userId — update user info
router.patch(
  "/:userId",
  validateUserId,
  authorizeUserOrAdmin,
  async (req, res) => {
    try {
      const updates = { ...req.body };

      // Prevent password updates here
      if ("password" in updates || "passwordHash" in updates) {
        return res
          .status(400)
          .json({ error: "Use dedicated route to update password" });
      }

      // Lowercase and trim email if being updated
      if ("email" in updates) {
        updates.email = updates.email.toLowerCase().trim();
      }

      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-passwordHash");

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// PATCH /api/users/:userId/password — update user password
router.patch(
  "/:userId/password",
  validateUserId,
  authorizeUserOrAdmin,
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.params.userId;

      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ error: "Current and new password are required" });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Verify current password
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      // Hash new password
      const saltRounds = 10;
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update passwordHash
      user.passwordHash = newHashedPassword;
      await user.save();

      res.json({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// DELETE /api/users/:userId — delete user
router.delete(
  "/:userId",
  validateUserId,
  authorizeUserOrAdmin,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
