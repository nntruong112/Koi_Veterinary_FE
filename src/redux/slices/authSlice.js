import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  login,
  loginGoogle,
  resetPassword,
} from "../../services/authService";
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
      state.data = null;
      state.error = null;
    },

    // //
    // setForgotPasswordClicked(state, action) {
    //   state.data = { ...state.data, isForgotPasswordClicked: action.payload };
    // },
  },

  extraReducers: (builder) => {
    // login with username and password
    builder
      .addCase(login.pending, (state) => {
        state.status = status.PENDING;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    // login google
    builder
      .addCase(loginGoogle.pending, (state) => {
        state.status = status.PENDING;
      })

      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })

      .addCase(loginGoogle.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    // forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.status = status.PENDING;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    // reset password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.status = status.PENDING;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
