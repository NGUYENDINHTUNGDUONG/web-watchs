const express = require("express");

const orderController = require("../controllers/OrderController");
const verify = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/", verify.verifyUser, orderController.createOrder);
router.get("/", verify.verifyUser, orderController.getAllOrderUser);
router.get("/all-order", verify.verifyUser, verify.verifyAdmin, orderController.getAllOrders);
router.get("/:id", orderController.getDetailOrder);
router.patch("/:id/cancel", verify.verifyUser, orderController.cancelOrder);
router.patch(
  "/:id/status",
  verify.verifyUser,
  verify.verifyAdmin,
  orderController.updateOrder
);
module.exports = router;
