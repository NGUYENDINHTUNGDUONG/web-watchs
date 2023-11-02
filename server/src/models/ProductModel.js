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
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    caliber: { type: String, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    blog: { type: String },
    reviews: [reviewProduct],
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
