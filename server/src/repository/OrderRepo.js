const Order = require("../models/OrderModel");

const findOrder = async (filters) => {
  return await Order.findOne(filters);
};

const getAllOrders = async (filters) => {
  return await Order.find(filters);
};

const createOrder = async (order) => {
  const newOrder = new Order(order);
  return await newOrder.save();
};

const updateOrder = async (data) => {
  const { orderId, status } = data;
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId },
    { status },
    {
      new: true,
    }
  );
  return updatedOrder;
};

const deleteOrder = async (orderId) => {
  return await Order.deleteOne({ _id: orderId });
};
const cancelOrder = async (orderId) => {
  return await Order.findOneAndUpdate(
    { _id: orderId },
    { status: "cancel" },
    { new: true }
  );
};

module.exports = {
  findOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
};
