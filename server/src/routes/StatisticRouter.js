const express = require('express');

const StatisticController = require('../controllers/StatisticController');
const verify = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.get(
	'/',
	verify.verifyUser,
	verify.verifyAdmin,
	StatisticController.getStatistic
);

module.exports = router;