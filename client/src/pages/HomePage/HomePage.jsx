import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";

import { WrapperButtonMore, WrapperProducts } from "./style";

import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useNavigate } from "react-router-dom";
import { events } from "./config";
import EventComponent from "../../components/EventComponent/EventComponent";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct();
      if (res?.data) {
        setProduct(res?.data.reverse());
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div
        id="container"
        style={{
          padding: " 0 130px",
          backgroundColor: "#000",
        }}
      >
        <SliderComponent />
      </div>
      <div className="text-4xl items-center justify-between font-medium my-10 flex">
        <hr className="w-full ml-32" />
        <div className="w-full text-center">Sản phẩm nổi bật</div>
        <hr className="w-full mr-32" />
      </div>

      {/* <div className="flex justify-center gap-x-10 mb-10">
        <Button size={"large"} className="!bg-gray-300">
          Đồng hồ nam
        </Button>
        <Button size={"large"} className="!bg-gray-300">
          Đồng hồ nữ
        </Button>
      </div> */}

      <WrapperProducts>
        {product.slice(0, 8).map((value, index) => (
          <CardComponent
            key={index}
            type={value?.type}
            brand={value?.brand}
            src={value?.images[0]}
            name={value?.name}
            price={value?.price}
            rate={value?.rating}
            id={value?._id}
          />
        ))}
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

      <div className="flex mx-24 gap-5 mb-10 shadow-md mt-10">
        <div className="w-3/4">
          <div>
            <div className="w-full text-4xl font-medium ml-14">
              Dwatch_Tin tức và sự kiện
            </div>
            <div className="grid grid-cols-3 mx-10 mb-5">
              {events.map((event) => (
                <EventComponent 
                  image={event.image}
                  title={event.title}
                  time={event.time}
                  content={event.content}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 ml-10 w-1/4">
          <h1 className="font-medium text-2xl">Báo dân chí nói về Dwatch</h1>
          <hr className="w-8 h-1 bg-orange-400 my-5" />
          <img src="images/dantri.jpg" alt="" className="w-3/5"/>
          <img src="images/vietnamnet.png" alt="" className="mb-5 w-3/5"/>
          <img src="images/vtv1.png" alt="" className="w-3/5"/>
        </div>
      </div>

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
          onClick={() => {
            navigate("/products");
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
