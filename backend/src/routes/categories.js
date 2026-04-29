const auth = require("../middleware/auth");
const {
	getCategories,
	getCategoryById,
	addCategory,
	addCategories,
	updateCategory,
	deleteCategory,
	clearCategories,
} = require("../controllers/categoriesController.js");
const express = require("express");
const router = express.Router();

// POST /categories/bulk
router.post("/bulk", auth, addCategories);
// GET /categories
router.get("/", auth, getCategories);
// DELETE /categories
router.delete("/", auth, clearCategories);

// POST /categories
router.post("/", auth, addCategory);
// GET /categories/:id
router.get("/:id", auth, getCategoryById);
// PUT /categories/:id
router.put("/:id", auth, updateCategory);
// DELETE /categories/:id
router.delete("/:id", auth, deleteCategory);

module.exports = router;
