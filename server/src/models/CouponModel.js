const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
	{
		code: {type: String, required: true, minLength: 8, maxLength: 16},
		startDate: {
			type: Date,
			required: true,
		},
		expiredDate: {
			type: Number,
			default: 0,
		},
		discountPercent: {
			type: Number,
			required: true,
		},
		minimumPurchaseAmount: Number,
		maximumDiscountAmount: Number,
		used: [mongoose.Schema.Types.ObjectId],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

// Tạo chỉ mục cho tên sản phẩm
const CouponModel = mongoose.model('Coupon', couponSchema);

module.exports = CouponModel;
