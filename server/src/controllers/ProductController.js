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
		const productId = req.params.id;
		const product = await ProductRepo.findProduct({_id: productId});
		if (!product) {
			return res.status(400).json({message: 'Product not found'});
		}
		if (product.reviews.find((review) => review.userId === req.payload.id)) {
			return res
				.status(400)
				.json({message: 'You have already reviewed this product'});
		}

		const review = await ProductRepo.createReview({
			productId,
			userId: req.payload.id,
			fullName: req.payload.fullName,
			...req.body,
		});
		const newProduct = await ProductRepo.findProduct({_id: productId});
		newProduct.numReviews += 1;
		newProduct.rating =
			newProduct.reviews.reduce((total, review) => total + review.star, 0) /
			newProduct.numReviews;
		await newProduct.save();
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

const getTopSoldLastMonth = async (req, res, next) => {
	try {
		const today = new Date();
		const endDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		);

		const startDate = new Date(endDate.getTime()).setMonth(today.getMonth() - 1);

		const lastMonthOrders = await Order.find({
			createdAt: {$gte: startDate, $lte: endDate},
		});

		const productSales = {};
		lastMonthOrders.forEach((order) => {
			order.orderItem.forEach((item) => {
				const productId = item._id;
				if (productSales[productId]) {
					productSales[productId] += item.amount;
				} else {
					productSales[productId] = item.amount;
				}
			});
		});

		const sortedProductIds = Object.keys(productSales).sort(
			(a, b) => productSales[b] - productSales[a]
		);

		const sortedProducts = await ProductModel.aggregate([
			{
				$match: {
					_id: {$in: sortedProductIds},
				},
			},
		]);
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
};
