import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//   return res.data
// // }
// http://localhost:3001/api/order/get-order-details/639724669c6dda4fa11edcde
export const createOrder = async (data,access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order`, data, {
      headers: {
          authorization: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getOrderByUserId = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order`, {
      headers: {
          authorization: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getDetailsOrder = async (id,access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/${id}`, {
      headers: {
          authorization: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const cancelOrder = async (id, access_token ) => {
  const res = await axiosJWT.patch(`${process.env.REACT_APP_API_URL}/order/${id}/cancel`,{}, {
      headers: {
          authorization: `Bearer ${access_token}`,
      }
  })
  return res.data
}

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/all-order`, {
      headers: {
          authorization: `Bearer ${access_token}`,
      }
  })
  return res.data
}
