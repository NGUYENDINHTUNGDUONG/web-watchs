import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const onChange = () => {};
  const [product, setProduct] = useState([]);
  const search = useSelector((state) => state.product.search);
  console.log(search, "search");
  const getAllProducts = async () => {
    const data = {
      category: search?.category,
      caliber: search?.caliber,
      minRating: search?.minRating,
    };
    
    try {
      const res = await ProductService.getAllProduct(data);
      if (res?.data) {
        setProduct(res?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllProducts();
  }, [search]);
  return (
    <div style={{ padding: " 0 80px", background: "#efefef" }}>
      <Row
        style={{
          flexWrap: "nowrap",
          paddingTop: "10px",
        }}
      >
        <WrapperNavbar span={6}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={18}>
          <WrapperProducts>
            {product.map((value) => (
              <CardComponent
                key={value?._id}
                id={value?._id}
                src={value?.images[0]}
                name={value?.name}
                price={value?.price}
                rate={value?.rating}
              />
            ))}
          </WrapperProducts>
          <Pagination
            defaultCurrent={1}
            total={product.length}
            onChange={onChange}
            style={{ textAlign: "center", marginTop: "10px" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
