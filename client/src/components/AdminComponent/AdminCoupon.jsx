import { Button, DatePicker, Form, Input, Modal, Radio, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "./style";
import moment from "moment";
import * as PaymentService from "../../services/PaymentService";
import InputComponent from "../InputComponent/InputComponent";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function AdminCoupon() {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [rowSelected, setRowSelected] = useState();
  const [coupons, setCoupons] = useState([]);
  const searchInput = useRef(null);

  const onCancel = () => {
    setIsOpen(false);
  };
  const { RangePicker } = DatePicker;
  const access_token = localStorage.getItem("access_token");
  const onFinish = async (values) => {
    const data = {
      code: values.code,
      startDate: values.date?.[0],
      expiredDate: values.date?.[1],
      discountPercent: values.discountPercent,
      minimumPurchaseAmount: values.minimumPurchaseAmount,
      maximumDiscountAmount: values.maximumDiscountAmount,
    };
    const res = await PaymentService.createCoupon(data, access_token);
    if (res) {
      form.resetFields();
      getAllCoupons();
    }
    setIsOpen(false);
  };
  const getAllCoupons = async () => {
    const res = await PaymentService.getAllCoupons(access_token);
    setCoupons(res?.coupons);
  };
  useEffect(() => {
    getAllCoupons();
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };
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
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            
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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          // onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          // onClick={handleDetailsProduct}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
      ...getColumnSearchProps("code"),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: "Expired Date",
      dataIndex: "expiredDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      sorter: (a, b) =>
        moment(a.expiredDate).unix() - moment(b.expiredDate).unix(),
    },
    {
      title: "Discount Percent (%)",
      dataIndex: "discountPercent",
      sorter: (a, b) => a.discountPercent - b.discountPercent,
    },
    {
      title: "Maximum Discount Amount (VND)",
      dataIndex: "maximumDiscountAmount",
      sorter: (a, b) => a.maximumDiscountAmount - b.maximumDiscountAmount,
    },
    {
      title: "Minimum Purchase Amount (VND)",
      dataIndex: "minimumPurchaseAmount",
      sorter: (a, b) => a.minimumPurchaseAmount - b.minimumPurchaseAmount,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    coupons?.length &&
    coupons?.map((coupon) => {
      return {
        ...coupon,
        key: coupon._id,
      };
    });

  return (
    <div>
      <WrapperHeader>Quản lý mã giảm giá</WrapperHeader>
      <div className="mt-6">
        <TableComponent
          keyselected="coupon"
          createCoupon={() => setIsOpen(true)}
          columns={columns}
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
      <Modal
        open={isOpen}
        width={400}
        onCancel={onCancel}
        title="Thêm mã giảm giá"
        footer={null}
      >
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Mã giảm giá"
            name="code"
            rules={[
              { required: true, message: "Please input your code!" },
              {
                min: 8,
                message: "Please include 8 characters or more",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thời hạn giảm giá"
            name="date"
            rules={[{ required: true, message: "Please input your code!" }]}
          >
            <RangePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            label="Phần trăm giảm giá"
            name="discountPercent"
            rules={[{ required: true, message: "Please input your code!" }]}
          >
            <Radio.Group>
              <Radio value={5}>5%</Radio>
              <Radio value={10}>10%</Radio>
              <Radio value={15}>15%</Radio>
              <Radio value={20}>20%</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Giá trị đơn hàng tối thiểu (VND)"
            name="minimumPurchaseAmount"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giảm giá tối đa (VND)"
            name="maximumDiscountAmount"
            rules={[{ pattern: /^[0-9]*$/, message: "Please input number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button  htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
