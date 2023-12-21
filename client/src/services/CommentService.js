import { axiosJWT } from "./UserService";

export const createComment = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/comment/`,
      data,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {}
};

export const getComment = async (data) => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/comment/`, {
      params: data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
