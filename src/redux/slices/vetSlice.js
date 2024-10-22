import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../utils/status";
import {
  getScheduleByVetId,
  getToDoAppointment,
} from "../../services/vetService";
import ToDoAppointment from "../../pages/Private/vet/toDoAppointment/ToDoAppointment";

const vetSlice = createSlice({
  name: "vet",
  initialState: {
    status: status.IDLE,
    data: { selectedAppointment: null },
    error: null,
  },

  reducers: {
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },

    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // get schedule by vet id
      .addCase(getScheduleByVetId.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getScheduleByVetId.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;

        state.data = action.payload;
      })
      .addCase(getScheduleByVetId.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get to do appointment
      .addCase(getToDoAppointment.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getToDoAppointment.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;

        state.data = { ...state.data, toDoAppointmentList: action.payload };
      })
      .addCase(getToDoAppointment.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedAppointment, clearSelectedAppointment } =
  vetSlice.actions;

export default vetSlice.reducer;
