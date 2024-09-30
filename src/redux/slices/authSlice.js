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
    // // LOGIN
    // loginStart: (state) => {
    //   state.login.isFetching = true;
    // },
    // loginSuccess: (state, action) => {
    //   state.login.isFetching = false;
    //   state.login.currentUser = action.payload;
    //   state.login.error = false;
    // },
    // loginFailed: (state) => {
    //   state.login.isFetching = false;
    //   state.login.error = true;
    // },
    // // REGISTER
    // registerStart: (state) => {
    //   state.register.isFetching = true;
    // },
    // registerSuccess: (state) => {
    //   state.register.isFetching = false;
    //   state.register.error = false;
    //   state.register.success = true;
    // },
    // registerFailed: (state) => {
    //   state.register.isFetching = false;
    //   state.register.error = true;
    //   state.register.success = false;
    // },
    //LOGOUT
    logout: (state) => {
      state.data = null;
    },
  },

  extraReducers: (builder) => {
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
  },
});

// export const {
//   loginStart,
//   loginFailed,
//   loginSuccess,
//   registerStart,
//   registerSuccess,
//   registerFailed,
// } = authSlice.actions;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
