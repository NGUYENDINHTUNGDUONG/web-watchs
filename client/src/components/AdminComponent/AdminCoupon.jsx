import { Button, DatePicker, Form, Input, Modal, Radio } from "antd";
import React, { useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "./style";
import moment from "moment";
import * as PaymentService from "../../services/PaymentService";

export default function AdminCoupon() {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const onCancel = () => {
    setIsOpen(false);
  };
  const { RangePicker } = DatePicker;
  const access_token = localStorage.getItem("access_token");
  const onFinish = async (values) => {
    const data = {
      code: values.code,
      startDate: moment(values.date?.[0]).toDate(),
      expiredDate: moment(values.date?.[1]).toDate(),
      discountPercent: values.discountPercent,
      minimumPurchaseAmount: values.minimumPurchaseAmount,
      maximumDiscountAmount: values.maximumDiscountAmount,
    };
    const res = await PaymentService.createCoupon(data, access_token);
    if (res) {
      console.log(res);
      form.resetFields();
    }
    console.log(data);
    console.log(typeof values.date?.[0]);
    setIsOpen(false);
  };
  return (
    <div>
      <WrapperHeader>Quản lý mã giảm giá</WrapperHeader>
      <div className="mt-6">
        <TableComponent
          keyselected="coupon"
          createCoupon={() => setIsOpen(true)}
          // columns={columns}
          // isLoading={isLoadingProducts}
          // data={dataTable}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       setRowSelected(record._id);
          //     },
          //   };
          // }}
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
