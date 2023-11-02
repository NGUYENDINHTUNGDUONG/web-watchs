// Nhập các module cần thiết
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Hàm tạo access token
const AccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );
  return access_token;
};

// Hàm tạo refresh token
const RefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  // Trả về refresh token
  return refresh_token;
};

// Hàm làm mới access token bằng refresh token
const JwtRefreshToken = (token) => {
  // Trả về một Promise
  return new Promise((resolve, reject) => {
    try {
      // Xác thực refresh token
      jwt.verify(token, process.env.REFRESH_TOKEN, async (error, user) => {
        // Nếu có lỗi, trả về thông báo lỗi
        if (error) {
          resolve({
            status: "ERROR",
            message: "The authentication",
          });
        }
        // Tạo mới access token từ thông tin người dùng
        const access_token = await AccessToken({
          id: user?.id,
          role: user?.role,
        });
        // Trả về access token mới
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token,
        });
      });
    } catch (error) {
      // Nếu có lỗi, từ chối Promise
      reject(error);
      console.log(error);
    }
  });
};

// Xuất các hàm
module.exports = {
  AccessToken,
  RefreshToken,
  JwtRefreshToken,
};
