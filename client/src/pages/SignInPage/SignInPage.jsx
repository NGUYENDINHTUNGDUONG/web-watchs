import React, { useEffect } from "react";
import { Button, Form, Image, Input } from "antd";
import jwt_decode from "jwt-decode";
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
  const location = useLocation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", `${data?.access_token}`);
      localStorage.setItem("refresh_token", `${data?.refresh_token}`);
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleLogin = async () => {
    const data = {
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
    };
    const res = await UserService.loginUser(data);
    if (res) {
      console.log(res);
    }
  };
  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = localStorage.getItem("refresh_token");
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  return (
    <div className="flex gap-x-10 m-5">
      <div>
        <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
        <p>Đăng nhập vào tài khoản</p>
        <div className="mt-5">
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
                {
                  pattern: emailRegex,
                  message: "Vui lòng nhập địa chỉ email hợp lệ!",
                },
                // {validator: (_, value)=>{

                // }}
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="text-black">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* </LoadingComponent> */}
        <p>
          <WrapperTextLight onClick={handleOpenEmail}>Quên mật khẩu?</WrapperTextLight>
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
