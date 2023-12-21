const express = require("express");

const commentController = require("../controllers/CommentController");
const verify = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/", verify.verifyUser, commentController.createComment);
router.get("/", commentController.getAllComments);
module.exports = router;
