import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (data) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/filter`,
      { params: data }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data, access_token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailsProduct = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, access_token, data) => {
  try {
    const res = await axiosJWT.patch(
      `${process.env.REACT_APP_API_URL}/product/${id}`,
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

export const deleteProduct = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/product/${id}`,
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

export const getAllTypesProduct = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/type`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCaliberProduct = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/caliber`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchProduct = async (term) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/search?name=${term}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrands = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const uploadFile = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/file`,
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
