const Item = require("../models/Item");
const User = require("../models/User");
const ProductService = require("../service/ProductService");

class ProductController {

	async setProduct(req, res, next) {
		try {
			const productData = await ProductService.setProduct(req.body);

			res.status(200).json(productData);
		} catch (error) {

			next(error)
		}
	}

	async addReview(req, res, next) {
		try {
			const { review, productName, userName } = req.body;

			const user = await User.findOne({ username: userName });
			const product = await Item.findOne({ name: productName });

			if (!product) {
				return res.status(404).json({ error: "Продукт не найден" });
			}

			const updatedProduct = await ProductService.addReview(product, review, user._id);

			console.log('отзыв добавлен');
			res.status(200).json(updatedProduct);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new ProductController();
