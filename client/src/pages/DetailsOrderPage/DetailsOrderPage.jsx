import React, { useEffect, useState } from "react";
import {
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
import { useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { orderContant } from "../../contant";
import { useMemo } from "react";
import { UPLOAD_BASE_URL } from "../../config";
import { mapColors, mapIcons, mapStatus } from "../../util/contant";

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
    <>
      <div className=" bg-[#f5f5f5] h-full pt-6 ">
        <div className="grid grid-cols-3 w-[1270px] mx-auto gap-4">
          <div className="col-span-2 bg-white rounded-lg  border shadow-lg">
            <div className="flex items-center p-5">
              <p className="text-2xl font-bold mr-3"> Chi tiết đơn hàng </p>{" "}
              <span
                className={`text-xl ${
                  mapColors[data?.status]
                } rounded-full px-2 py-1`}
              >
                {mapIcons[data?.status]}
                {mapStatus[data?.status]}
              </span>
            </div>
            <hr />
            <div className="p-5">
              {data?.orderItem?.map((order) => (
                <>
                  <div className="grid grid-cols-8 gap-3 mb-5 items-center">
                    <div className="col-span-1">
                      <img
                        alt="#"
                        src={UPLOAD_BASE_URL + "/" + order?.images[0]}
                        style={{
                          width: "90px",
                          height: "90px",
                          objectFit: "cover",
                          border: "1px solid rgb(238, 238, 238)",
                          padding: "2px",
                        }}
                      />
                    </div>
                    <div className="col-span-3"> {order?.name}</div>
                    <div className="col-span-2 flex justify-around">
                      <p>
                        {Number(order?.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      x<p>{order?.amount}</p>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      {Number(order?.price * order?.amount).toLocaleString(
                        "vi-VN",
                        { style: "currency", currency: "VND" }
                      )}
                    </div>
                  </div>
                </>
              ))}
              <hr />
              <div className="grid grid-cols-8 gap-3 mt-5 items-center">
                <div className="col-span-1"></div>
                <div className="col-span-3"></div>
                <div className="col-span-2 ">
                  <p className="text-xl font-bold">Tổng tiền:</p>
                </div>
                <div className="col-span-2 flex text-xl font-bold justify-end">
                  {Number(data?.totalPrice).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white rounded-lg border shadow-lg">
            <div className="p-5">
              <p className="text-xl my-5 font-bold">Khách hàng</p>
              <p className="">{data?.shippingAddress?.fullName}</p>
            </div>
            <hr />
            <div className="p-5">
              <p className="text-xl my-5 font-bold">Liên hệ</p>
              <p className="">{data?.shippingAddress?.phone}</p>
            </div>
            <hr />
            <div className="p-5">
              <p className="text-xl my-5 font-bold">Địa chi giao hàng</p>
              <p className="">{data?.shippingAddress?.fullName}</p>
              <p className="">{data?.shippingAddress?.phone}</p>
              <p className="">{data?.shippingAddress?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsOrderPage;
