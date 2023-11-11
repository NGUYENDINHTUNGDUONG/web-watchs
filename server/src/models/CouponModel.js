const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
	{
		code: {type: String, required: true, minLength: 8, maxLength: 16},
		startDate: {
			type: Date,
			required: true,
		},
		expiredDate: {
			type: Date,
			required: true,
		},
		discountPercent: {
			type: Number,
			required: true,
		},
		minimumPurchaseAmount: Number,
		maximumDiscountAmount: Number,
		used: [mongoose.ObjectId],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

// Tạo chỉ mục cho tên sản phẩm
const CouponModel = mongoose.model('Coupon', couponSchema);

module.exports = CouponModel;
