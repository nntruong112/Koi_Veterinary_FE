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

export const getAllUsers = createAsyncThunk(
  "users/get-user",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("users/get-user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getVetByRole = createAsyncThunk(
  "users/role/vet",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get(`users/role/VET`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const updateInfoById = createAsyncThunk(
  "users/updateInfoById",
  async (updateData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.users.data?.result?.userId;

      // Kiểm tra nếu userId là undefined
      if (!userId) {
        return thunkAPI.rejectWithValue("User ID is undefined");
      }

      const response = await BASE_URL.put(`users/${userId}`, updateData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
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
      const state = thunkAPI.getState();
      const userId = state.users.data?.result?.userId;

      if (!userId) {
        throw new Error("User id is undefined");
      }

      const response = await BASE_URL.get(`fishes/own_by_users_id/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateFishInfo = createAsyncThunk(
  "fishes/updateFishInfo",
  async ({ fishId, updateData }, thunkAPI) => {
    try {
      const response = await BASE_URL.put(`fishes/${fishId}`, updateData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteMyFish = createAsyncThunk(
  "fishes/fishId",
  async (fishId, thunkAPI) => {
    try {
      await BASE_URL.delete(`fishes/${fishId}`);
      return fishId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentByUserId = createAsyncThunk(
  "appointments/getAppointmentByUserId",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.users.data?.result?.userId;

      if (!userId) {
        throw new Error("User id is undefined");
      }

      const response = await BASE_URL.get(
        `appointments/belonged_to_customerId/${userId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentType = createAsyncThunk(
  "appointment_types",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("appointment_types");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createFeedback = createAsyncThunk(
  "feedbacks/createFeedback",
  async (feedbackData, thunkAPI) => {
    try {
      const response = await BASE_URL.post("feedbacks/create", feedbackData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
