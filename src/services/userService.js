import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

export const getInfoByToken = createAsyncThunk(
  "users/getInfoByToken",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("users/myInfo");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateInfoById = createAsyncThunk(
  "users/updateInfoById",
  async ({ userId, updateData }, thunkAPI) => {
    try {
      const response = await BASE_URL.put(`users/${userId}`, updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewFish = createAsyncThunk(
  "fishes/create",
  async (fishData, thunkAPI) => {
    try {
      const response = await BASE_URL.post("fishes/create", fishData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMyFish = createAsyncThunk(
  "fishes/myFish",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("fishes/myFish");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
