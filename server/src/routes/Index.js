const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CommentRouter = require('./CommentRouter');
const OrderRouter = require('./OrderRouter');
const FileRouter = require('./FileRouter');
const CouponRouter = require('./CouponRouter');
const BrandRouter = require('./BrandRouter');
const SupplierRouter = require('./SupplierRouter');

const routes = (app) => {
	app.use('/api/user', UserRouter);
	app.use('/api/product', ProductRouter);
	app.use('/api/comment', CommentRouter);
	app.use('/api/order', OrderRouter);
	app.use('/api/coupon', CouponRouter);
	app.use('/api/file', FileRouter);
	app.use('/api/brand', BrandRouter);
	app.use('/api/supplier', SupplierRouter);
};

module.exports = routes;