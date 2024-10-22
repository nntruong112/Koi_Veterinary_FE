import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../utils/status";
import {
  confirmAppointment,
  createVetAccount,
  getAllAppointment,
  getAllAppointmentType,
  getAllSchedule,
  getUserByRole,
} from "../../services/adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    status: status.IDLE,
    data: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // get vet info
      .addCase(getUserByRole.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getUserByRole.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, users: action.payload };
      })
      .addCase(getUserByRole.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // create vet account
      .addCase(createVetAccount.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(createVetAccount.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })
      .addCase(createVetAccount.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get all appointment type
      .addCase(getAllAppointmentType.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getAllAppointmentType.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, typeList: action.payload };
      })
      .addCase(getAllAppointmentType.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get all appointment
      .addCase(getAllAppointment.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getAllAppointment.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, appointmentList: action.payload };
      })
      .addCase(getAllAppointment.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // confirm appointment
      .addCase(confirmAppointment.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(confirmAppointment.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;

        state.data = { ...state.data, confirmAppointment: action.payload };
      })
      .addCase(confirmAppointment.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // confirm appointment
      .addCase(getAllSchedule.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getAllSchedule.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;

        state.data = { ...state.data, scheduleOfAll: action.payload };
      })
      .addCase(getAllSchedule.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
