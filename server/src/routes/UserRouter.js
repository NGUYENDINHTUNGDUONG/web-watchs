const express = require('express');

const userController = require('../controllers/UserController');
const verify = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/sign-up', userController.registerUser);
router.post('/sign-in', userController.loginUser);
router.patch('/', verify.verifyUser, userController.updatedUser);
router.delete('/', verify.verifyUser, userController.deletedUser);
router.get('/', verify.verifyUser, userController.getUser);
router.get(
  '/list',
  verify.verifyUser,
  verify.verifyAdmin,
  userController.getAllUsers
);
router.post('/forgot-password', userController.forgotPassword);
router.post(
  '/reset-password/:resetPasswordToken',
  verify.verifyUser,
  userController.resetPassword
);
router.post('/refresh-token', userController.refreshToken);
router.post('/log-out', userController.logoutUser);

module.exports = router;
