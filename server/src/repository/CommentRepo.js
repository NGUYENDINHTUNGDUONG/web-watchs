const Coupon = require('../models/CouponModel');

const createComment = async (comment) => {
	const newComment = new Comment(comment);
	return await newComment.save();
};
const getAllComments = async (data) => {
	const {productId, timeCursor = new Date().getTime(), limitPerPage} = data;
	const comments = await Comment.aggregate([
		{
			$match: {
				productId,
				parentId: {
					$exists: false,
				},
				createdAt: {
					$lte: new Date(timeCursor),
				},
			},
		},
		{$sort: {createdAt: -1}},
		{$limit: +limitPerPage + 1},

		{
			$lookup: {
				from: 'comments',
				localField: '_id',
				foreignField: 'parentId',
				as: 'answers',
				pipeline: [
					{
						$sort: {
							createdAt: 1,
						},
					},
				],
			},
		},
	]);
	return comments;
};
module.exports = {
	createComment,
	getAllComments,
};
