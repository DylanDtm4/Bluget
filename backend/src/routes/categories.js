const auth = require("../middleware/auth");
const {
	getCategories,
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
// PUT /categories/:name
router.put("/:name", auth, updateCategory);
// DELETE /categories/:name
router.delete("/:name", auth, deleteCategory);

module.exports = router;
