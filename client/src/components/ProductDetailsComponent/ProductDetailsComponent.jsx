import React, { useEffect, useState } from "react";
import { Row, Col, Image, Rate, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  WrapperInputNumber,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { addOrderProduct } from "../../redux/slides/orderSlide";

import { modalState } from "../../redux/slides/userSlide";

const ProductDetailsComponent = (props) => {
  const [index, setIndex] = React.useState(0);
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === props?.idProduct
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.quantity ||
      (!orderRedux && props?.quantity > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (props?.quantity === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      dispatch(modalState({ modalSignIn: true }));
      navigate("", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === props?.idProduct
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.quantity ||
        (!orderRedux && props?.quantity > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: props?.name,
              amount: numProduct,
              images: props?.images,
              price: props?.price,
              product: props?.idProduct,
              quantity: props?.quantity,
            },
          }),
          message.success("Đã thêm vào giỏ hàng")
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };
  return (
    <div>
      <Row
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "4px",
          height: "100%",
        }}
      >
        <Col
          span={10}
          style={{
            borderRight: "1px solid #e5e5e5",
            paddingRight: "8px",
            textAlign: "center",
          }}
        >
          <Image
            src={`http://localhost:3001/static/${props.images?.[index]}`}
            alt="image product"
            preview={false}
            className=" !h-[500px] object-cover"
          />
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            {props.images?.map((value, index) => (
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={`http://localhost:3001/static/${value}`}
                  alt="image product"
                  preview={false}
                  onClick={() => setIndex(index)}
                />
              </WrapperStyleColImage>
            ))}
          </Row>
        </Col>
        <Col
          span={7}
          style={{
            borderRight: "1px solid #e5e5e5",
            padding: "20px",
          }}
        >
          <p style={{ display: "flex", alignItems: "center" }}>
            <img
              alt="#"
              style={{ width: "90px", marginRight: "10px" }}
              src="/images/chinhhang.png"
            />
            <span style={{ fontWeight: 500 }}>Thương hiệu: </span> {props.brand}
          </p>
          <WrapperStyleNameProduct>
            ĐỒNG HỒ {props.name}
          </WrapperStyleNameProduct>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4>({props.rate})</h4>

            <Rate
              disabled
              value={props.rate}
              style={{ fontSize: "15px", paddingLeft: "10px" }}
            />
          </div>
          <WrapperPriceTextProduct>
            {Number(props.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </WrapperPriceTextProduct>

          <p
            style={{
              paddingTop: "10px",
              fontWeight: 500,
              borderTop: "1px solid #e5e5e5",
            }}
          >
            Mô tả
          </p>
          <div>{props.description}</div>
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div className="flex items-center mb-2">
              <div style={{ fontWeight: 500 }}>Số lượng</div>
              <p style={{ paddingLeft: "10px", fontSize: "10px" }}>
                ( còn {props.quantity} )
              </p>
            </div>

            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease", numProduct === 1)}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                max={props.quantity}
                min={1}
                value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChangeCount("increase", numProduct === props?.quantity)
                }
              >
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", aliggItems: "center", gap: "12px" }}>
            <div>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: "rgb(255, 57, 69)",
                  height: "48px",
                  width: "220px",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={handleAddOrderProduct}
                textbutton={"Chọn mua"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
              {errorLimitOrder && (
                <div style={{ color: "red" }}>Sản phẩm hết hàng</div>
              )}
            </div>
          </div>
        </Col>
        <Col span={7} style={{ paddingLeft: "20px" }}>
          <div>
            <p className="font-bold text-2xl">Chi tiết sản phẩm</p>
            <p className="font-bold text-lg">Danh mục:</p>
            <span>Đồng hồ {props.category}</span>
            <p className="font-bold text-lg">Bộ máy:</p>
            <span>{props.caliber}</span>
            <p className="font-bold text-lg">Kiểu dây:</p>
            <span>{props.type}</span>
            <p className="font-bold text-lg">Kích cỡ:</p>
            <span>{props.size}</span>
            <p className="font-bold text-lg">Loại kính:</p>
            <span>{props.glass}</span>
            <p className="font-bold text-lg">Chịu nước:</p>
            <span>{props.waterResistant}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsComponent;
