// Đây là một hàm middleware xử lý lỗi
const errorHandler = (error, req, res, next) => {
	console.log(res.statusCode);
	// Nếu mã trạng thái đã được đặt, hãy sử dụng nó, nếu không, mặc định là 500
	const statusCode = res.statusCode ? res.statusCode : 500;
	// Đặt mã trạng thái cho phản hồi
	res.status(statusCode);
	// Gửi một phản hồi JSON với thông báo lỗi và, trong chế độ phát triển, ngăn xếp theo dõi
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : null,
	});
};

module.exports = errorHandler;
