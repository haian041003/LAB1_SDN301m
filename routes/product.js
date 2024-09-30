const router = require("express").Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/auth.middleware");

// ADD PRODUCT
router.post("/", authMiddleware, productController.addAProduct);

// GET ALL PRODUCTS
router.get("/", authMiddleware, productController.getAllProducts);

// GET A PRODUCT
router.get("/:id", authMiddleware, productController.getAProduct);

// UPDATE PRODUCT
router.put("/:id", authMiddleware, productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;