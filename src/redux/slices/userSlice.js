import { createSlice } from "@reduxjs/toolkit";
import {
  addNewFish,
  createFeedback,
  deleteMyFish,
  getAllFeedback,
  getAppointmentByUserId,
  getAppointmentType,
  getInfoByToken,
  getMyFish,
  getVetByRole,
  updateFishInfo,
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

    setFishUpdateData: (state, action) => {
      state.data = { ...state.data, fishUpdateData: action.payload };
    },

    clearFishUpdateData: (state) => {
      state.data.fishUpdateData = null;
    },

    setSelectedAppointment: (state, action) => {
      state.data = { ...state.data, selectedAppointment: action.payload };
    },

    clearSelectedAppointment: (state) => {
      state.data.selectedAppointment = null;
    },

    // set user data from auth slice
    setUserData: (state, action) => {
      state.data = { ...state.data, result: action.payload };
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
      // add new fish
      .addCase(addNewFish.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(addNewFish.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, fish: action.payload };
      })
      .addCase(addNewFish.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // update user fish
      .addCase(updateFishInfo.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(updateFishInfo.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        // Cập nhật myFish với dữ liệu mới
        state.data.myFish = state.data.myFish.map((fish) =>
          fish.fishId === action.payload.fishId ? action.payload : fish
        );
      })
      .addCase(updateFishInfo.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get my fish
      .addCase(getMyFish.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getMyFish.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, myFish: action.payload };
      })
      .addCase(getMyFish.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // delete my fish
      .addCase(deleteMyFish.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(deleteMyFish.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data.myFish = state.data.myFish.filter(
          (fish) => fish.fishId !== action.payload
        );
      })
      .addCase(deleteMyFish.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get vet info
      .addCase(getVetByRole.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getVetByRole.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, vets: action.payload };
      })
      .addCase(getVetByRole.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get my appointment
      .addCase(getAppointmentByUserId.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getAppointmentByUserId.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, myAppointment: action.payload };
      })
      .addCase(getAppointmentByUserId.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get appointment type
      .addCase(getAppointmentType.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getAppointmentType.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, appointmentType: action.payload };
      })
      .addCase(getAppointmentType.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // create feedback
      .addCase(createFeedback.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, feedback: action.payload };
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      // get all feedback
      .addCase(getAllFeedback.pending, (state) => {
        state.status = status.PENDING;
        state.error = null;
      })
      .addCase(getAllFeedback.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = { ...state.data, allFeedback: action.payload };
      })
      .addCase(getAllFeedback.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export const {
  clearUser,
  setFishUpdateData,
  clearFishUpdateData,
  setSelectedAppointment,
  clearSelectedAppointment,
  setUserData,
} = userSlice.actions;

export default userSlice.reducer;
