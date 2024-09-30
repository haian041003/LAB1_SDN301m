const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth.middleware");

// ADD CATEGORY
router.post("/", authMiddleware, categoryController.addCategory);

// GET ALL CATEGORIES
router.get("/", authMiddleware, categoryController.getAllCategories);

// GET A CATEGORY
router.get("/:id", authMiddleware, categoryController.getACategory);

// UPDATE CATEGORY
router.put("/:id", authMiddleware, categoryController.updateCategory);

// DELETE CATEGORY
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;