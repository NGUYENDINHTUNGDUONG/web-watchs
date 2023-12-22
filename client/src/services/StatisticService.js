import { axiosJWT } from "./UserService";

export const getStatistic = async ( access_token) => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/statistic`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

