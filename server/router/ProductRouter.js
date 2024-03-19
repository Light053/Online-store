const Router = require('express');
const productController = require('../controllers/ProductController')
const { check } = require('express-validator');
const { productValidationRules, addReviewValidationRules, validate, getProductValidationRules } = require('../models/validations/validations');
const router = new Router();

router.post('/setProduct', productValidationRules(), validate, productController.setProduct);
router.post('/addReview', addReviewValidationRules(), validate, productController.addReview);
router.post('/basket', productController.setItemBasket);

router.get('/products', productController.getProducts);
router.get('/basketProducts', productController.getProductsFromBasket);
router.get('/product', getProductValidationRules(), validate, productController.getProduct);
router.get('/reviews', productController.getReviews)
module.exports = router