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
			const { review, productName, rating, username } = req.body;
			const product = await Item.findOne({ name: productName });

			if (!product) {
				return res.status(404).json({ error: "Продукт не найден" });
			}

			const updatedProduct = await ProductService.addReview(product, review, username, rating,);

			console.log('отзыв добавлен');
			res.status(200).json(updatedProduct);
		} catch (error) {
			next(error);
		}
	}

	async getProduct(req, res, next) {
		try {

			const { name } = req.query;
			console.log('in get product, name = ', name);
			const products = await ProductService.getProduct(name);

			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			next(ApiError.badRequest(error.message))
		}
	}

	async getProducts(req, res, next,) {
		try {
			let { limit, page, type, brand } = req.query
			page = page || 1;
			limit = limit || 9;
			let offset = page * limit - limit

			const products = await ProductService.getProducts(limit, offset, type, brand)

			res.status(200).json(products);
		} catch (error) {
			console.log(error);
			next(ApiError.badRequest(error.message))
		}
	}

	async getReviews(req, res, next) {
		try {
			const { name } = req.query;
			console.log('get reviews:', name);
			const reviews = await ProductService.getReviews(name)
			res.status(200).json(reviews)
		} catch (error) {
			console.log(error);
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new ProductController();
