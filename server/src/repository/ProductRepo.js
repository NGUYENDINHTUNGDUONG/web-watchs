const Product = require("../models/ProductModel");

const findProductByName = async (name) => {
  console.log(name);
  return await Product.find({ name: { $regex: name, $options: "i" } });
};
const findProduct = async (filters) => {
  return await Product.findOne(filters);
}

const createProduct = async (product) => {
  const newProduct = new Product(product);
  return await newProduct.save();
};

const updateProduct = async (data) => {
  const { productId, update } = data;
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    update,
    {
      new: true,
    }
  );
  return updatedProduct;
};
const deleteProduct = async (productId) => {
  return await Product.deleteOne({ _id: productId });
};
const getAllProducts = async (filters) => {
  return await Product.find(filters).populate("brand");
};

const getAllTypes = async () => {
  return Product.distinct("type");
};
const getAllCalibers = async () => {
  return Product.distinct("caliber");
};
const getAllBrands = async () => {
  return Product.distinct("brand");
};
const createReview = async (data) => {
  const { productId, userId, fullName, comment, start } = data;
  return await Product.findOneAndUpdate(
    { _id: productId },
    { $push: { reviews: { userId, fullName, comment, start } } },
    { new: true }
  );
};
const updateAmount = async (productId, amount) => {
  await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    {
      $inc: {
        quantity: amount,
      },
    }
  );
};
const updateAmountProduct = async (productId, amount, session) => {
  console.log(productId, amount);
  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    {
      $inc: {
        quantity: amount,
      },
    },
    {
      session,
      returnOriginal: false,
    }
  );
  if (updatedProduct?.quantity < 0)
    throw new Error("Product quantity is not enough");
};

const updateSoldProduct = async (productId, amount, session) => {
  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    {
      $inc: {
        sold: amount,
      },
    },
    {
      session,
      returnOriginal: false,
    }
  );
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
  findProductByName,
  getAllProducts,
  getAllBrands,
  getAllTypes,
  getAllCalibers,
  createReview,
  updateAmount,
  updateAmountProduct,
  updateSoldProduct,
};
