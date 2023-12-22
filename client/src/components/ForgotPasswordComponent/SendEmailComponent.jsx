import imageLogoLogin from "../../assets/images/logo-login.png";
import { Button, Image, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";

import * as UserService from "../../services/UserService.js";

import { modalState } from "../../redux/slides/userSlide.js";
import { useDispatch } from "react-redux";

function SendEmailComponent() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [form] = Form.useForm();

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const mutation = useMutationHooks((data) => UserService.SendMail(data));
  const { data, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(modalState({ modalEmail: false }));
      if (data) {
        message.success("Gửi mail thành công! Vui lòng kiểm tra mail");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  const handleOnchangeEmail = async (e) => {
    setEmail(e.target.value);
  };
  const handleSendMail = (e) => {
    mutation.mutate({
      email,
    });
  };
  return (
    <div className="flex gap-x-10">
      <div>
        <p className="text-lg font-bold mb-5">Nhập email của tài khoản</p>
        <Form form={form} onFinish={handleSendMail}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ email" },
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

          <Form.Item className="text-center">
            <Button htmlType="submit" className="text-black">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <Image
          src={imageLogoLogin}
          preview={false}
          alt="image-logo"
          height="200px"
          width="200px"
        />
        <p className="text-xl font-bold mt-10 text-center">
          Mua sắm tại Dwatch
        </p>
      </div>
    </div>
  );
}

export default SendEmailComponent;
