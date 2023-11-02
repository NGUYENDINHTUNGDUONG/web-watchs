const express = require("express");

const productController = require("../controllers/ProductController");
const verify = require("../middlewares/AuthMiddleware");
const upload = require("../utils/Multer");
const router = express.Router();


router.post(
  "/",
  verify.verifyUser,
  verify.verifyAdmin,
  upload.array("images"),
  productController.createProduct
);
router.post(
  "/:id/reviews",verify.verifyUser,
  productController.createReview
)
router.patch(
  "/:id",
  verify.verifyUser,
  verify.verifyAdmin,
  upload.array("images"),
  productController.updateProduct
);
router.delete(
  "/:id",
  verify.verifyUser,
  verify.verifyAdmin,
  productController.deleteProduct
);
router.get("/list", productController.getAllProducts);
router.get("/search/:name", productController.findProductName);
router.get("/filter", productController.findProductByFilter);
router.get("/:id", productController.getProduct);

module.exports = router;
