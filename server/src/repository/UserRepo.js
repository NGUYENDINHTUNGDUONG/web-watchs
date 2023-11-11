const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const findUser = async (filters) => {
	return await User.findOne(filters);
};

const getAllUsers = async (filters) => {
	return await User.find(filters);
};

const comparePassword = async (password, userPassword) => {
	return await bcrypt.compare(password, userPassword);
};

const deleteUser = async (UserId) => {
	return await User.deleteOne({_id: UserId});
};

const createUser = async (user) => {
	const newUser = new User(user);
	return await newUser.save();
};

const updateUser = async (data) => {
	const {userId, update} = data;
	const updatedUser = await User.findOneAndUpdate({_id: userId}, update, {
		new: true,
	});
	return updatedUser;
};

const increseOrderNumber = async (userId, amount) => {
	await User.findOneAndUpdate(
		{_id: userId},
		{
			$inc: {orderNumber: amount},
		}
	);
};

module.exports = {
	findUser,
	getAllUsers,
	comparePassword,
	deleteUser,
	createUser,
	updateUser,
	increseOrderNumber,
};
