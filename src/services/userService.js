import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

export const getInfoByToken = createAsyncThunk(
  "users/getInfoByToken",
  async (token, thunkAPI) => {
    try {
      const response = await BASE_URL.get("users/myInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateInfoById = createAsyncThunk(
  "users/updateInfoById",
  async ({ userId, updateData, token }, thunkAPI) => {
    try {
      const response = await BASE_URL.put(`users/${userId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
