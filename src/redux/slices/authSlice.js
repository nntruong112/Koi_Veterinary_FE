import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/authService";
import * as status from "../../utils/status";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: status.IDLE,
    data: null,
    error: null,
  },

  reducers: {
    // LOGOUT
    logout: (state) => {
      state.status = status.IDLE;
      state.data = null; // Reset lại token khi logout
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = status.PENDING;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload; //Lưu token khi login thành công
      })

      .addCase(login.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
