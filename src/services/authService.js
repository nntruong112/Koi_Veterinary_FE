import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

/**
 *
 * @param {*} user
 * @returns
 */
export const register = async (user) => {
  const response = await BASE_URL.post("users/register", user);

  return response;
};

/**
 *
 * @param {*} user
 * @returns
 */
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await BASE_URL.post("auth/login", user);
    return response.data.result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

/**
 *
 * @param {*} accessToken
 * @returns
 */
export const loginGoogle = createAsyncThunk(
  "googles/login-google",
  async (accessToken, thunkAPI) => {
    try {
      // Gói accessToken vào trong đối tượng để gửi đến API
      const response = await BASE_URL.post("googles/login-google", {
        accessToken,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * Verify email by 6-digit code
 * @param {Object} verification - Đối tượng chứa email và mã code
 * @param {String} verification.email - Địa chỉ email của user
 * @param {String} verification.code - Mã xác minh 6 chữ số
 * @returns
 */
export const verifyEmail = createAsyncThunk(
  "users/verify",
  async (verification, thunkAPI) => {
    try {
      const response = await BASE_URL.post("/users/verify", verification);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
