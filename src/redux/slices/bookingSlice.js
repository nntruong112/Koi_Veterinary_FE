import { createSlice } from "@reduxjs/toolkit";

import * as status from "../../utils/status";
import { bookingAppointment } from "../../services/userService";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    status: status.IDLE,
    data: {},
    currentStep: 0,
    error: null, // Thêm state cho lỗi
  },

  reducers: {
    updateBookingData: (state, action) => {
      state.status = status.SUCCESSFULLY;
      // Cập nhật các field mới vào `data`
      state.data = { ...state.data, ...action.payload };
    },

    resetBookingData: (state) => {
      state.status = status.SUCCESSFULLY;
      state.data = {};
      state.currentStep = 0; // Reset current step
    },

    setCurrentStep: (state, action) => {
      state.status = status.SUCCESSFULLY;
      state.currentStep = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(bookingAppointment.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(bookingAppointment.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })
      .addCase(bookingAppointment.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { updateBookingData, resetBookingData, setCurrentStep } =
  bookingSlice.actions;

export default bookingSlice.reducer;
