const mongoose = require("mongoose");

// Tạo Schema cho phản hồi bình luận sản phẩm

const commentSchema = new mongoose.Schema(
  {
    sender: {
      // id người viết bình luận
      type: String,
      required: true,
    },
    receiver: {
      //id của người phản hồi bình luận
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      //id bình luận cha
      type: mongoose.Schema.ObjectId,
    },
    productId: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema);
module.exports = CommentModel;
