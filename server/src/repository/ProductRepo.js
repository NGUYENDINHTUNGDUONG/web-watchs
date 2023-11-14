const Product = require('../models/ProductModel');

const findProduct = async (filters) => {
	return await Product.findOne(filters);
};
const getAllProducts = async (filters) => {
	return await Product.find(filters);
};
const createProduct = async (product) => {
	const newProduct = new Product(product);
	return await newProduct.save();
};

const updateProduct = async (data) => {
	const {productId, update} = data;
	const updatedProduct = await Product.findOneAndUpdate(
		{_id: productId},
		update,
		{
			new: true,
		}
	);
	return updatedProduct;
};
const deleteProduct = async (productId) => {
	return await Product.deleteOne({_id: productId});
};
const createReview = async (data) => {
	const {productId, userId, fullName, comment, start} = data;
	return await Product.findOneAndUpdate(
		{_id: productId},
		{$push: {reviews: {userId, fullName, comment, start}}},
		{new: true}
	);
};

const updateAmountProduct = async (productId, amount) => {
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


const getAllTypesProduct = async () => {
	return Product.distinct('type');
};
const getAllBrands = async () => {
	return Product.distinct("brand");
  };

module.exports = {
	findProduct,
	getAllProducts,
	createProduct,
	getAllBrands,
	updateProduct,
	deleteProduct,
	createReview,
	updateAmountProduct,
	getAllTypesProduct,
};