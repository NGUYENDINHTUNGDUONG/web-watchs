import React from "react";
import { useNavigate } from "react-router-dom";

const TypeComponent = (props) => {
  const navigate = useNavigate();
  return <div style={{cursor: "pointer"}} onClick={() => navigate(props.url)} >{props.title}</div>;
};

export default TypeComponent;
