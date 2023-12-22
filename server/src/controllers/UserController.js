const UserRepo = require("../repository/userRepo");
const jwt = require("jsonwebtoken");

const Jwt = require("../utils/Token");
const Mail = require("../mail/UserMail");
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepo.findUser({ email });
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }
    const isMatch = await UserRepo.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Không đúng mật khẩu" });
    }
    const access_token = await Jwt.AccessToken({
      id: user.id,
      role: user.role,
    });
    const refresh_token = await Jwt.RefreshToken({
      id: user.id,
      role: user.role,
    });

    res.status(200).cookie("refresh_token", refresh_token, {
      httpOnly: true,
      Secure: true,
    });
    return res.status(200).json({
      message: "Login successfully",
      access_token,
      refresh_token,
      data: user,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const refreshToken = async (req, res, next) => {
  try {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({
        message: "The refreshToken is required",
      });
    }
    const response = await Jwt.JwtRefreshToken(refreshToken);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await UserRepo.findUser({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "Email người dùng đã được sử dụng" });
    }
    await UserRepo.createUser({
      email,
      ...req.body,
    });
    void Mail.sendEmailCreateUser({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const updatedUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await UserRepo.updateUser({ userId, update: req.body });
    if (updatedUser == null) {
      res.status(400).json({ message: "User update not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const deletedUser = async (req, res, next) => {
  try {
    const deletedUser = await UserRepo.deleteUser(req.params.id);
    if (deletedUser == null) {
      res.status(400).json({ message: "User delete not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const user = await UserRepo.findUser({ _id: userId });
    if (user == null) {
      return res
        .status(400)
        .json({ message: "Người dùng này chưa được đăng ký" });
    }
    return res.status(200).json({
      message: "User found",
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserRepo.getAllUsers({});
    return res.status(200).json({
      message: "Users found",
      data: users,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
const changePassword = async (req, res, next) => {
  try {
    const id = req.payload?._id;
    // Giải mã token để tìm người dùng
    const changePasswordUser = await UserRepo.findUser({ id });
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    // Kiểm tra xem mật khẩu hiện tại có khớp với mật khẩu trong cơ sở dữ liệu hay không
    if (changePasswordUser == null) {
      return res.status(400).json({ message: "Không tìm được người dùng" });
    }
    const isMatch = await UserRepo.comparePassword(
      currentPassword,
      changePasswordUser.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "Mật không thay đổi" });
    }
    // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp nhau hay không
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Xác nhận mật không đúng" });
    }

    changePasswordUser.password = newPassword;
    await changePasswordUser.save();
    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
      data: changePasswordUser,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserRepo.findUser({ email });
    if (!user) {
      return res.status(400).json({ message: "Email này chưa đăng ký" });
    }
    const access_token = await Jwt.AccessToken({
      id: user.id,
    });
    void Mail.sendEmailForgotPassword({
      email: user.email,
      fullName: user.fullName,
      access_token,
    });
    res
      .status(200)
      .json({ message: "Email sent to forgot password successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetPasswordToken } = req.params;
    const decodedToken = jwt.verify(resetPasswordToken, process.env.JWT_SECRET);
    const user = await UserRepo.findUser({ _id: decodedToken.id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Người dùng này chưa được đăng ký" });
    }
    const { password } = req.body;
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  changePassword,
  forgotPassword,
  resetPassword,
  updatedUser,
  deletedUser,
  getUser,
  getAllUsers,
  refreshToken,
  logoutUser,
};
