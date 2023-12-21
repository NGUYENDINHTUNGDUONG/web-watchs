import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { searchProduct } from "../../services/ProductService";

const SearchComponent = (props) => {
  const [term, setTerm] = useState('')
  const {
    size,
    placeholder,
    textbutton,
    bordered = false,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#000",
    colorButton = "#fff",
  } = props;

  useEffect(()=>{
if(term?.trim()?.length>0){
  searchProduct(term?.trim().le)
}
  },[term])
  return (
    <div style={{ display: "flex", gap: "10px", backgroundColor: "#fff" }}>
      <InputComponent
      value= {term}
      onChange={(e)=>{
        setTerm(e.target.value)
      }}

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
