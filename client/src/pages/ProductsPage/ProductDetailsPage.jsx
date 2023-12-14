import React, { useEffect, useState } from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { Carousel } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import Comment from "../../components/CommentComponent";
import { glass, size, waterResistant } from "../../constant/constant";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const [brandShow, setBrandShow] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const id = parts.pop();
  const access_token = localStorage.getItem("access_token");

  const getDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(id);
    if (res?.data) {
      setProduct(res?.data);
    }
  };
  console.log(suppliers);
  const getAllBrands = async () => {
    const res = await ProductService.getAllBrands();
    setBrandShow(res);
  };
  const getAllSuppliers = async () => {
    const res = await ProductService.getAllSupplier(access_token);
    setSuppliers(res);
  };
  const getAllProducts = async () => {
    const data = {
      brand: product?.brand,
    };
    const res = await ProductService.getAllProduct(data);
    if (res?.data) {
      setProducts(res?.data);
    }
  };
  useEffect(() => {
    getDetailsProduct();
    getAllBrands();
    getAllSuppliers();
  }, []);
  useEffect(() => {
    getAllProducts();
  }, [product?.brand]);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "85%", margin: "0 auto" }}>
        <ProductDetailsComponent
          description={product?.description}
          rate={product?.rating}
          idProduct={product?._id}
          brand={
            brandShow.filter((item) => item._id === product?.brand)[0]?.name
          }
          name={product?.name}
          images={product?.images}
          price={product?.price}
          quantity={product?.quantity}
          type={product?.type}
          category={product?.category}
          caliber={product?.caliber}
          waterResistant={waterResistant[product?.waterResistant]}
          size={size[product?.size]}
          glass={glass[product?.glass]}
          supplier={
            suppliers?.filter((item) => item._id === product?.supplier)[0]?.name
          }
        />
        <div
          style={{
            backgroundColor: "#fff",
            height: "100px",
          }}
        >
          <div style={{ borderTop: "1px solid #e5e5e5" }}>
            <h1 className="font-bold text-3xl" style={{ marginLeft: "20px" }}>
              Bình luận
            </h1>
            <Comment productId={product?._id} />
          </div>
          <div
            style={{ borderTop: "1px solid #e5e5e5", paddingBottom: "20px" }}
          >
            <h1 className="font-bold text-3xl" style={{ marginLeft: "20px" }}>
              Sản phẩm liên quan
            </h1>
            {products?.length > 4 ? (
              <Carousel
                slidesToShow={4}
                autoplaySpeed={2000}
                style={{ marginLeft: "20px" }}
                autoplay
              >
                {products?.map((value, index) => (
                  <CardComponent
                    key={index}
                    type={value?.type}
                    brand={
                      brandShow.filter((item) => item._id === value.brand)[0]
                        ?.name
                    }
                    src={value?.images[0]}
                    name={value?.name}
                    price={value?.price}
                    rate={value?.rating}
                    id={value?._id}
                  />
                ))}
              </Carousel>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {products?.map((value, index) => (
                  <CardComponent
                    key={index}
                    type={value?.type}
                    brand={
                      brandShow.filter((item) => item._id === value?.brand)[0]
                        ?.name
                    }
                    src={value?.images[0]}
                    name={value?.name}
                    price={value?.price}
                    rate={value?.rating}
                    id={value?._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
