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
router.get('/', verify.verifyUser, couponController.getCoupons);
router.post('/used', verify.verifyUser, couponController.useCoupons);
module.exports = router;
