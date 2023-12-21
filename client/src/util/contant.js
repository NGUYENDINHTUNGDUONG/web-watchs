import {
  CarOutlined,
  FrownOutlined,
  HourglassOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export const orderContant = {
  delivery: {
    fast: "FAST",
    gojek: "GO_JEK",
  },
  payment: {
    later_money: "Thanh toán tiền mặt khi nhận hàng",
    paypal: "Thanh toán bằng paypal",
  },
};
export const mapStatus = {
  pending: "Đang chờ xử lý",
  cancel: "Đã hủy ",
  shipping: "Đang giao hàng",
  done: "Đã giao hàng",
};
export const mapColors = {
  pending: "bg-blue-400",
  cancel: "bg-red-400",
  shipping: "bg-yellow-400",
  done: "bg-green-400",
};  
export const mapIcons = {
  pending: <HourglassOutlined spin className="mr-3" />,
  cancel: <FrownOutlined className="mr-3" />,
  shipping: <CarOutlined className="mr-3" />,
  done: <SmileOutlined className="mr-3" />,
};
