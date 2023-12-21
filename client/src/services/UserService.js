import { message } from "antd";
import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/sign-in`,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    message.error(error.response.data.message)
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/sign-up`,
      data
    );
    return res.data;
  } catch (error) {
    message.error(error.response.data.message)
  }
};

export const getDetailsUser = async (accessToken) => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/refresh-token`,
      {
        withCredentials: true,
        refreshToken,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/user/list`,
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
export const updateUser = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.patch(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
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
export const deleteUser = async (id, access_token, data) => {
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
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
