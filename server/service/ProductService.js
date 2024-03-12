const ApiError = require("../exceptions/ApiError");
const Item = require("../models/productsModels/Item");
const { User, Basket } = require("../models/userModels/User");

class ProductService {

	async createUserBasket(username) {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				console.log('username', username);
				throw new Error('User not found');
			}

			const basket = await Basket.create({ user: user._id, username, items: [], totalPrice: 0 });
			user.basket = basket._id;
			await user.save();

			return basket;
		} catch (error) {
			throw error;
		}
	}



	async setItemBasket(name, username, countItems) {
		try {
			const user = await User.findOne({ username });
			if (!user) {
				throw new Error('User not found');
			}

			const product = await Item.findOne({ name });
			if (!product) {
				throw new Error('Product not found');
			}

			const existingItemIndex = user.basket.items.findIndex(item => item.itemId.equals(product._id));

			if (countItems < 0 && existingItemInBasket) {
				user.basket.items[existingItemInBasket].quantity -= Math.abs(countItems);
			}

			if (existingItemIndex === -1) {
				user.basket.items.push({ itemId: product._id, quantity: countItems });
			} else {
				user.basket.items[existingItemIndex].quantity += countItems;
				console.log(user.basket.items[existingItemIndex].quantity);
			}

			await user.save();

			const totalPrice = product.price * countItems;

			let basket = await Basket.findOne({ user: user._id });

			if (!basket) {
				basket = await Basket.create({ user: user._id, items: [], totalPrice: 0 });
			}
			const existingItemInBasket = basket.items.findIndex(item => item.itemId.equals(product._id));

			if (existingItemInBasket === -1) {
				basket.totalPrice += totalPrice;
				basket.items.push({ itemId: product._id, quantity: countItems });
			} else {
				console.log('уже существует в баскете');
				basket.items[existingItemInBasket].quantity += countItems;
				basket.totalPrice = basket.totalPrice * countItems;
			}
			await basket.save();

			return { user, basket };
		} catch (error) {
			throw error;
		}
	}



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

	async getProductsFromUserBasket(username) {
		try {

			const user = await User.findOne({ username });
			const userId = user._id

			const basket = await Basket.findOne({ user: userId });
			if (!basket) {
				throw new Error('Basket not found for this user');
			}

			let productIds = [];

			basket.items.forEach(item => {
				productIds.push(item.itemId);
			});

			const products = await Item.find({ _id: { $in: productIds } });
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
