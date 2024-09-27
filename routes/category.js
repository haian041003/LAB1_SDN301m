const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

//ADD CATEGORY
router.post("/", categoryController.addCategory);

//GET ALL CATEGORIES
router.get("/", categoryController.getAllCategories); //

//GET A CATEGORY
router.get("/:id", categoryController.getACategory);

//UPDATE A CATEGORY
router.put("/:id", categoryController.updateCategory);

//DELETE CATEGORY
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
