import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../utils/status";
import {
  bookingAppointment,
  createInvoice,
  createPayment,
} from "../../services/bookingService";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    status: status.IDLE,
    data: {
      bookingData: {},
      invoiceData: {},
    },
    currentStep: 0,
    error: null,
  },

  reducers: {
    updateBookingData: (state, action) => {
      state.status = status.SUCCESSFULLY;
      // Cập nhật các field mới vào booking data
      state.data = {
        ...state.data,
        bookingData: {
          ...state.data.bookingData,
          ...action.payload,
        },
      };
    },

    resetBookingData: (state) => {
      state.status = status.SUCCESSFULLY;
      state.data = {
        bookingData: {},
        invoiceData: {},
      };
      state.currentStep = 0;
    },

    setCurrentStep: (state, action) => {
      state.status = status.SUCCESSFULLY;
      state.currentStep = action.payload;
    },

    updateInvoiceData: (state, action) => {
      state.status = status.SUCCESSFULLY;
      state.data = {
        ...state.data,
        invoiceData: {
          ...state.data.invoiceData,
          ...action.payload,
        },
      };
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

    builder
      .addCase(createPayment.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, paymentData: action.payload };
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      .addCase(createInvoice.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const {
  updateBookingData,
  resetBookingData,
  setCurrentStep,
  updateInvoiceData,
} = bookingSlice.actions;

export default bookingSlice.reducer;
