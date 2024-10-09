import axios from "axios";
import { store } from "../redux/store/store";

const BASE_URL = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

// thêm token vào header Authorization
BASE_URL.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.data?.token; // lấy token từ Redux store

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default BASE_URL;
