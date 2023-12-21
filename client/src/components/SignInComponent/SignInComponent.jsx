import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import * as UserService from "../../services/UserService.js";
import imageLogoLogin from "../../assets/images/logo-login.png";
import { useMutationHooks } from "../../hooks/useMutationHook.js";
import { modalState, updateUser } from "../../redux/slides/userSlide.js";
import { WrapperTextLight } from "./style.js";

const SignInPage = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  const location = useLocation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOpenSignUp = () => {
    dispatch(modalState({ modalSignUp: true }));
  };

  const handleOpenEmail = () => {
    dispatch(modalState({ modalEmail: true }));
  };

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      dispatch(modalState({ modalSignIn: false }));
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", `${data?.access_token}`);
      localStorage.setItem("refresh_token", `${data?.refresh_token}`);
      if (data?.access_token) {
        handleGetDetailsUser(data?.access_token);
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (token) => {
    const refreshToken = localStorage.getItem("refresh_token");
    const res = await UserService.getDetailsUser(token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    console.log(res);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    mutation.mutate({
      email,
      password,
    });
  };
  return (
    <div className="flex gap-x-10">
      <div>
        <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
        <p>Mời bạn nhập tài khoản</p>
        <div className="mt-5">
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            onFinish={handleSignIn}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  pattern: emailRegex,
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={handleOnchangeEmail}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                {
                  pattern:passwordRegex,
                  message: "Mật khẩu cần ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường,1 ký tự số, 1 kí tự đặc biệt"
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
                onChange={handleOnchangePassword}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="text-black">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p>
          <WrapperTextLight onClick={handleOpenEmail}>
            Quên mật khẩu?
          </WrapperTextLight>
        </p>
        <p>
          Chưa có tài khoản?{" "}
          <WrapperTextLight onClick={handleOpenSignUp}>
            {" "}
            Tạo tài khoản
          </WrapperTextLight>
        </p>
      </div>
      <div>
        <Image
          src={imageLogoLogin}
          preview={false}
          alt="image-logo"
          height="203px"
          width="203px"
        />
        <p className="text-xl font-bold mt-10 text-center">
          Mua sắm tại Dwatch
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
