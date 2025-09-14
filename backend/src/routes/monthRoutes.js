// routes/monthRoutes.js
import express from "express";
import {
  createMonth,
  deleteMonth,
  getMonth,
  listMonths,
  updateMonth,
} from "../controllers/monthController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validateMonthId } from "../middleware/validation.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listMonths); // GET /api/months
router.post("/", createMonth); // POST /api/months
router.get("/:monthId", validateMonthId, getMonth); // GET /api/months/:monthId
router.patch("/:monthId", validateMonthId, updateMonth); // PATCH /api/months/:monthId
router.delete("/:monthId", validateMonthId, deleteMonth); // DELETE /api/months/:monthId

export default router;
