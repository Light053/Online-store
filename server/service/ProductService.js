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
			const allProducts = await Item.find()

			const indexOfProduct = allProducts.findIndex(p => p.name === product.name)

			if (!product) {
				throw new Error('Product not found');
			}

			const existingItemIndex = user.basket.items.findIndex(item => item.itemId.equals(product._id));


			if (existingItemIndex === -1) {
				user.basket.items.push({ itemId: product._id, quantity: countItems, price: product.price * countItems });
			} else {
				user.basket.items[existingItemIndex].quantity += countItems;
				user.basket.totalPrice += user.basket.totalPrice
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
				basket.items.push({ itemId: product._id, quantity: countItems, price: product.price * countItems });
			} else {
				basket.items[existingItemInBasket].quantity += countItems;
				basket.items[existingItemInBasket].price += product.price;
				basket.totalPrice = basket.totalPrice * countItems;
				allProducts[indexOfProduct].quantity += 1;
				basket.totalPrice += product.price;
			}

			if (countItems <= 0 && existingItemInBasket) {
				user.basket.items[existingItemInBasket].quantity + - countItems;
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
				name, brand, type, model, description, price, quantity = 1, category, images, specifications, rating, availability
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
			const name = product.name;
			const p = await Item.find({ name });
			const userId = await User.find({ username: user })
			const prod = p[0];

			const review = {
				text: reviewText,
				username: user,
				user: userId._id,
				rating,
			};

			prod.reviews.push(review);

			const totalRating = prod.reviews.reduce((sum, review) => sum + review.rating, 0);
			const averageRating = (totalRating / prod.reviews.length).toFixed(1);
			prod.rating = parseFloat(averageRating);
			console.log(prod.rating);
			await prod.save();
			return prod;
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
			if (!user) {
				throw new Error('User not found');
			}

			const basket = await Basket.findOne({ user: user._id });
			if (!basket) {
				throw new Error('Basket not found for this user');
			}

			const productIds = basket.items.map(item => item.itemId);

			let products = await Item.find({ _id: { $in: productIds } });

			products = products.filter(product => {
				const basketItem = basket.items.find(item => item.itemId.equals(product._id));
				return basketItem && basketItem.quantity > 0;
			});

			products.forEach(product => {
				const basketItem = basket.items.find(item => item.itemId.equals(product._id));
				if (basketItem) {
					product.quantity = basketItem.quantity;
				}
			});

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
