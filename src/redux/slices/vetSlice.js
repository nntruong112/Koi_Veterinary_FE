import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../utils/status";
import { getScheduleByVetId } from "../../services/vetService";

const vetSlice = createSlice({
  name: "vet",
  initialState: {
    status: status.IDLE,
    data: null,
    error: null,
  },

  reducers: {},

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
  },
});

export default vetSlice.reducer;
