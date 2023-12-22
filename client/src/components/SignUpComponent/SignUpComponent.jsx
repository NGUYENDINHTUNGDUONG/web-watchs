import React, { useState, useEffect } from "react";
import { Form, Image, Input } from "antd";
import { Button } from "antd";

import * as UserService from "../../services/UserService";
import * as message from "../Message/Message";
import imageLogoLogin from "../../assets/images/logo-login.png";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { WrapperTextLight } from "../SignInComponent/style";
import { useDispatch } from "react-redux";
import { modalState } from "../../redux/slides/userSlide";

const SignUpComponent = () => {
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^0[0-9]{9,10}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const mutation = useMutationHooks((data) => UserService.registerUser(data));
  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        message.success("Đăng ký tài khoản thành công");
        handleOpenSignIn();
      }
    } else if (isError) {
      message.error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeFullname = (value) => {
    setFullName(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOpenSignIn = () => {
    dispatch(modalState({ modalSignIn: true }));
  };

  const handleSignUp = () => {
    if (password.target.value !== confirmPassword.target.value) {
      message.error("Xác nhận mật khẩu không đúng");
    } else {
      mutation.mutate({
        fullName: fullName.target.value,
        email: email.target.value,
        password: password.target.value,
        confirmPassword: confirmPassword.target.value,
        phone: phone.target.value,
        address: address.target.value,
      });
    }
  };

  return (
    <div>
      <div className="flex gap-x-10 m-2">
        <div>
          <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
          <p>Xin mời bạn tạo tài khoản</p>
          <div className="mt-5">
            <Form>
              <Form.Item
                name="fullname"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên của bạn!" },
                ]}
              >
                <Input
                  placeholder="Họ tên"
                  value={fullName}
                  onChange={handleOnchangeFullname}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn!" },
                  {
                    pattern: emailRegex,
                    message: "Vui lòng nhập địa chỉ email hợp lệ!",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={handleOnchangeEmail}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu của bạn!",
                  },
                  {
                    pattern: passwordRegex,
                    message:
                      "Mật khẩu cần ít nhất 1 ký tự chữ hoa, 1 ký tự chữ thường,1 ký tự số, 1 kí tự đặc biệt",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handleOnchangePassword}
                />
              </Form.Item>

              <Form.Item
                name="comfirm password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu của bạn!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={handleOnchangeConfirmPassword}
                />
              </Form.Item>

              <Form.Item
                name="phone number"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại của bạn!",
                  },
                  {
                    pattern: phoneRegex,
                    message: "Vui lòng nhập đúng định dạng số điện thoại",
                  },
                ]}
              >
                <Input
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={handleOnchangePhone}
                />
              </Form.Item>
              <Form.Item
                name="Address"
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ của bạn!" },
                ]}
              >
                <Input
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={handleOnchangeAddress}
                />
              </Form.Item>
              <Form.Item className="text-center">
                <Button
                  htmlType="submit"
                  className="text-black"
                  onClick={handleSignUp}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
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

export default SignUpComponent;
