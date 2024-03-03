const ApiError = require("../exceptions/ApiError");
const Item = require("../models/productsModels/Item");

class ProductService {

	async setProduct(req) {
		try {
			const {
				name, brand, model, description, price, quantity, category, images, specifications, rating, availability
			} = req.body;

			const device = await Item.findOne({ name });

			if (device) {
				throw ApiError.badRequest("A device with the same name already exists")
			}

			const product = await Item.create({
				name,
				brand,
				model,
				description,
				price,
				quantity,
				category,
				specifications,
				images,
				rating,
				reviews: [],
				availability
			});

			return product;

		} catch (error) {
			throw error;
		}
	}

	async addReview(product, reviewText, userId) {
		try {
			const review = {
				text: reviewText,
				user: userId
			};

			product.reviews.push(review);
			await product.save();

			return product;
		} catch (error) {
			console.log(error);
		}
	}

	async getProduct(name) {
		try {
			const products = await Item.findOne({ name });
			if (!products) {
				throw ApiError.badRequest(`There is no device named ${name}`)
			}
			return products;
		} catch (error) {
			throw error;
		}
	}

	async getProducts() {
		try {
			const products = await Item.find();
			return products;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new ProductService();
