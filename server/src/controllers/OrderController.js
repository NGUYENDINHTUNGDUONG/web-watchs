const mongoose = require("mongoose");

const OrderRepo = require("../repository/OrderRepo");
const ProductRepo = require("../repository/ProductRepo");
const UserRepo = require("../repository/userRepo");

const Mail = require("../mail/OrderMail");

// --Admin--
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderRepo.getAllOrders({});
    return res.status(200).json({ message: "All Orders", data: orders });
  } catch (error) {
    next(error);
  }
};

const getDetailOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await OrderRepo.findOrder({ _id: orderId });
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    return res.status(200).json({ data: order });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await OrderRepo.updateOrder(orderId, req.body.status);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Update Order", data: order });
  } catch (error) {
    next(error);
  }
};

// --User
const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const order = await OrderRepo.createOrder(
      {
        ...req.body,
        userId: req.payload._id,
        fullName: req.payload.fullName,
      },
      session
    );
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    await UserRepo.increaseOrderNumber(req.payload._id, 1, session);

    const listProductNames = order.orderItem.map((item) => item.name);
    // order.orderItem.forEach(async (item) => {
    // 	await ProductRepo.updateAmountProduct(item.id, item.amount, session);
    // });

    for (let item of order.orderItem) {
      await ProductRepo.updateAmountProduct(item.product, -item.amount, session);
      await ProductRepo.updateSoldProduct(item.product, item.amount, session);
    }

    await session.commitTransaction();

    void Mail.sendEmailOrderProduct({
      fullName: req.payload.fullName,
      email: req.payload.email,
      orderId: order.id,
      listProductNames,
      // amount,
    }).catch((err) => console.log(err));

    return res.status(200).json({ message: "Order success", data: order });
  } catch (error) {
    await session.abortTransaction();
    res.statusCode = 400;
    next(error);
  } finally {
    await session.endSession();
  }
};

const getAllOrderUser = async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const order = await OrderRepo.getAllOrders({ userId });
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "All Orders", data: order });
  } catch (error) {
    next(error);
  }
};
const cancelOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await OrderRepo.findOrder({ _id: orderId });
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    if (order.status !== "pending") {
      return res.status(400).json({ message: "cannot cancel this order" });
    }
    const cancelOrder = await OrderRepo.cancelOrder(orderId);
    return res.status(200).json({ message: "Cancel Order", data: cancelOrder });
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
