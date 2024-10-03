import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

export const getInfoByToken = createAsyncThunk(
  "users/myInfo",
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
