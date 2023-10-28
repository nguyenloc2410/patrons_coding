import axios from "axios";
import { functions } from "lodash";
const instance = axios.create({
  baseURL: "https://coding-patrons-server.onrender.com",
  withCredentials: true,
});

instance.defaults.withCredentials = true;
instance.defaults.headers = {
  Authorization: "Bearer " + localStorage.getItem("jwt"),
}; // instance.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// instance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("jwt")}`;
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // window.location.href = "/login";
    return error.response.data;
  }
);
export default instance;
