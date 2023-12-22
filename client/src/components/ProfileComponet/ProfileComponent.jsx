import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../services/UserService";

import * as UserService from "../../services/UserService";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
} from "./style";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as message from "../../components/Message/Message";
import { Modal } from "antd";
import { modalState } from "../../redux/slides/userSlide";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";

const ProfileComponent = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const access_token = localStorage.getItem("access_token");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setFullName(user?.fullName);
    setPhone(user?.phone);
    setAddress(user?.address);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);


  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    updateUser({ ...res?.data, access_token: token });
    console.log(res);
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setFullName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const openChangePassword = useSelector((state) => state.user.modalChangePassword);
  const handleOpenChangePassword = () => {
    dispatch(modalState({ modalChangePassword: true }));
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      fullName,
      phone,
      address,
      access_token: access_token,
    });
  };
  return (
    <div>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Name</WrapperLabel>
          <InputFormComponent
            style={{ width: "300px" }}
            value={fullName}
            onChange={handleOnchangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputFormComponent
            style={{ width: "300px" }}
            id="email"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
          <InputFormComponent
            style={{ width: "300px" }}
            id="email"
            value={phone}
            onChange={handleOnchangePhone}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="address">Address</WrapperLabel>
          <InputFormComponent
            style={{ width: "300px" }}
            id="address"
            value={address}
            onChange={handleOnchangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput style={{ display: "flex", justifyContent: "center" }}>
          <ButtonComponent
            onClick={handleOpenChangePassword}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Đổi mật khẩu"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContentProfile>
      <Modal open={openChangePassword} footer={false}>
        <ChangePasswordComponent />
      </Modal>
    </div>
  );
};

export default ProfileComponent;
