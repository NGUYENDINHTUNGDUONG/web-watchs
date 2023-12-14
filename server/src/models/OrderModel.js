const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
	{
		orderItem: [
			{
				_id: {type: mongoose.Types.ObjectId, required: true},
				name: {type: String, required: true},
				amount: {type: Number, required: true},
				image: {type: String, required: true},
				price: {type: Number, required: true},
				product: {
					type: String,
					// join bảng Product
					// type: mongoose.Schema.Types.ObjectId,
					// ref: 'Product',
					// required: true,
				},
				isReview: {type: Boolean, default: false},
			},
		],
		shippingAddress: {
			fullName: {type: String, required: true},
			address: {type: String, required: true},
			city: {type: String, required: true},
			country: {type: String, required: true},
			phone: {type: Number, required: true},
		},
		paymentMethod: {type: String, required: true},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		fullName: {type: String},
		status: {type: String, default: 'pending'},
		totalPrice: {type: Number},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
