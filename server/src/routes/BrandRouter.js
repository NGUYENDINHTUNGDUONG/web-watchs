const express = require("express");

const brandController = require("../controllers/BrandController");
const verify = require("../middlewares/AuthMiddleware");
const upload = require("../utils/Multer");
const router = express.Router();

router.post(
  "/",
  verify.verifyUser,
  verify.verifyAdmin,
  upload.single("image"),
  brandController.createBrand
);
router.patch(
  "/:id",
  verify.verifyUser,
  verify.verifyAdmin,
  upload.single("image"),
  brandController.updateBrand
);
router.delete(
  "/:id",
  verify.verifyUser,
  verify.verifyAdmin,
  brandController.deleteBrand
);
router.get(
  "/",
  brandController.getAllBrands
)

module.exports = router;