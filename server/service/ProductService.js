const ApiError = require("../exceptions/ApiError");
const Item = require("../models/Item");

class ProductService {

	async setProduct(
		{ name, brand, model, description, price, quantity, category, specifications, images, rating, reviews, availability }
	) {

		try {
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
			throw error
		}
	}


	async addReview(product, reviewText, userId) {
		try {

			const review = {
				text: reviewText,
				user: userId
			}

			product.reviews.push(review);

			await product.save();

			return product
		} catch (error) {
			console.log(error);
		}

	}
}

module.exports = new ProductService();
