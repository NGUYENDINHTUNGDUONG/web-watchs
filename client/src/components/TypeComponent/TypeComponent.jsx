import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../../redux/slides/productSlide";

const TypeComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    navigate(props.url);
   
  };
  return (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      {props.title}
    </div>
  );
};

export default TypeComponent;
