import axios from "axios";
import store from "./store/store";
const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
    // Add other headers here if needed
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token = store.state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle error responses
//     if (error.response.status === 401) {
//       // Redirect to login page if unauthorized
//       window.location = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
