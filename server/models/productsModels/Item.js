const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
	name: { type: String, required: true },
	type: String,
	brand: String,
	model: String,
	description: String,
	price: { type: Number, required: true },
	quantity: { type: Number, default: 0 },
	category: String,
	specifications: [{
		name: String,
		value: String
	}],
	images: [String],
	rating: { type: Number, default: 5 },
	reviews: [{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		username: String,
		text: String,
		rating: Number,
		createdAt: { type: Date, default: Date.now }
	}],
	availability: { type: String, default: 'in stock' }
});


module.exports = model('Item', ItemSchema);
