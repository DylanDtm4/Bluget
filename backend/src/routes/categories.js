const auth = require("../middleware/auth");
const {
	getCategories,
	addCategory,
	renameCategory,
	deleteCategory,
} = require("../controllers/categoriesController.js");
const express = require("express");
const router = express.Router();

// GET /categories
router.get("/", auth, getCategories);
// POST /categories
router.post("/", auth, addCategory);
// PUT /categories/:name
router.put("/:name", auth, renameCategory);
// DELETE /categories/:name
router.delete("/:name", auth, deleteCategory);

module.exports = router;
