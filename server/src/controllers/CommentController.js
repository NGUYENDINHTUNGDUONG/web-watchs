const CommentRepo = require("../repository/CommentRepo");
const UserRepo = require("../repository/UserRepo");

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
    const comments = await CommentRepo.getAllComments({
      productId,
      timeCursor,
      limitPerPage,
    });
    const users = await UserRepo.getAllUsers({});
    const findUser = (userId) => {
      const data = users.find(
        (item) => item._id.toString() === userId?.toString()
      );
      if (data) {
        return {
          _id: data._id,
          fullName: data.fullName,
          email: data.email,
        };
      }
      return null;
    };
    const populateComment = (comment) => {
      return {
        ...comment,
        sender: findUser(comment.sender),
        receiver: findUser(comment.receiver),
      };
    };

    const populatedComments = comments.map((comment) => {
      return {
        ...populateComment(comment),
        answers: comment.answers.map((comment) => {
          return populateComment(comment);
        }),
      };
    });

    res.status(201).json({ data: populatedComments });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  createComment,
  getAllComments,
};
