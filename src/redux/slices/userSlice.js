import { createSlice } from "@reduxjs/toolkit";
import {
  addNewFish,
  getInfoByToken,
  getMyFish,
  updateInfoById,
} from "../../services/userService";
import * as status from "../../utils/status";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: status.IDLE,
    data: null,
    error: null,
  },

  reducers: {
    clearUser: (state) => {
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // get user info
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

    builder
      // update user info
      .addCase(updateInfoById.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(updateInfoById.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = action.payload;
      })
      .addCase(updateInfoById.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // update user info
      .addCase(addNewFish.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(addNewFish.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, fish: action.payload }; // Thêm cá vào data
      })
      .addCase(addNewFish.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // update user info
      .addCase(getMyFish.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getMyFish.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, myFish: action.payload }; // Thay thế dữ liệu cá
      })
      .addCase(getMyFish.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { clearUser, updateData } = userSlice.actions;
export default userSlice.reducer;
