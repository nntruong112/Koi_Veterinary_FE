import axios from "axios";
import { persistor, store } from "../redux/store/store";

const BASE_URL = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupInterceptor = () => {
  // thêm hàm xử lý cho tất cả request HTTP trước khi gửi
  BASE_URL.interceptors.request.use(
    (config) => {
      // Lấy trạng thái hiện tại
      const state = store.getState();
      const token = state.auth.data?.token; // lấy token

      if (
        token &&
        ![
          "/auth/login",
          "/users/register",
          "googles/login-google",
          "users/forgot-password",
          "users/reset-password",
        ].includes(config.url)
      ) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default BASE_URL;
