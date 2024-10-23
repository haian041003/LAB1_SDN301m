// routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const accessRoutesMiddleware = require('../middleware/access-routes.middleware');

router.get('/login', dashboardController.login);

router.get('/', dashboardController.redirectToManageProduct);

router.get('/manage-product', accessRoutesMiddleware, dashboardController.manageProduct);

router.get('/manage-product/add-product', accessRoutesMiddleware, dashboardController.addProductForm);

router.get('/manage-product/:id', accessRoutesMiddleware, dashboardController.editProductForm);

router.get('/manage-category', accessRoutesMiddleware, dashboardController.manageCategory);

router.get('/manage-category/add-category', accessRoutesMiddleware, dashboardController.addCategoryForm);

router.get('/manage-category/:id', accessRoutesMiddleware, dashboardController.editCategoryForm);

module.exports = router;