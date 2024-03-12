const ApiError = require("../exceptions/ApiError");
const Item = require("../models/productsModels/Item");
const User = require("../models/userModels/User");

class ProductService {

	async setProduct(req) {
		try {
			const {
				name, brand, type, model, description, price, quantity = 10000, category, images, specifications, rating, availability
			} = req.body;

			const device = await Item.findOne({ name });

			if (device) {
				throw ApiError.badRequest("A device with the same name already exists")
			}

			const product = await Item.create({
				name,
				brand,
				type,
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

	async addReview(product, reviewText, user, rating) {
		try {
			const review = {
				text: reviewText,
				username: user.username,
				user: user,
				rating,
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
			const product = await Item.findOne({ name });
			if (!product) {
				throw ApiError.badRequest(`There is no device named ${name}`)
			}
			return product;
		} catch (error) {
			throw error;
		}
	}

	async getProducts(limit, offset, type = 'Smartphone', brand = '') {
		try {
			let query = { type };
			if (brand !== '') {
				query.brand = brand;
			}

			const products = await Item.find(query)
				.skip(offset)
				.limit(limit);
			return products;
		} catch (error) {
			throw error;
		}
	}


	async getReviews(name) {
		try {
			const product = await Item.findOne({ name });
			if (!product) {
				throw ApiError.badRequest(`There is no device named ${name}`)
			}
			const reviews = product.reviews;
			return reviews;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new ProductService();
