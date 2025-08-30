import express from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/refresh-token", refreshToken);

// Protected routes
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logoutUser);

export default router;
