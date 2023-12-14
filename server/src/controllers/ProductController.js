const express = require('express');
const fs = require('fs');

const ProductRepo = require('../repository/ProductRepo');
const path = require('path');
const Order = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');

const getAllProducts = async (req, res, next) => {
	try {
		const products = await ProductRepo.getAllProducts({});
		return res.status(200).json({message: 'All Products', data: products});
	} catch (error) {
		next(error);
		console.log(error);
	}
};
const getProduct = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const product = await ProductRepo.findProduct({_id: productId});
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		return res.status(200).json({message: 'Product found', data: product});
	} catch (error) {
		next(error);
		console.log(error);
	}
};
const findProductName = async (req, res, next) => {
	try {
		const name = req.query.name;
		const product = await ProductRepo.findProduct(name);
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		return res.status(200).json({message: 'Product found', data: product});
	} catch (error) {
		next(error);
		console.log(error);
	}
};
const findProductByFilter = async (req, res, next) => {
	try {
		const {brand, category, minPrice, maxPrice, minRating} = req.body;
		const filter = {
			...(brand && {brand}),
			...(category && {category}),
			...(minPrice && {
				price: {
					$gte: minPrice,
				},
			}),
			...(maxPrice && {
				price: {
					$lte: maxPrice,
				},
			}),
			...(minRating && {rating: {$gte: minRating}}),
		};
		console.log(filter);
		const product = await ProductRepo.getAllProducts(filter);
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		return res.status(200).json({message: 'Product found', data: product});
	} catch (error) {
		next(error);
		console.log(error);
	}
};
const createProduct = async (req, res, next) => {
	try {
		const images = req.files.map((file) => file.originalname);
		const product = await ProductRepo.createProduct({
			images,
			...req.body,
		});
		return res.status(200).json({message: 'Product created', data: product});
	} catch (error) {
		next(error);
		console.log(error);
	}
};

const updateProduct = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const product = await ProductRepo.findProduct({_id: productId});
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		const oldImages = product.images;
		const newImages = req.body.images;
		const deleteImages = oldImages.filter((image) => !newImages.includes(image));

		deleteImages.forEach((image) => {
			fs.unlink(path.join(__dirname, '../uploads', image), (err) => {
				console.log(err);
			});
		});
		const updateProduct = await ProductRepo.updateProduct({
			productId,
			update: {
				...req.body,
			},
		});
		return res
			.status(200)
			.json({message: 'Product updated', data: updateProduct});
	} catch (error) {
		next(error);
		console.log(error);
	}
};
const deleteProduct = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const product = await ProductRepo.findProduct({_id: productId});
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		const deleteProduct = await ProductRepo.deleteProduct({
			_id: productId,
		});

		return res
			.status(200)
			.json({message: 'Product deleted', data: deleteProduct});
	} catch (error) {
		next(error);
		console.log(error);
	}
};
const createReview = async (req, res, next) => {
	try {
		const {_id: userId, fullName} = req.payload;
		const productId = req.params.id;
		const {comment, star, orderId} = req.body;
		const product = await ProductRepo.findProduct({_id: productId});
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		product.reviews = product.reviews.filter(
			(review) => review.userId.toString() !== userId.toString()
		);
		const review = {
			userId,
			fullName,
			comment,
			star,
		};
		product.reviews.push(review);

		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((total, review) => total + review.star, 0) /
			product.numReviews;
		await product.save();
		console.log({orderId});
		const a = await Order.findOneAndUpdate(
			{_id: orderId},
			{
				$set: {
					'orderItem.$[element].isReview': true,
				},
			},
			{
				arrayFilters: [
					{
						'element._id': productId,
					},
				],
			}
		);

		return res.status(200).json({message: 'Review created', data: review});
	} catch (error) {
		next(error);
		console.log(error);
	}
};

const getAllTypes = async (req, res, next) => {
	try {
		const types = await ProductRepo.getAllTypes();
		res.status(200).json({types});
	} catch (error) {
		next(error);
	}
};

const statistic = async (req, res, next) => {
	try {
		const {month} = req.params;
		const startDate =
			month === 'current'
				? getStartDateOfCurrentMonth()
				: getStartDateOfLasttMonth();
		const endDate =
			month === 'current' ? new Date() : getStartDateOfCurrentMonth();

		const orders = await Order.find({
			createdAt: {$gte: startDate, $lte: endDate},
		});

		const productSales = {};
		let revenue = 0;
		orders.forEach((order) => {
			order.orderItem.forEach((item) => {
				revenue += item.totalPrice;
				const productId = item._id;
				if (productSales[productId]) {
					productSales[productId] += item.amount;
				} else {
					productSales[productId] = item.amount;
				}
			});
		});

		const productIds = Object.keys(productSales);
		console.log(productIds);
		let products = await ProductModel.find({_id: {$in: productIds}}).lean();

		products = products.map((product) => ({
			...product,
			soldLastMonth: productSales[product._id],
		}));
		products.sort((a, b) => {
			return b.soldLastMonth - a.soldLastMonth;
		});
		res.status(200).json({
			products,
			revenue,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getProduct,
	getAllProducts,
	findProductName,
	findProductByFilter,
	createProduct,
	createReview,
	updateProduct,
	deleteProduct,
	getAllTypes,
	statistic,
};

const getStartDateOfCurrentMonth = () => {
	const a = new Date();
	const year = a.getUTCFullYear();
	const month = a.getUTCMonth();
	const startMonth = new Date(Date.UTC(year, month, 0));
	return startMonth;
};

const getStartDateOfLasttMonth = () => {
	const a = new Date();
	const year = a.getUTCFullYear();
	const month = a.getUTCMonth() - 1;
	const startMonth = new Date(Date.UTC(year, month, 0));
	return startMonth;
};
