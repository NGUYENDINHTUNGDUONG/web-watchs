import React from "react";
import { Badge, Col, Modal, Popover, Row } from "antd";
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
import { searchProduct } from "../../redux/slides/productSlide";
import SignInPage from "../../pages/SignInPage/SignInPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import Email from "../../pages/ForgotPassword/Email";
import ProfileComponent from "../ProfileComponet/ProfileComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

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

  const handleCancelProfile = () => {
    dispatch(modalState({ modalProfile: false }));
  };

  const openSignIn = useSelector((state) => state.user.modalSignIn);

  const openSignUp = useSelector((state) => state.user.modalSignUp);

  const openEmail = useSelector((state) => state.user.modalEmail);
console.log(user)
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  const handleOpenProfile = () => {
    dispatch(modalState({ modalProfile: true }));
  };
  const openProfile = useSelector((state) => state.user.modalProfile);
  useEffect(() => {
    setLoading(true);
    setUserName(user?.fullName);
    setUserAvatar(user?.avatar);
    setLoading(false);
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
      navigate("/profile-user");
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

  // const onSearch = (e) => {
  //   setSearch(e.target.value);
  //   dispatch(searchProduct(e.target.value));
  // };

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
              justifyContent: "flex-end",
            }}
          >
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined
                  style={{ fontSize: "30px" }}
                  onClick={handleOpenProfile}
                />
              )}
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
              onClick={() => navigate("/order")}
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
        <SignInPage />
      </Modal>

      <Modal open={openSignUp} onCancel={handleCancelSignUp} footer={false}>
        <SignUpPage />
      </Modal>

      <Modal open={openEmail} onCancel={handleCancelEmail} footer={false}>
        <Email />
      </Modal>

      <Modal open={openProfile} onCancel={handleCancelProfile} footer={false}>
        <ProfileComponent />
      </Modal>
    </div>
  );
};

export default HeaderComponent;
