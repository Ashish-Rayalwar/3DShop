import axios from "axios";
// import Cookies from "js-cookie";

// let token = Cookies.get("newToken");
// export const userApi = axios.create({
//   baseURL: "https://polite-boundless-jelly.glitch.me/api/accounts",
// });

// export const orderApi = axios.create({
//   baseURL: "https://polite-boundless-jelly.glitch.me/order",
// });

// export const fileApi = axios.create({
//   baseURL: "https://polite-boundless-jelly.glitch.me/api",
// });

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${localStorage.getItem("auth-token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// fileApi.interceptors.request.use(
//   (config) => {
//     config.headers["Authorization"] = `${localStorage.getItem("auth-token")}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// https://polite-boundless-jelly.glitch.me/
