const express = require('express');

const productController = require('../controllers/ProductController');
const verify = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get(
	'/:month',
	verify.verifyUser,
	verify.verifyAdmin,
	productController.statistic
);

module.exports = router;
