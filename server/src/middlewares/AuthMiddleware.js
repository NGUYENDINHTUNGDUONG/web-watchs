const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const UserRepo = require("../repository/userRepo");

// Hàm xác thực người dùng
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserRepo.findUser({ _id: payload.id });
    if (user) {
      req.payload = payload;
      next();
    } else {
      return res.status(401).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Hàm xác thực admin
const verifyAdmin = async (req, res, next) => {
  try {
    if (req.payload?.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
// Xuất các hàm
module.exports = {
  verifyUser,
  verifyAdmin,
};
