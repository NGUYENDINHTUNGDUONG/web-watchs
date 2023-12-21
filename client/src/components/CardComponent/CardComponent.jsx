import React from "react";
import { StarFilled } from "@ant-design/icons";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";

const CartComponent = (props) => {
  const navigate = useNavigate();
  return (
    <WrapperCardStyle
      onClick={() => navigate(`/product-details/${props.id}`)}
      hoverable
      headStyle={{ width: "220px", height: "300px" }}
      style={{ width: "100%", height: "100%" }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          style={{ height: "300px", objectFit: "cover" }}
          alt="example"
          src={`http://localhost:3001/static/${props.src}`}
        />
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Image
          src={"/images/chinhhang.png"}
          style={{
            width: "80px",
            height: "20px",
            position: "absolute",
            bottom: 1,
            borderTopLeftRadius: "3px",
          }}
        />
        {props.rate > 0 ? (
          <WrapperReportText>
            <span style={{ marginRight: "4px" }}>
              <span>{props.rate} </span>{" "}
              <StarFilled
                style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
              />
            </span>
          </WrapperReportText>
        ) : (
          <WrapperReportText>
            <span style={{ marginRight: "4px", color: "white" }}>
              <span>{props.rate} </span> ""
            </span>
          </WrapperReportText>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <StyleNameProduct>{props.name}</StyleNameProduct>
        <p style={{ margin: "0", marginTop: "4px" }}>
          {props.brand} - {props.type}
        </p>

        <WrapperPriceText>
          <span style={{ marginRight: "8px" }}>
            {Number(props.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </WrapperPriceText>
      </div>
    </WrapperCardStyle>
  );
};

export default CartComponent;
