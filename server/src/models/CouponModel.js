const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, minLength: 8, maxLength: 16 },
    startDate: {
      type: Date,
      required: true,
    },
    expiredDate: {
      type: Date,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    minimumPurchaseAmount: {
      type: Number,
      default: 0,
    },
    maximumDiscountAmount: {
      type: Number,
      default: 10000000,
    },
    used: [mongoose.Schema.Types.ObjectId],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CouponModel = mongoose.model("Coupon", couponSchema);

module.exports = CouponModel;
