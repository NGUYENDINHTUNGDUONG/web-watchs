import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllBrands = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const createBrand = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/brand`,
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
