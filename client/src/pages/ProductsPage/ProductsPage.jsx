import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Breadcrumb, Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import * as ProductService from "../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { slideBrands } from "./slideBrand";
import { searchBrand } from "../../redux/slides/productSlide";

const ProductsPage = () => {
  const onChange = () => {};
  const dispatch = useDispatch();
  const onClick = (brand) => {
    dispatch(searchBrand({ brand: brand }));
  };
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const search = useSelector((state) => state.product.search);
  const brands = useSelector((state) => state.product.brand);
  const getAllProducts = async () => {
    const data = {
      category: search?.category,
      caliber: search?.caliber,
      minRating: search?.minRating,
      minPrice: search?.minPrice,
      maxPrice: search?.maxPrice,
      brand: brands,
    };
    try {
      setLoading(true);
      const res = await ProductService.getAllProduct(data);
      if (res?.data) {
        setProduct(res?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [search]);
  const { page: category } = useParams();
  const breadcrumbItems =
    category === undefined
      ? [
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: <Link to="/products">Sản phẩm</Link>,
          },
        ]
      : [
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: <Link to="/products">Sản phẩm</Link>,
          },
          {
            title: (
              <Link to={`/products/${category}`}>
                {category === "donghonam"
                  ? "Đồng hồ nam"
                  : category === "donghonu"
                  ? "Đồng hồ nữ"
                  : null}
              </Link>
            ),
          },
        ];
  return (
    <Loading isLoading={loading}>
      <div style={{ padding: " 0 80px", background: "#efefef" }}>
        <Breadcrumb items={breadcrumbItems} />
        <hr />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {slideBrands?.map((value, index) => (
            <div style={{ textAlign: "center" }} key={index}>
              <img
                onClick={() => onClick(value.brand)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  border: "1px solid #000000 ",
                  borderRadius: "5px",
                  width: "100%",
                  height: "70px",
                }}
                src={value.image}
                alt="slide"
              />
            </div>
          ))}
        </div>
        <Row
          style={{
            flexWrap: "nowrap",
            paddingTop: "10px",
          }}
        >
          <WrapperNavbar span={6}>
            <NavBarComponent />
          </WrapperNavbar>
          <Col span={18} style={{ paddingLeft: "20px" }}>
            {product.length > 0 ? (
              <>
                <WrapperProducts>
                  {product.map((value) => (
                    <CardComponent
                      type={value?.type}
                      brand={value?.brand}
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
              </>
            ) : (
              <p>Không có sản phẩm.</p>
            )}
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default ProductsPage;
