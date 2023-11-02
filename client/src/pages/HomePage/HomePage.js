import React from "react";

import { WrapperButtonMore, WrapperProducts } from "./style";
import slider_1 from "../../assets/images/Slider_1.jpg";
import slider_2 from "../../assets/images/Slider_2.jpg";
import slider_3 from "../../assets/images/Slider_3.jpg";
import slider_4 from "../../assets/images/Slider_4.jpg";
import slider_5 from "../../assets/images/Slider_5.jpg";

import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";

const HomePage = () => {
  return (
    <>
      <div
        id="container"
        style={{
          padding: " 0 130px",
          backgroundColor: "#000",
        }}
      >
        <SliderComponent
          arrImages={[slider_1, slider_2, slider_3, slider_4, slider_5]}
        />
      </div>
      <WrapperProducts>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </WrapperProducts>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <WrapperButtonMore
          textbutton={"Xem thêm"}
          type="outline"
          styleButton={{
            border: "1px solid #d70018",
            color: "#d70018",
            width: "240px",
            height: "38px",
            borderRadius: "4px",
          }}
          styleTextButton={{ fontWeight: 500 }}
        />
      </div>
    </>
  );
};

export default HomePage;
