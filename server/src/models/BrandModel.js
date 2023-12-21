const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    supplier: {
      // join bảng Supplier
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Tạo chỉ mục cho tên sản phẩm
brandSchema.index({ name: "text" });
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
