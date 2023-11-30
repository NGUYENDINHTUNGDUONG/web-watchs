import React from "react";

import { WrapperButtonMore, WrapperProducts } from "./style";
import slider_1 from "../../assets/images/Slider_1.jpg";
import slider_2 from "../../assets/images/Slider_2.jpg";
import slider_3 from "../../assets/images/Slider_3.jpg";
import slider_4 from "../../assets/images/Slider_4.jpg";
import slider_5 from "../../assets/images/Slider_5.jpg";

import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { Button } from "antd";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

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
      <div className="text-4xl items-center justify-between font-medium my-10 flex">
        <hr className="w-full ml-32" />
        <div className="w-full text-center">Sản phẩm nổi bật</div>
        <hr className="w-full mr-32" />
      </div>

      <div className="flex justify-center gap-x-10 mb-10">
        <Button size={"large"} className="!bg-gray-300">
          Đồng hồ nam
        </Button>
        <Button size={"large"} className="!bg-gray-300">
          Đồng hồ nữ
        </Button>
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
      </WrapperProducts>

      <div className="text-4xl items-center justify-between font-medium my-10 flex">
        <hr className="w-full ml-32" />
        <div className="w-full text-center">
          Khách hàng nói về <br />
          chúng tôi
        </div>
        <hr className="w-full mr-32" />
      </div>
      <WrapperProducts>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </WrapperProducts>

      <div className="text-4xl items-center justify-between font-medium my-10 flex">
        <hr className="w-full ml-32" />
        <div className="w-full text-center">Thẩm định đồng hồ</div>
        <hr className="w-full mr-32" />
      </div>
      <WrapperProducts>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </WrapperProducts>

      <div className="text-4xl items-center justify-between font-medium my-10 flex">
        <hr className="w-full ml-32" />
        <div className="w-full text-center mx-10">
          Dwatch_Tin tức và <br />
          sự kiện
        </div>
        <hr className="w-full mr-32" />
      </div>
      <WrapperProducts>
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
      <div className="mt-10">
        <FooterComponent />
      </div>
    </>
  );
};

export default HomePage;
