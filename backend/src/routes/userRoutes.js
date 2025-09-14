// routes/userRoutes.js
import express from "express";
import {
  deleteUser,
  getUser,
  listUsers,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";
import {
  authMiddleware,
  authorizeUserOrAdmin,
  isAdmin,
} from "../middleware/auth.js";
import { validateUserId } from "../middleware/validation.js";

const router = express.Router();

// apply authentication middleware globally
router.use(authMiddleware);

// Admin only - list all users
router.get("/", isAdmin, listUsers);

// Authenticated - user actions
router.get("/:userId", validateUserId, authorizeUserOrAdmin, getUser);
router.patch("/:userId", validateUserId, authorizeUserOrAdmin, updateUser);
router.patch(
  "/password/:userId",
  validateUserId,
  authorizeUserOrAdmin,
  updateUserPassword
);
router.delete("/:userId", validateUserId, authorizeUserOrAdmin, deleteUser);

export default router;
