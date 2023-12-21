import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/order`,
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

export const getOrderByUserId = async (access_token) => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailsOrder = async (id, access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/order/${id}`,
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

export const cancelOrder = async (id, access_token) => {
  try {
    const res = await axiosJWT.patch(
      `${process.env.REACT_APP_API_URL}/order/${id}/cancel`,
      {},
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

export const getAllOrder = async (access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/order/all-order`,
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
export const updateStatusOrder = async (id, status, access_token) => {
  try {
    const res = await axiosJWT.patch(
      `${process.env.REACT_APP_API_URL}/order/${id}/status`,
      status,
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
