import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";

import { WrapperButtonMore, WrapperProducts } from "./style";

import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct();
      if (res?.data) {
        setProduct(res?.data);
        console.log(res?.data);
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
      <WrapperProducts>
        {product.map((value) => (
          <CardComponent src={value?.images[0]} name={value?.name} price={value?.price} rate={value?.rating}  id={value?._id}/>
        ))}
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
