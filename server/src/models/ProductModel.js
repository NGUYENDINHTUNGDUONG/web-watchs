const mongoose = require("mongoose");

const reviewProduct = new mongoose.Schema(
  {
    userId: { type: String },
    fullName: { type: String },
    comment: { type: String },
    star: { type: Number },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    type: { type: String, required: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    caliber: { type: String, required: true },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    size: { type: String, required: true },
    glass: { type: String, required: true },
    waterResistant: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewProduct],
    discount: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Tạo chỉ mục cho tên sản phẩm
productSchema.index({ name: "text" });
const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
