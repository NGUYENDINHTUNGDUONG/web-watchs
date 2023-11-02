import { Checkbox, Rate } from "antd";
import React from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";

const NavBarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div style={{ dispaly: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span> {`Từ ${option}  sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLableText>Lable</WrapperLableText>
      <WrapperContent>
        {renderContent("text", ["ĐỒNG HỒ NAM", "ĐỒNG HỒ NỮ"])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "ĐỒNG HỒ Automatic", label: "ĐỒNG HỒ Automatic" },
          { value: "ĐỒNG HỒ PIN", label: "ĐỒNG HỒ PIN" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [3, 4, 5])}</WrapperContent>
      <WrapperContent>
        {renderContent("price", [
          "Dưới 2,000,000",
          "Từ 2,000,000 Đến 5,000,000",
          "Từ 5,000,000 Đến 10,000,000",
          "Từ 10,000,000 Đến 20,000,000",
          "Từ 20,000,000 Đặn 50,000,000",
        ])}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
