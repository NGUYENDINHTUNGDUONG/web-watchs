import React from "react";
import { Badge, Col, Modal, Popover, Row, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import SearchComponent from "../SearchComponent/SearchComponent";
import logo from "../../assets/images/Logo-DWatch.svg";
import TypeComponent from "../TypeComponent/TypeComponent";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperHeaderText,
  WrapperHeaderTextSmall,
  WrapperType,
} from "./style";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { modalState, resetUser } from "../../redux/slides/userSlide";
import { useState } from "react";
import { useEffect } from "react";
import SignInComponent from "../SignInComponent/SignInComponent";
import SignUpComponent from "../SignUpComponent/SignUpComponent";
import SendEmailComponent from "../ForgotPasswordComponent/SendEmailComponent";
import ProfileComponent from "../ProfileComponet/ProfileComponent";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);

  const handleOpenSignIn = () => {
    dispatch(modalState({ modalSignIn: true }));
  };

  const handleCancelSignIn = () => {
    dispatch(modalState({ modalSignIn: false }));
  };

  const handleCancelSignUp = () => {
    dispatch(modalState({ modalSignUp: false }));
  };

  const handleCancelEmail = () => {
    dispatch(modalState({ modalEmail: false }));
  };
  const handleCancelChangePassword = () => {
    dispatch(modalState({ modalChangePassword: false }));
  };

  const handleCancelProfile = () => {
    dispatch(modalState({ modalProfile: false }));
  };

  const handleOpenOrder = () => {
    if (!user?.id) {
      message.error("Vui lòng đăng nhập trước");
      dispatch(modalState({ modalSignIn: true }));
    } else {
      navigate("/order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    }
  };

  const openSignIn = useSelector((state) => state.user.modalSignIn);

  const openSignUp = useSelector((state) => state.user.modalSignUp);

  const openEmail = useSelector((state) => state.user.modalEmail);
  const openChangePassword = useSelector(
    (state) => state.user.modalChangePassword
  );
  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const openProfile = useSelector((state) => state.user.modalProfile);
  useEffect(() => {
    setUserName(user?.fullName);
  }, [user?.fullName, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.role === "admin" && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      {user?.role === "user" && (
        <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
          Đơn hàng của tôi
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      dispatch(modalState({ modalProfile: true }));
    } else if (type === "admin") {
      navigate("/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const arr = [
    { title: <HomeOutlined />, url: "/" },
    { title: "THƯƠNG HIỆU", url: "/products" },
    { title: "ĐỒNG HỒ NAM", url: "/products/donghonam" },
    { title: "ĐỒNG HỒ NỮ", url: "/products/donghonu" },
    { title: "SỬA CHỮA", url: "/products" },
    { title: "KIẾN THỨC", url: "/products" },
    { title: "PHỤ KIỆN", url: "/products" },
  ];
  return (
    <div>
      <WrapperHeader>
        <Row gutter={16} className="items-center justify-between">
          <Col span={5}>
            <WrapperHeaderText>
              <img
                onClick={() => navigate("/")}
                src={logo}
                alt="logo"
                style={{
                  cursor: "pointer",
                  width: "150px",
                }}
              />
            </WrapperHeaderText>
          </Col>
          <Col span={12}>
            <SearchComponent
              size="large"
              placeholder="Tìm kiếm sản phẩm"
              textbutton="Tìm kiếm"
              // onSearch={onSearch}
            />
          </Col>
          <Col
            span={4}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: "30px" }} />
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div
                      style={{
                        cursor: "pointer",
                        maxWidth: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
                      {userName?.length ? userName : user?.fullName}
                    </div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleOpenSignIn} style={{ cursor: "pointer" }}>
                  <WrapperHeaderTextSmall>
                    Đăng nhập/Đăng ký
                  </WrapperHeaderTextSmall>
                  <div>
                    <WrapperHeaderTextSmall>Tài khoản</WrapperHeaderTextSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Col>
          <Col
            span={3}
            style={{
              display: "flex",
              gap: "20px",
            }}
            className="justify-end"
          >
            <div
              onClick={handleOpenOrder}
              className="flex items-center cursor-pointer"
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingOutlined style={{ fontSize: "34px", color: "#fff" }} />
              </Badge>
              <WrapperHeaderTextSmall className="ml-2">
                Giỏ hàng
              </WrapperHeaderTextSmall>
            </div>
          </Col>
        </Row>
      </WrapperHeader>
      <WrapperType>
        {arr.map((item) => {
          return (
            <TypeComponent key={item.title} title={item.title} url={item.url} />
          );
        })}
      </WrapperType>
      <Modal open={openSignIn} onCancel={handleCancelSignIn} footer={false}>
        <SignInComponent />
      </Modal>

      <Modal open={openSignUp} onCancel={handleCancelSignUp} footer={false}>
        <SignUpComponent />
      </Modal>

      <Modal open={openEmail} onCancel={handleCancelEmail} footer={false}>
        <SendEmailComponent />
      </Modal>
      <Modal
        open={openChangePassword}
        onCancel={handleCancelChangePassword}
        footer={false}
      >
        <ChangePasswordComponent />
      </Modal>

      <Modal open={openProfile} onCancel={handleCancelProfile} footer={false}>
        <ProfileComponent />
      </Modal>
    </div>
  );
};

export default HeaderComponent;
