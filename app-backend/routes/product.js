const express = require('express');

const productController = require('../controllers/product');
const {
  productValidationRules,
  productValidate,
} = require('../validators/product.validator');

const router = express.Router();

// GET /product/list
router.get('/list', productController.getProducts);

// POST /product/save
router.post(
  '/save',
  productValidationRules(),
  productValidate,
  productController.saveProduct
);

module.exports = router;
