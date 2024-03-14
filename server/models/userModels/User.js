const { Schema, model } = require('mongoose');

const Basket = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	username: { type: String },
	items: [{
		itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
		quantity: { type: Number, default: 1 },
		price: { type: Number }
	}],
	totalPrice: { type: Number, default: 0 },
});
const User = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	basket: { type: Basket },
	roles: [{ type: String, ref: "Role" }]
});

module.exports = {
	User: model('User', User),
	Basket: model('Basket', Basket)
};
