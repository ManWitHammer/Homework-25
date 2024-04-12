const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	sale: {
		type: Number,
		required: true
	}
})

const UserModel = mongoose.model('products', userShema)

module.exports = UserModel
