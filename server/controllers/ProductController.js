const ApiError = require("../exceptions/ApiError");
const Item = require("../models/productsModels/Item");
const User = require("../models/userModels/User");
const ProductService = require("../service/ProductService");

class ProductController {

	async setProduct(req, res, next) {
		try {
			const productData = await ProductService.setProduct(req);

			res.status(200).json(productData);
		} catch (error) {
			next(ApiError.badRequest(error.message))
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

	async getProduct(req, res, next) {
		try {
			const { name } = req.body;
			const products = await ProductService.getProduct(name);

			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			next(ApiError.badRequest(error.message))
		}
	}

	async getProducts(req, res, next) {
		try {
			const products = await ProductService.getProducts();

			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new ProductController();
