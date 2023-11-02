import React from "react";
import { Badge, Col, Popover, Row } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import SearchComponent from "../SearchComponent/SearchComponent";
import logo from "../../assets/images/Logo-DWatch.png";
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
import { resetUser } from "../../redux/slides/userSlide";
import { useState } from "react";
import { useEffect } from "react";
import { searchProduct } from "../../redux/slides/productSlide";

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
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

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

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const arr = [
    <HomeOutlined />,
    "THƯƠNG HIỆU",
    "ĐỒNG HỒ NAM",
    "ĐỒNG HỒ NỮ",
    "SỬA CHỮA",
    "KIẾN THỨC",
    "PHỤ KIỆN",
  ];
  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      <WrapperHeader>
        <Row gutter={16}>
          <Col span={7}>
            <WrapperHeaderText>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "150px",
                }}
              />
            </WrapperHeaderText>
          </Col>
          <Col span={10}>
            <SearchComponent
              size="large"
              placeholder="Tìm kiếm sản phẩm"
              textbutton="Tìm kiếm"
              onSearch={onSearch}
            />
          </Col>
          <Col
            span={4}
            style={{
              padding: "0 50px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
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
                <UserOutlined style={{ fontSize: "30px" }} />
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
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
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
              marginLeft: "-30px",
              display: "flex",
              gap: "20px",
              alignItems: "left",
            }}
          >
            <div>
              <Badge count={0} size="small">
                <ShoppingOutlined style={{ fontSize: "30px", color: "#fff" }} />
              </Badge>
              <WrapperHeaderTextSmall>Giỏ hàng</WrapperHeaderTextSmall>
            </div>
          </Col>
        </Row>
      </WrapperHeader>
      <WrapperType>
        {arr.map((item) => {
          return <TypeComponent key={item} title={item} />;
        })}
      </WrapperType>
    </div>
  );
};

export default HeaderComponent;
