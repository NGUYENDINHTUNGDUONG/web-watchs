const express = require('express');

const couponController = require('../controllers/CouponController');
const verify = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post(
	'/',
	verify.verifyUser,
	verify.verifyAdmin,
	couponController.createCoupon
);
router.get('/', couponController.getCoupons);
router.post('/used', couponController.useCoupons);
module.exports = router;
