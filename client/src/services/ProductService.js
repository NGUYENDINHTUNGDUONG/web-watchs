import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/filter`,
    { params: data }
  );
  return res.data;
};
export const getAllSupplier = async () => {
  const access_token = localStorage.getItem("access_token");
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/supplier`, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
  }
};

export const createProduct = async (data, access_token) => {
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
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`);
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
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
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/${id}`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllTypesProduct = async () => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/product/type`
  );
  return res.data;
};
export const getAllCaliberProduct = async () => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/product/caliber`
  );
  return res.data;
};

export const getAllBrandsProduct = async (data, access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/supplier`, {
    params: data,
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const getAllBrands = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/brand`);
  return res.data;
};
export const uploadFile = async (data, access_token) => {
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
};
