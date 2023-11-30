import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Image, Input } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Button } from "antd";

import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import imageLogoLogin from "../../assets/images/logo-login.png";
// import Loading from "../../components/LoadingComponent/LoadingComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "../SignInPage/style";
import { useDispatch } from "react-redux";
import { modalState } from "../../redux/slides/userSlide";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleOpenSignIn = () => {
    dispatch(modalState({ modalSignIn: true }));
  };

  return (
    <div>
      <div className="flex gap-x-10 m-2">
        <div>
          <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
          <p>Tạo tài khoản</p>
          <div className="mt-5">
          <Form>
          <Form.Item
              name="fullname"
              rules={[
                { required: true, message: "Please input your Name!" },
              ]}
            >
              <Input
                placeholder="Full Name"
              />
            </Form.Item>

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
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="comfirm password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                type="password"
                placeholder="Comfirm password"
              />
            </Form.Item>

            <Form.Item
              name="phone number"
              rules={[
                { required: true, message: "Please input your Phone number!" },
              ]}
            >
              <Input
                placeholder="Phone number"
              />
            </Form.Item>

            <Form.Item
              name="Address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input
                type="password"
                placeholder="Address"
              />
            </Form.Item>

            

            <Form.Item>
              <Button htmlType="submit" className="text-black">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      
          {/* </Loading> */}
          <p>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleOpenSignIn}>
              {" "}
              Đăng nhập
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
    </div>
  );
};

export default SignUpPage;
