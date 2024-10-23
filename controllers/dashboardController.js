// controllers/dashboardController.js
const { Product, Category } = require('../model/model');

const dashboardController = {
  login: (req, res) => {
    const error = req.query.error;
    const token = req.header('Authorization')?.split(' ')[1] ?? req.cookies['x-auth-token'];
    if (!token) {
      res.render('login', { layout: false, ...(error && { error: 'Username or password is incorrect' }) });
    } else {
      res.redirect('/dashboard');
    }
  },

  redirectToManageProduct: (req, res) => {
    res.redirect('/dashboard/manage-product');
  },

  manageProduct: async (req, res) => {
    const products = await Product.find();
    // add category name to product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const category = await Category.findById(product.category);
      product.categoryName = category.name;
    }
    res.render('manage-product', { products });
  },

  addProductForm: async (req, res) => {
    const categories = await Category.find();
    try {
      res.render('product-form', { categories });
    } catch (error) {
      console.dir(error);
      throw error;
    }
  },

  editProductForm: async (req, res) => {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find();
    res.render('product-form', { product, categories });
  },

  manageCategory: async (req, res) => {
    const categories = await Category.find();
    res.render('manage-category', { categories });
  },

  addCategoryForm: (req, res) => {
    res.render('category-form');
  },

  editCategoryForm: async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render('category-form', { category });
  },
};

module.exports = dashboardController;
