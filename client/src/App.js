import React, { Fragment, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import * as UserService from "./services/UserService";
import { resetUser, updateUser } from "./redux/slides/userSlide";
// import Loading from "./components/LoadingComponent/LoadingComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      const { storageData, decoded } = handleDecoded();
      if (decoded?.id) {
        await handleGetDetailsUser(storageData);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData) {
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let refreshToken = localStorage.getItem("refresh_token");
      const decodedRefreshToken = jwt_decode(refreshToken);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["authorization"] = `Bearer ${data?.access_token}`;
          localStorage.setItem("access_token", `${data?.access_token}`);
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (access_token) => {
    const refreshToken = localStorage.getItem("refresh_token");
    const res = await UserService.getDetailsUser(access_token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token,
        refreshToken,
      })
    );
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route?.element;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
