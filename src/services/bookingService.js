import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";

export const bookingAppointment = createAsyncThunk(
  "appointments/create",
  async (appointmentData, thunkAPI) => {
    try {
      const response = await BASE_URL.post(
        "appointments/create",
        appointmentData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPayment = createAsyncThunk(
  "payments/create",
  async (paymentData, thunkAPI) => {
    try {
      const response = await BASE_URL.post(
        "payments/create-payment",
        paymentData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoices/create",
  async (invoiceData, thunkAPI) => {
    try {
      const response = await BASE_URL.post("invoices/create", invoiceData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllBookingSchedule = createAsyncThunk(
  "veterinarian_schedules/getAllBookingSchedule",
  async (_, thunkAPI) => {
    try {
      const response = await BASE_URL.get("veterinarian_schedules");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
