import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { UPLOAD_BASE_URL } from "../../config";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(access_token);
    return res.data;
  };
  const user = useSelector((state) => state.user);

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrder }
    // {
    //   enabled: state?.id && state?.token,
    // }
  );

  const { isLoading, data } = queryOrder;
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItem: order?.orderItems,
        userId: user.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel]);
  console.log(data, "tétt");
  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
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
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            {Number(order?.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <WrapperContainer>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h4>Đơn hàng của tôi</h4>
        <WrapperListOrder>
          {data?.map((order) => {
            return (
              <WrapperItemOrder key={order?._id}>
                <WrapperStatus>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Trạng thái
                  </span>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Giao hàng:{" "}
                    </span>
                    <span
                      style={{
                        color: "rgb(90, 32, 193)",
                        fontWeight: "bold",
                      }}
                    >{`${
                      order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"
                    }`}</span>
                  </div>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Thanh toán:{" "}
                    </span>
                    <span
                      style={{
                        color: "rgb(90, 32, 193)",
                        fontWeight: "bold",
                      }}
                    >{`${
                      order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                    }`}</span>
                  </div>
                </WrapperStatus>
                {renderProduct(order?.orderItem)}
                <WrapperFooterItem>
                  <div>
                    <span style={{ color: "rgb(255, 66, 78)" }}>
                      Tổng tiền:{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgb(56, 56, 61)",
                        fontWeight: 700,
                      }}
                    >
                      {Number(order?.totalPrice).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <ButtonComponent
                      onClick={() => handleCanceOrder(order)}
                      size={40}
                      styleButton={{
                        height: "36px",
                        border: "1px solid #9255FD",
                        borderRadius: "4px",
                      }}
                      textbutton={"Hủy đơn hàng"}
                      styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                    ></ButtonComponent>
                    <ButtonComponent
                      onClick={() => handleDetailsOrder(order?._id)}
                      size={40}
                      styleButton={{
                        height: "36px",
                        border: "1px solid #9255FD",
                        borderRadius: "4px",
                      }}
                      textbutton={"Xem chi tiết"}
                      styleTextButton={{ color: "#9255FD", fontSize: "14px" }}
                    ></ButtonComponent>
                  </div>
                </WrapperFooterItem>
              </WrapperItemOrder>
            );
          })}
        </WrapperListOrder>
      </div>
    </WrapperContainer>
  );
};

export default MyOrderPage;
