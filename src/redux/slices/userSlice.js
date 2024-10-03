import { createSlice } from "@reduxjs/toolkit";
import { getInfoByToken } from "../../services/userService";
import * as status from "../../utils/status";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: status.IDLE,
    data: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getInfoByToken.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getInfoByToken.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })
      .addCase(getInfoByToken.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
