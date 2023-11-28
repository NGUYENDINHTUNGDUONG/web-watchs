import React, { useEffect, useState } from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { useMemo } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { UPLOAD_BASE_URL } from "../../config";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const access_token = localStorage.getItem("access_token");
  const [data, setData] = useState([]);

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, access_token);
    if (res) {
      setData(res.data);
      console.log(res.data);
    }
    return res.data;
  };
  useEffect(() => {
    fetchDetailsOrder();
  }, []);
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <div style={{ width: "100%", background: "#f5f5fa" }}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <h4>Chi tiết đơn hàng</h4>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className="name-info">{data?.shippingAddress?.fullName}</div>
              <div className="address-info">
                <span>Địa chỉ: </span> {`${data?.shippingAddress?.address}`}
              </div>
              <div className="phone-info">
                <span>Điện thoại: </span> {data?.shippingAddress?.phone}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className="delivery-info">
                <span className="name-delivery">FAST </span>Giao hàng tiết kiệm
              </div>
              <div className="delivery-fee">
                <span>Phí giao hàng: </span> {data?.shippingPrice}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className="payment-info">
                {orderContant.payment[data?.paymentMethod]}
              </div>
              <div className="status-payment">
                {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "670px" }}>Sản phẩm</div>
            <WrapperItemLabel>Trạng thái </WrapperItemLabel>
            <WrapperItemLabel>Giá </WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
          </div>
          {data?.orderItem?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <img
                    alt="#"
                    src={UPLOAD_BASE_URL + "/" + order?.images[0]}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      border: "1px solid rgb(238, 238, 238)",
                      padding: "2px",
                    }}
                  />
                  <div
                    style={{
                      width: 260,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginLeft: "10px",
                      height: "70px",
                    }}
                  >
                    {order?.name}
                  </div>
                </WrapperNameProduct>
                <WrapperItem>{data?.status}</WrapperItem>
                <WrapperItem>{Number(order?.price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                {/* <WrapperItem>
                  {order?.discount
                    ? Number((priceMemo * order?.discount) / 100).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
                    : "0 VND"}
                </WrapperItem> */}
                <WrapperItem>{Number(data?.totalPrice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</WrapperItem>
              </WrapperProduct>
            );
          })}

          {/* <WrapperAllPrice>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>{Number(priceMemo).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>{Number(data?.shippingPrice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</WrapperItem>
          </WrapperAllPrice> */}
          {/* <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem>
              <WrapperItem>{Number(data?.totalPrice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</WrapperItem>
            </WrapperItem>
          </WrapperAllPrice> */}
        </WrapperStyleContent>
      </div>
    </div>
  );
};

export default DetailsOrderPage;
