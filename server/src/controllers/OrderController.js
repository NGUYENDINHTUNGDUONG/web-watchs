const OrderRepo = require('../repository/OrderRepo');
const ProductRepo = require('../repository/ProductRepo');
const UserRepo = require('../repository/userRepo');

const Mail = require('../mail/OrderMail');

// --Admin--
const getAllOrders = async (req, res, next) => {
	try {
		const orders = await OrderRepo.getAllOrders({});
		return res.status(200).json({message: 'All Orders', data: orders});
	} catch (error) {
		next(error);
	}
};

const getDetailOrder = async (req, res, next) => {
	try {
		const orderId = req.params.id;
		const order = await OrderRepo.findOrder({_id: orderId});
		if (!order) {
			return res.status(400).json({message: 'Order not found'});
		}
		return res.status(200).json({data: order});
	} catch (error) {
		next(error);
	}
};
const updateOrder = async (req, res, next) => {
	try {
		const orderId = req.params.id;
		const order = await OrderRepo.updateOrder(orderId, req.body.status);
		if (!order) {
			return res.status(400).json({message: 'Order not found'});
		}
		return res.status(200).json({message: 'Update Order', data: order});
	} catch (error) {
		next(error);
	}
};

// --User
const createOrder = async (req, res, next) => {
	try {
		const order = await OrderRepo.createOrder({
			...req.body,
			userId: req.payload._id,
			fullName: req.payload.fullName,
		});
		if (!order) {
			return res.status(400).json({message: 'Order not found'});
		}
		await UserRepo.increseOrderNumber(req.payload._id);
		const listProductNames = order.orderItem.map((item) => item.name);
		order.orderItem.forEach(async (item) => {
			await ProductRepo.updateAmountProduct(item.id, item.amount);
		});
		void Mail.sendEmailCreateOrderProduct({
			fullName: req.payload.fullName,
			email: req.payload.email,
			orderId: order.id,
			listProductNames,
			amount,
		});
		return res.status(200).json({message: 'Order success', data: order});
	} catch (error) {
		next(error);
	}
};

const getAllOrderUser = async (req, res, next) => {
	try {
		const userId = req.payload.id;
		const order = await OrderRepo.getAllOrders({userId});
		if (!order) {
			return res.status(400).json({message: 'Order not found'});
		}
		return res.status(200).json({message: 'All Orders', data: order});
	} catch (error) {
		next(error);
	}
};
const cancelOrder = async (req, res, next) => {
	try {
		const orderId = req.params.id;
		const order = await OrderRepo.findOrder({_id: orderId});
		if (!order) {
			return res.status(400).json({message: 'Order not found'});
		}
		if (order.status !== 'pending') {
			return res.status(400).json({message: 'cannot cancel this order'});
		}
		const cancelOrder = await OrderRepo.cancelOrder(orderId);
		return res.status(200).json({message: 'Cancel Order', data: cancelOrder});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createOrder,
	updateOrder,
	getAllOrders,
	getAllOrderUser,
	getDetailOrder,
	cancelOrder,
};
