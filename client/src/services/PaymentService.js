import { message } from "antd";
import axios from "axios";

export const getConfig = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/payment/config`
  );
  return res.data;
};
export const getAllCoupons = async (access_token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/coupon`,

      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const createCoupon = async (data, access_token) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/coupon`,
    data,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
