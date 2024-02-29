const { Schema, model } = require('mongoose');

const User = new Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: String, ref: "Role" }]
})

const Busket = new Schema({
	username: { type: String, unique: true, required: true },
	items: [{
		itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
		quantity: { type: Number, default: 1 },
	}],
	totalPrice: { type: Number, default: 0 },
})

module.exports = model('User', User);