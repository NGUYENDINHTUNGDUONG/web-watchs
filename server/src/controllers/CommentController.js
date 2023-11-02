const CommentRepo = require("../repository/CommentRepo");

const createComment = async (req, res, next) => {
  try {
    const createComment = await CommentRepo.createComment({
      ...req.body,
      sender: req.payload.id,
    });
    res.status(201).json({ message: "Comment created", data: createComment });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const { productId, timeCursor, limitPerPage } = req.query;
    console.log(req.query);
    const comments = await CommentRepo.getAllComments({
      productId,
      timeCursor,
      limitPerPage,
    });
    res.status(201).json({ data: comments });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createComment,
  getAllComments,
};
