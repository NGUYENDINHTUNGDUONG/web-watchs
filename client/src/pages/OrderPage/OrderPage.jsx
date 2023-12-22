import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
} from "./style";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  addDiscount,
  addShippingAddresses,
  decreaseAmount,
  getListAddresses,
  getListCoupons,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import * as PaymentService from "../../services/PaymentService";
import * as message from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepComponet/StepComponent";
import { UPLOAD_BASE_URL } from "../../config";
import axios from "axios";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [checkCoupon, setCheckCoupon] = useState([]);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [maximumDiscountAmount, setMaximumDiscountAmount] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [districts, setDistricts] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [wards, setWards] = useState();
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.order.address);
  const phone = useSelector((state) => state.order.phone);
  const email = useSelector((state) => state.order.email);
  const names = useSelector((state) => state.order.name);
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };
  const res = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
    if (res) {
      dispatch(getListAddresses({ listCity: res.data }));
    }
  };
  useEffect(() => {
    res();
  }, []);
  const onChangeCoupon = (e) => {
    if (checkCoupon.includes(e.target.value)) {
      setCheckCoupon([]);
    } else {
      setCheckCoupon((prevCheckCoupon) => [e.target.value]);
    }
  };
  useEffect(() => {
    if (city) {
      setDistricts(
        listCity.filter((element) => element.code === city)[0]?.districts
      );
    }
  }, [city]);
  useEffect(() => {
    if (district) {
      setWards(
        districts.filter((element) => element.code === district)[0]?.wards
      );
    }
  }, [district]);
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    (async () => {
      try {
        const res = await PaymentService.getAllCoupons(access_token);
        if (res) {
          dispatch(getListCoupons({ listCoupons: res.coupons }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res]);
  const listCoupons = useSelector((state) => state.order.listCoupons);
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    const res = listCoupons?.filter((coupon) => coupon._id === checkCoupon[0]);
    const discount = res[0]?.discountPercent;
    setMaximumDiscountAmount(res[0]?.maximumDiscountAmount);
    if (discount) {
      dispatch(addDiscount({ discount: discount / 100 }));
    }
  }, [checkCoupon]);
  const result = useSelector((state) => state.order.discount);
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order, checkCoupon]);

  const priceDiscountMemo = useMemo(() => {
    const total = result * priceMemo;
    if (Number(total) && Number(total) < Number(maximumDiscountAmount)) {
      return total;
    } else if (Number(total) > Number(maximumDiscountAmount)) {
      return maximumDiscountAmount;
    }
    return 0;
  }, [order, checkCoupon]);
  const listCity = useSelector((state) => state.order.listCity);
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 5000000 && priceMemo < 15000000) {
      return 10000;
    } else if (
      priceMemo >= 15000000 ||
      order?.orderItemsSlected?.length === 0
    ) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = async () => {
    if (!order?.orderItemsSlected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!phone || !addresses || !names || !email) {
      setIsOpenModalUpdateInfo(true);
    } else {
      const access_token = localStorage.getItem("access_token");
      const data = { couponId: checkCoupon[0] };
      const res = await PaymentService.usedCoupon(data, access_token);
      navigate("/payment");
    }
  };
  const handleAddress = () => {
    if (city && district && ward) {
      dispatch(
        addShippingAddresses({
          address: [city, district, ward, address],
          name: user?.fullName,
          email: user?.email,
          phone: user?.phone,
        })
      );

      setIsOpenModalUpdateInfo(false);
    }
  };

  const itemsDelivery = [
    {
      title: "20.000 VND",
      description: "Dưới 5.000.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 5.000.000 VND đến dưới 15.000.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 15.000.000 VND",
    },
  ];
  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontWeight: "bold" }}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <h4>Phí giao hàng</h4>
            <WrapperStyleHeaderDilivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 20000
                    ? 0
                    : diliveryPriceMemo === 10000
                    ? 1
                    : order.orderItemsSlected.length === 0
                    ? 0
                    : 2
                }
              />
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></CustomCheckbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CustomCheckbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></CustomCheckbox>
                      <img
                        src={UPLOAD_BASE_URL + "/" + order?.images[0]}
                        alt="img"
                        width={77}
                        height={79}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {Number(order?.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "decrease",
                              order?.product,
                              order?.amount === 1
                            )
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.quantity}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              order?.product,
                              order?.amount === order.quantity,
                              order?.amount === 1
                            )
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {Number(order?.price * order?.amount).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div className="flex flex-col">
                  <span>
                    Địa chỉ:{" "}
                    <span
                      onClick={handleChangeAddress}
                      style={{ color: "#9255FD", cursor: "pointer" }}
                    >
                      Chọn
                    </span>
                  </span>

                  {addresses.length > 0 ? (
                    <span style={{ fontWeight: "bold" }}>
                      {`${
                        listCity.filter(
                          (item) => item?.code === addresses[0]
                        )[0]?.name
                      } - ${
                        listCity
                          ?.filter((item) => item?.code === addresses[0])?.[0]
                          ?.districts.filter(
                            (item) => item?.code === addresses[1]
                          )?.[0]?.name
                      } - ${
                        listCity
                          ?.filter((item) => item?.code === addresses[0])?.[0]
                          ?.districts.filter(
                            (item) => item?.code === addresses[1]
                          )?.[0]
                          ?.wards.filter(
                            (item) => item?.code === addresses[2]
                          )?.[0]?.name
                      } - ${addresses[3]}`}
                    </span>
                  ) : null}
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {Number(priceMemo).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="flex">
                    <span className="mr-2">Mã giảm giá</span>
                    <span
                      className="cursor-pointer text-[#eb0000] font-bold"
                      onClick={() => {
                        setIsCouponOpen(true);
                      }}
                    >
                      Chọn
                    </span>
                  </div>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {Number(priceDiscountMemo).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {Number(diliveryPriceMemo).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {Number(totalPriceMemo).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textbutton={"Mua hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        footer={null}
        // onCancel={() => setIsOpenModalUpdateInfo(false)}
        // onOk={handleAddress}
      >
        <Form
          name="basic"
          onFinish={handleAddress}
          layout="vertical"
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tỉnh/Thành phố"
            name="city"
            rules={[{ required: true, message: "Please input your  city!" }]}
          >
            <Select
              placeholder="Tình/Thành phố"
              options={listCity?.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              onChange={(value) => {
                setCity(value);
              }}
              value={city}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[{ required: true, message: "Please input your  address!" }]}
          >
            <Select
              placeholder="Quận/Huyện"
              options={districts?.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              onChange={(value) => {
                setDistrict(value);
              }}
              value={district}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Xã/Phường"
            name="ward"
            rules={[{ required: true, message: "Please input your ward!" }]}
          >
            <Select
              placeholder="Xã/Phường"
              options={wards?.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              onChange={(value) => {
                setWard(value);
              }}
              value={ward}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Số nhà"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              placeholder="Số nhà"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button htmlType="submit">Ok</Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <Modal
        open={isCouponOpen}
        onCancel={() => setIsCouponOpen(false)}
        title="Chọn mã giảm giá"
        width={500}
        footer={null}
      >
        <Checkbox.Group value={checkCoupon}>
          {listCoupons?.filter(
            (coupon) => coupon.minimumPurchaseAmount < priceMemo
          ).length === 0
            ? "Chưa đủ điều kiện hoặc chưa chọn sản phẩm"
            : listCoupons
                ?.filter((coupon) => coupon.minimumPurchaseAmount < priceMemo)
                .map((coupon) => {
                  return (
                    <Checkbox
                      key={coupon?._id}
                      className="w-full mb-2"
                      value={coupon?._id}
                      onChange={onChangeCoupon}
                    >
                      <div className=" items-center flex-start">
                        <p style={{ fontSize: "18px" }}>
                          Mã giảm giá {coupon?.code}
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          Giảm {coupon?.discountPercent}% (tối đa{" "}
                          <span style={{ color: "red" }}>
                            {Number(
                              coupon?.maximumDiscountAmount
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                          )
                        </p>
                      </div>
                    </Checkbox>
                  );
                })}
        </Checkbox.Group>
        <div className="text-right">
          <Button className="mt-3" onClick={() => setIsCouponOpen(false)}>
            Ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderPage;
