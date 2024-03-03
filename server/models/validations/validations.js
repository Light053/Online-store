const { check, validationResult } = require('express-validator');

const productValidationRules = () => {
	return [
		check('name').notEmpty().withMessage('Name is required'),
		check('brand').optional(),
		check('model').optional(),
		check('description').optional(),
		check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
		check('quantity').optional().isNumeric().withMessage('Quantity must be a number'),
		check('category').optional(),
		check('specifications.*.name').optional(),
		check('specifications.*.value').optional(),
		check('images.*').optional(),
		check('rating').optional().isNumeric().withMessage('Rating must be a number'),
		check('reviews.*.user').optional(),
		check('reviews.*.text').optional(),
		check('reviews.*.rating').optional().isNumeric().withMessage('Review rating must be a number'),
		check('availability').optional(),
	];
};

const addReviewValidationRules = () => {
	return [
		check('review').notEmpty().withMessage('Review text is required'),
	];
};

const getProductValidationRules = () => {
	return [
		check('name').notEmpty().withMessage('Device name is required')
	]
}

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	return res.status(400).json({ errors: errors.array() });
};

module.exports = { productValidationRules, addReviewValidationRules, getProductValidationRules, validate };
