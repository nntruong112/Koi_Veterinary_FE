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
    const response = await BASE_URL.post("/auth/login", user);
    return response.data.result;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
