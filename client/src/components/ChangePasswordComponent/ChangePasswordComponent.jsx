import React, { useState, useEffect } from "react";
import { Form, Image, Input } from "antd";
import { Button } from "antd";

import * as UserService from "../../services/UserService";
import * as message from "../Message/Message";
import imageLogoLogin from "../../assets/images/logo-login.png";
import { useMutationHooks } from "../../hooks/useMutationHook";

import { useDispatch } from "react-redux";
import { modalState } from "../../redux/slides/userSlide";

const ChangePasswordComponent = () => {
  const dispatch = useDispatch();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.changePassword(data));
  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        message.success("Đổi mật khẩu thành công");
        handleOpenSignIn();
      }
    } else if (isError) {
      message.error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const handleOnchangePassword = (value) => {
    setCurrentPassword(value);
  };
  const handleOnchangeNewPassword = (value) => {
    setNewPassword(value);
  };
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleOpenSignIn = () => {
    dispatch(modalState({ modalSignIn: true }));
  };

  const handleSignUp = () => {
    if (newPassword.target.value !== confirmPassword.target.value) {
      message.error("Xác nhận mật khẩu không đúng");
    } else {
      mutation.mutate({
        newPassword: newPassword.target.value,
        confirmPassword: confirmPassword.target.value,
      });
    }
  };

  return (
    <div>
      <div className="flex gap-x-10 m-2">
        <div>
          <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
          <p>Xin mời bạn đổi mật khẩu</p>
          <div className="mt-5">
            <Form>
              <Form.Item
                name="currentPassword"
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
                  value={currentPassword}
                  onChange={handleOnchangePassword}
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
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
                  value={newPassword}
                  onChange={handleOnchangeNewPassword}
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

              <Form.Item className="text-center">
                <Button
                  htmlType="submit"
                  className="text-black"
                  onClick={handleSignUp}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </div>
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

export default ChangePasswordComponent;
