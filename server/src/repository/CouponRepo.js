const Coupon = require('../models/CouponModel');

const createCoupon = async (data) => {
	const newCoupon = new Coupon(data);
	return await newCoupon.save();
};
const getAllCoupons = async (userId) => {
	const coupons = await Coupon.findAll({
		startDate: {
			$gte: new Date(),
		},
		expiredDate: {
			$lte: new Date(),
		},
		used: {$ne: userId},
	});
	return coupons;
};
const useCoupon = async (userId, couponId) => {
	return Coupon.findOneAndUpdate(
		{_id: couponId},
		{
			$addToSet: {
				used: userId,
			},
		}
	);
};
module.exports = {
	createCoupon,
	getAllCoupons,
	useCoupon,
};
