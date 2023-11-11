const express = require('express');

const ProductRepo = require('../repository/ProductRepo');

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
		const filter = req.body;
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
		const images = req.files.map((file) => file.originalname);
		const updateProduct = await ProductRepo.updateProduct({
			productId,
			update: {
				...req.body,
				images,
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
