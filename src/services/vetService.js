import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

export const getScheduleByVetId = createAsyncThunk(
  "veterinarian_schedules/getScheduleByVetId",
  async (veterinarianId, thunkAPI) => {
    try {
      const response = await BASE_URL.get(
        `veterinarian_schedules/schedules/${veterinarianId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getToDoAppointment = createAsyncThunk(
  "appointments/getToDoAppointment",
  async (veterinarianId, thunkAPI) => {
    try {
      const response = await BASE_URL.get(
        `appointments/belonged_to_vetId/${veterinarianId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
