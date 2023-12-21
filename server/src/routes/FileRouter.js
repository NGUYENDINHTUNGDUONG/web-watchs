const express = require('express');
const upload = require('../utils/Multer');

const verify = require('../middlewares/AuthMiddleware');
const router = express.Router();

router.post(
	'/',
	verify.verifyUser,
	verify.verifyAdmin,
	upload.array('images'),
	(req, res, next) => {
		try {
			const images = req.files.map((file) => file.filename);
			res.status(200).json({images});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;