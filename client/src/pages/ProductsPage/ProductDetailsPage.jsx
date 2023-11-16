import React, { useEffect, useState } from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const id = parts.pop();
  const getDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(id);
    if (res?.data) {
      setProduct(res?.data);
    }
  };
  useEffect(() => {
    getDetailsProduct();
  }, []);
  console.log(product, "detail");
  return (
    <div style={{ width: "100%", background: "#efefef", height: "100%" }}>
      <div style={{ width: "80%", height: "100%", margin: "0 auto" }}>
        <ProductDetailsComponent
          name={product?.name}
          images={product?.images}
          price={product?.price}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
