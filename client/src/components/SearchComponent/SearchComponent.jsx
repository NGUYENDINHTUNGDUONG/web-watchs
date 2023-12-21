import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const SearchComponent = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    bordered = false,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#000",
    colorButton = "#fff",
  } = props;
  return (
    <div style={{ display: "flex", gap: "10px", backgroundColor: "#fff" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          border: !bordered && "none",
          borderRadius: "0",
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: "#fff" }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default SearchComponent;
