import axios from "axios";
import { axiosJWT } from "./UserService";

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
  try {
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
  } catch (error) {
    console.log(error);
  }
};
export const usedCoupon = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/coupon/used`,
      data,
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
