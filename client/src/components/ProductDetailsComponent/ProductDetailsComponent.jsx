import React from "react";
import { Row, Col, Image } from "antd";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";

import imageProduct from "../../assets/images/Slider_1.jpg";
import imageProductSmall from "../../assets/images/Slider_1.jpg";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailsComponent = (props) => {
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
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
        >
          <Image
            src={`http://localhost:3001/static/${props.images?.[0]}`}
            alt="image product"
            preview={false}
          />
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            {props.images?.map((value) => (
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall
                  src={`http://localhost:3001/static/${value}`}
                  alt="image product"
                  preview={false}
                />
              </WrapperStyleColImage>
            ))}
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>{props.name}</WrapperStyleNameProduct>
          <div>
            <StarFilled
              style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
            />{" "}
            <StarFilled
              style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
            />{" "}
            <StarFilled
              style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
            />
            <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{props.price}</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          {/* <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="change-address">Đổi địa chỉ</span>
          </WrapperAddressProduct> */}
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                // onClick={() => handleChangeCount("decrease", numProduct === 1)}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                // onChange={onChange}
                defaultValue={1}
                // max={productDetails?.countInStock}
                min={1}
                // value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                // onClick={() =>
                //   handleChangeCount(
                //     "increase",
                //     numProduct === productDetails?.countInStock
                //   )
                // }
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
                // onClick={handleAddOrderProduct}
                textbutton={"Chọn mua"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
              {/* {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm hết hng</div>} */}
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(13, 92, 182)",
                borderRadius: "4px",
              }}
              textbutton={"Mua trả sau"}
              styleTextButton={{ color: "rgb(13, 92, 182)", fontSize: "15px" }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsComponent;
