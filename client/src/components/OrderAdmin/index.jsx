import { Button, Modal, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";

import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import {
  EditOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { orderContant } from "../../contant";
import { mapColors, mapIcons, mapStatus } from "../../util/contant";
import { getListAddresses } from "../../redux/slides/orderSlide";
import axios from "axios";
import { UPLOAD_BASE_URL } from "../../config";
import ModalComponent from "../ModalComponent/ModalComponent";

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user);
  const [rowSelected, setRowSelected] = useState("");
  const [status, setStatus] = useState("");

  const searchInput = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");
  const [data, setData] = useState([]);
  const listCity = useSelector((state) => state.order.listCity);
  const fetchDetailsOrder = async (id) => {
    const res = await OrderService.getDetailsOrder(id, access_token);
    if (res) {
      setData(res.data);
      setStatus(res?.data?.status);
    }
    return res.data;
  };
  const onChangeStatus = (value) => {
    setStatus(value);
  };
  const onCancel = () => {
    setIsOpen(false);
  };
  const updateStatus = async () => {
    const data = { status: status };
    const res = await OrderService.updateStatusOrder(
      rowSelected,
      data,
      access_token
    );
    if (res) {
      queryOrder.refetch();
      setIsOpenStatus(false);
    }
  };
  const res = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
    if (res) {
      dispatch(getListAddresses({ listCity: res.data }));
    }
  };

  useEffect(() => {
    fetchDetailsOrder(rowSelected);
    res();
  }, [rowSelected]);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(access_token);
    return res;
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="bg-blue-400 "
            
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const handleStatus = () => {
    setIsOpenStatus(true);
  };
  const renderAction = () => {
    return (
      <div className="flex justify-around">
        <EditOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={handleStatus}
        />
        <ExclamationCircleOutlined
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text) => "0" + text,
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) =>
        listCity.filter((item) => item?.code === text[0])[0]?.name +
        " - " +
        listCity
          ?.filter((item) => item?.code === text[0])?.[0]
          ?.districts.filter((item) => item?.code === text[1])?.[0]?.name +
        " - " +
        listCity
          ?.filter((item) => item?.code === text[0])?.[0]
          ?.districts.filter((item) => item?.code === text[1])?.[0]
          ?.wards.filter((item) => item?.code === text[2])?.[0]?.name +
        " - " +
        text[3],

      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => mapStatus[text],
      sorter: (a, b) => a.status.length - b.status.length,
      ...getColumnSearchProps("status"),
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      render: (text) => Number(text).toLocaleString("vi-VN") + " đ",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        // paymentMethod: orderContant.payment[order?.paymentMethod],
        totalPrice: Number(order?.totalPrice),
      };
    });
  const selects = [
    {
      value: "pending",
      label: "Đang chờ xử lý",
    },
    {
      value: "shipping",
      label: "Đang giao hàng",
    },
    {
      value: "done",
      label: "Đã giao hàng",
    },

  ];
  const handleCancel = () => {
    setIsOpenStatus(false);
  };

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <Modal width={"80%"} open={isOpen} onCancel={onCancel} footer={null}>
        <>
          <div className="pt-6">
            <div className="grid grid-cols-3  mx-auto gap-4">
              <div className="col-span-2 bg-white rounded-lg  border shadow-lg">
                <div className="flex items-center p-5">
                  <p className="text-2xl font-bold mr-3"> Chi tiết đơn hàng </p>{" "}
                  <span
                    className={`text-xl ${
                      mapColors[data?.status]
                    } rounded-full px-2 py-1 mr-3`}
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
                  <p className="text-xl mb-3 font-bold">Khách hàng</p>
                  <p className="">{data?.shippingAddress?.fullName}</p>
                </div>
                <hr />
                <div className="p-5">
                  <p className="text-xl mb-3 font-bold">Liên hệ</p>
                  <p className="">0{data?.shippingAddress?.phone}</p>
                </div>
                <hr />
                <div className="p-5">
                  <p className="text-xl mb-3 font-bold">Địa chi giao hàng</p>
                  <p className="">
                    {}
                    {`${
                      listCity.filter(
                        (item) =>
                          item?.code === data?.shippingAddress?.address[0]
                      )[0]?.name
                    } - ${
                      listCity
                        ?.filter(
                          (item) =>
                            item?.code === data?.shippingAddress?.address[0]
                        )?.[0]
                        ?.districts.filter(
                          (item) =>
                            item?.code === data?.shippingAddress?.address[1]
                        )?.[0]?.name
                    } - ${
                      listCity
                        ?.filter(
                          (item) =>
                            item?.code === data?.shippingAddress?.address[0]
                        )?.[0]
                        ?.districts.filter(
                          (item) =>
                            item?.code === data?.shippingAddress?.address[1]
                        )?.[0]
                        ?.wards.filter(
                          (item) =>
                            item?.code === data?.shippingAddress?.address[2]
                        )?.[0]?.name
                    } - ${data?.shippingAddress?.address[3]}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
      <ModalComponent open={isOpenStatus} onCancel={handleCancel} title="Trạng thái đơn hàng" footer={null}>
        <div className="flex flex-col gap-5">
          <Select
            placeholder="Edit status"
            options={selects}
            value={status}
            onChange={onChangeStatus}
          ></Select>
          <Button onClick={updateStatus}>Submit</Button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default OrderAdmin;
