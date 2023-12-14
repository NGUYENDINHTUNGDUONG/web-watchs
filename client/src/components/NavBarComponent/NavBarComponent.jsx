import { Checkbox, Radio, Rate, Slider } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchBrand, searchProduct } from "../../redux/slides/productSlide";
import { categoryMappings } from "../../constant/constant";
import * as ProductService from "../../services/ProductService";

const NavBarComponent = () => {
  const { page: category } = useParams();
  const [calibers, setCalibers] = useState([]);
  const [price, setPrice] = useState([0, 1000000000]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [defaultRadioValue, setDefaultRadioValue] = useState(category);
  const [minRating, setMinRating] = useState(null);
  const [caliberValue, setCaliberValue] = useState("");
  const brandValue = useSelector((state) => state.product.brand);

  const Rating = ({ rating }) => {
    setMinRating(rating);
  };
  const getAllCaliberProduct = async () => {
    const res = await ProductService.getAllCaliberProduct();
    if (res) {
      setCalibers(res.calibers);
    }
  };
  const getAllBrandProduct = async () => {
    const res = await ProductService.getAllBrands();
    if (res) {
      setBrands(res);
    }
  };

  useEffect(() => {
    if (category === undefined) {
      setDefaultRadioValue();
      setCaliberValue("");
      setMinRating(null);
      dispatch(
        searchProduct({
          ["category"]: "",
          ["caliber"]: caliberValue,
          ["minRating"]: minRating,
          ["minPrice"]: price[0],
          ["maxPrice"]: price[1],
          ["brand"]: brandValue,
        })
      );
    } else {
      setDefaultRadioValue(category);
      dispatch(
        searchProduct({
          ["category"]: categoryMappings[category],
          ["caliber"]: caliberValue,
          ["minRating"]: minRating,
          ["minPrice"]: price[0],
          ["maxPrice"]: price[1],
          ["brand"]: brandValue,
        })
      );
      dispatch(searchBrand({ brand: brandValue }));
    }
  }, [category, caliberValue, minRating, price, brandValue]);
  useEffect(() => {
    getAllCaliberProduct();
    getAllBrandProduct();
  }, []);
  const onChangeRadio = (file) => {
    setDefaultRadioValue(file.target.value);
    navigate(`/products/${file.target.value}`);
  };
  const renderContent = (type, options) => {
    switch (type) {
      case "radio":
        return (
          <Radio.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChangeRadio}
            value={defaultRadioValue}
          >
            {options.map((option,index) => {
              return (
                <Radio key={index} style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            value={caliberValue}
            onChange={(e) => {
              setCaliberValue(e);
            }}
          >
            {options.map((option,index) => {
              return (
                <Checkbox key={index} style={{ marginLeft: 0 }} value={option}>
                  {option}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return (
          <Radio.Group
            onChange={(e) => {
              Rating({ rating: e.target.value });
            }}
            value={minRating}
          >
            {options.map((option,index) => {
              return (
                <Radio key={index} style={{ marginLeft: 0 }} value={option}>
                  <Rate
                    style={{ fontSize: "12px" }}
                    disabled
                    defaultValue={option}
                  />
                  <span> {`Từ ${option}  sao`}</span>
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case "price":
        return (
          <Slider
            range={{ draggableTrack: true }}
            onChange={(e) => {
              setPrice(e);
            }}
            step={5000000}
            max={1000000000}
            defaultValue={[0, 1000000000]}
          />
        );
      case "brand":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            value={brandValue}
            onChange={(e) => {
              dispatch(searchBrand({ brand: e }));
            }}
          >
            {options.map((option,index) => {
              return (
                <Checkbox key={index} style={{ marginLeft: 0 }} value={option.name}>
                  {option.name}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      default:
        return {};
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl " style={{ marginTop: "0" }}>Lọc sản phẩm</h2>
      <h4 className="font-bold">Loại sản phẩm</h4>
      <WrapperContent>
        {renderContent("radio", [
          { value: "donghonam", label: "Đồng hồ nam" },
          { value: "donghonu", label: "Đồng hồ nữ" },
        ])}
      </WrapperContent>
      <h4 className="font-bold">Kiểu máy</h4>
      <WrapperContent>{renderContent("checkbox", calibers)}</WrapperContent>
      <h4 className="font-bold">Đánh giá</h4>
      <WrapperContent>{renderContent("star", [1, 2, 3, 4, 5])}</WrapperContent>
      <h4 className="font-bold">Giá</h4>
      <p>
        Giá từ{" "}
        {Number(price[0]).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}{" "}
        đến{" "}
        {Number(price[1]).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <WrapperContent>{renderContent("price")}</WrapperContent>
      <h4 className="font-bold">Thương hiệu</h4>
      <WrapperContent>{renderContent("brand", brands)}</WrapperContent>
    </div>
  );
};

export default NavBarComponent;
