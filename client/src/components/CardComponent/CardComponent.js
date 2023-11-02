import React from "react";
import { StarFilled } from "@ant-design/icons";
import { Image } from "antd";

import official from "../../assets/images/official.png";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";

const CartComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "220px", height: "220px" }}
      style={{ width: "220px", height: "320px" }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Image
        src={official}
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          bottom: 1,
          borderTopLeftRadius: "3px",
        }}
      />
      <StyleNameProduct>ĐỒNG HỒ NAM</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>4.96 </span>{" "}
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
          />
        </span>
        <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>10.000.000đ</span>
        <WrapperDiscountText> - 5 %</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CartComponent;
