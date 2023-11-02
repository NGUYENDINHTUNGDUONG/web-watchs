const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const CommentRouter = require("./CommentRouter");
const OrderRouter = require("./OrderRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/comment", CommentRouter);
  app.use("/api/order", OrderRouter);
};

module.exports = routes;
