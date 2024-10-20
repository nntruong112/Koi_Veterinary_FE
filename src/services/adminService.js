import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

export const getUserByRole = createAsyncThunk(
  "users/role/user",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get(`users/role/USER`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const createVetAccount = createAsyncThunk(
  "users/create/vet",
  async (user, thunkAPI) => {
    try {
      const response = await BASE_URL.post("users/create/vet", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getAllAppointment = createAsyncThunk(
  "appointments/getAllAppointment",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("appointments");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getAllAppointmentType = createAsyncThunk(
  "appointment_types/getAllAppointmentType",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("appointment_types");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const confirmAppointment = createAsyncThunk(
  "appointments/confirm",
  async ({ appointmentId, updateData }, thunkAPI) => {
    try {
      const response = await BASE_URL.put(
        `appointments/${appointmentId}`,
        updateData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
