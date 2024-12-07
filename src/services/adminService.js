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

export const createStaffAccount = createAsyncThunk(
  "users/create/staff",
  async (user, thunkAPI) => {
    try {
      const response = await BASE_URL.post("users/create/staff", user);
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

export const getAllSchedule = createAsyncThunk(
  "veterinarian_schedules/getAllSchedule",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("veterinarian_schedules");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const countByRole = createAsyncThunk(
  "users/countByRole",
  async (role, thunkAPI) => {
    try {
      const response = await BASE_URL.get("users/countByRole", {
        params: { role },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const totalIncome = createAsyncThunk(
  "appointments/total-income",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("appointments/total-income");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const countService = createAsyncThunk(
  "appointments/count",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("appointments/count");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const countAppointmentType = createAsyncThunk(
  "appointments/countAppointmentType",
  async (appointmentTypeId, thunkAPI) => {
    try {
      const response = await BASE_URL.get(
        `appointments/count/${appointmentTypeId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const createSpecialty = createAsyncThunk(
  "fish_specialties/create",
  async (specialtyData, thunkAPI) => {
    try {
      const response = await BASE_URL.post(
        "fish_specialties/create",
        specialtyData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getIncomeByMonth = createAsyncThunk(
  "payments/getIncomeByMonth",
  async (month, thunkAPI) => {
    try {
      const response = await BASE_URL.get(`payments/amount-in-month/${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const addSlotForVet = createAsyncThunk(
  "veterinarian_schedules/addSlotForVet",
  async (data, thunkAPI) => {
    try {
      const response = await BASE_URL.post("veterinarian_schedules/link", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
