import { Checkbox, Radio, Rate } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/slides/productSlide";
import { categoryMappings } from "../../constant/constant";
import * as ProductService from "../../services/ProductService";

const NavBarComponent = () => {
  const { page: category } = useParams();
  const [calibers, setCalibers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [defaultRadioValue, setDefaultRadioValue] = useState(category);
  const [minRating, setMinRating] = useState(0);
  const [caliberValue, setCaliberValue] = useState(calibers);
  const Rating = ({ rating }) => {
    setMinRating(rating);
  };
  const getAllCaliberProduct = async () => {
    const res = await ProductService.getAllCaliberProduct();
    if (res) {
      setCalibers(res.calibers);
    }
  };

  useEffect(() => {
    setDefaultRadioValue(category);
    dispatch(
      searchProduct({
        ["category"]: categoryMappings[category],
        ["caliber"]: caliberValue,
        ["minRating"]: minRating,
      })
    );
  }, [category, caliberValue, minRating]);
  useEffect(() => {
    getAllCaliberProduct();
  }, []);
  console.log(caliberValue);
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
            {options.map((option) => {
              return (
                <Radio style={{ marginLeft: 0 }} value={option.value}>
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
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option}>
                  {option}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return (
          <Checkbox.Group
            onChange={(e) => {
              Rating({ rating: e });
            }}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option}>
                  <Rate
                    style={{ fontSize: "12px" }}
                    disabled
                    defaultValue={option}
                  />
                  <span> {`Từ ${option}  sao`}</span>
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );

      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: "0" }}>Lọc sản phẩm</h2>
      <h4>Loại sản phẩm</h4>
      <WrapperContent>
        {renderContent("radio", [
          { value: "donghonam", label: "Đồng hồ nam" },
          { value: "donghonu", label: "Đồng hồ nữ" },
        ])}
      </WrapperContent>
      <h4>Kiểu máy</h4>
      <WrapperContent>{renderContent("checkbox", calibers)}</WrapperContent>
      <h4>Đánh giá</h4>
      <WrapperContent>{renderContent("star", [1, 2, 3, 4, 5])}</WrapperContent>
      <h4>Giá</h4>
      <WrapperContent>
        {renderContent("price", [
          "Dưới 2,000,000",
          "Từ 2,000,000 Đến 5,000,000",
          "Từ 5,000,000 Đến 10,000,000",
          "Từ 10,000,000 Đến 20,000,000",
          "Từ 20,000,000 Đặn 50,000,000",
        ])}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
