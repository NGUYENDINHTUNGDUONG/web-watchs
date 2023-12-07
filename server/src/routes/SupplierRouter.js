const express = require("express");

const supplierController = require("../controllers/SupplierController");
const verify = require("../middlewares/AuthMiddleware");
const upload = require("../utils/Multer");
const router = express.Router();

router.post(
  "/",
  verify.verifyUser,
  verify.verifyAdmin,
  upload.single("image"),
  supplierController.createSupplier
);
router.get(
  "/",
  verify.verifyUser,
  verify.verifyAdmin,
  supplierController.getAllSuppliers
);

module.exports = router;