const { Product, Category } = require("../model/model");

const productController = {
  //ADD A PRODUCT
  addAProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      if (req.body.category) {
        const category = Category.findById(req.body.category);
        await category.updateOne({ $push: { products: savedProduct._id } });
      }
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET ALL PRODUCTS
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A PRODUCT
  getAProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate("category");
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE PRODUCT
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE PRODUCT
  deleteProduct: async (req, res) => {
    try {
      await Category.updateMany(
        { products: req.params.id },
        { $pull: { products: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = productController;

