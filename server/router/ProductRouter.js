const Router = require('express');
const productController = require('../controllers/ProductController')
const { check } = require('express-validator')
const router = new Router();

router.post('/setProduct', productController.setProduct);
router.post('/addReview', productController.addReview);


module.exports = router