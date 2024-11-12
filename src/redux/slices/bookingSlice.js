// import { createSlice } from "@reduxjs/toolkit";
// import * as status from "../../utils/status";
// import {
//   bookingAppointment,
//   createInvoice,
//   createPayment,
//   getAllBookingSchedule,
//   getSpeciality,
// } from "../../services/bookingService";

// const bookingSlice = createSlice({
//   name: "booking",
//   initialState: {
//     status: status.IDLE,
//     data: {
//       bookingData: {},
//       invoiceData: {},
//     },
//     currentStep: 0,
//     error: null,
//   },

//   reducers: {
//     updateBookingData: (state, action) => {
//       state.status = status.SUCCESSFULLY;
//       // Cập nhật các field mới vào booking data
//       state.data = {
//         ...state.data,
//         bookingData: {
//           ...state.data.bookingData,
//           ...action.payload,
//         },
//       };
//     },

//     resetBookingData: (state) => {
//       state.status = status.SUCCESSFULLY;
//       state.data = {
//         bookingData: {},
//         invoiceData: {},
//       };
//       state.currentStep = 0;
//     },

//     setCurrentStep: (state, action) => {
//       state.status = status.SUCCESSFULLY;
//       state.currentStep = action.payload;
//     },

//     updateInvoiceData: (state, action) => {
//       state.status = status.SUCCESSFULLY;
//       state.data = {
//         ...state.data,
//         invoiceData: {
//           ...state.data.invoiceData,
//           ...action.payload,
//         },
//       };
//     },

//     updateValidVets: (state, action) => {
//       state.status = status.SUCCESSFULLY;
//       state.data = {
//         ...state.data,
//         vetWorkingToday: action.payload,
//       };
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(bookingAppointment.pending, (state) => {
//         state.status = status.PENDING;
//       })
//       .addCase(bookingAppointment.fulfilled, (state, action) => {
//         state.status = status.SUCCESSFULLY;
//         state.data = action.payload;
//       })
//       .addCase(bookingAppointment.rejected, (state, action) => {
//         state.status = status.FAILED;
//         state.error = action.error.message;
//       });

//     builder
//       .addCase(createPayment.pending, (state) => {
//         state.status = status.PENDING;
//       })
//       .addCase(createPayment.fulfilled, (state, action) => {
//         state.status = status.SUCCESSFULLY;
//         state.data = { ...state.data, paymentData: action.payload };
//       })
//       .addCase(createPayment.rejected, (state, action) => {
//         state.status = status.FAILED;
//         state.error = action.error.message;
//       });

//     builder
//       .addCase(createInvoice.pending, (state) => {
//         state.status = status.PENDING;
//       })
//       .addCase(createInvoice.fulfilled, (state, action) => {
//         state.status = status.SUCCESSFULLY;
//         state.data = action.payload;
//       })
//       .addCase(createInvoice.rejected, (state, action) => {
//         state.status = status.FAILED;
//         state.error = action.error.message;
//       });

//     builder
//       // confirm appointment
//       .addCase(getAllBookingSchedule.pending, (state) => {
//         state.status = status.PENDING;
//       })
//       .addCase(getAllBookingSchedule.fulfilled, (state, action) => {
//         state.status = status.SUCCESSFULLY;

//         state.data = { ...state.data, bookingSchedule: action.payload };
//       })
//       .addCase(getAllBookingSchedule.rejected, (state, action) => {
//         state.status = status.FAILED;
//         state.error = action.error.message;
//       });

//     builder
//       // get all vet speciality
//       .addCase(getSpeciality.pending, (state) => {
//         state.status = status.PENDING;
//       })
//       .addCase(getSpeciality.fulfilled, (state, action) => {
//         state.status = status.SUCCESSFULLY;

//         state.data = { ...state.data, vetSpeciality: action.payload };
//       })
//       .addCase(getSpeciality.rejected, (state, action) => {
//         state.status = status.FAILED;
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
//   updateBookingData,
//   resetBookingData,
//   setCurrentStep,
//   updateInvoiceData,
//   updateValidVets,
// } = bookingSlice.actions;

// export default bookingSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../utils/status";
import {
  bookingAppointment,
  createInvoice,
  createPayment,
  getAllBookingSchedule,
  getSpeciality,
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
          ...action.payload, // Cập nhật thêm các trường mới
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
          ...action.payload, // Cập nhật thêm các trường mới cho invoiceData
        },
      };
    },

    updateValidVets: (state, action) => {
      state.status = status.SUCCESSFULLY;
      state.data = {
        ...state.data,
        vetWorkingToday: action.payload,
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
        state.data = {
          ...state.data,
          bookingData: action.payload, // Lưu bookingData mới
        };
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
        state.data = {
          ...state.data,
          paymentData: action.payload, // Lưu paymentData mới
        };
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
        state.data = {
          ...state.data,
          invoiceData: action.payload, // Lưu invoiceData mới
        };
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      .addCase(getAllBookingSchedule.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getAllBookingSchedule.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = {
          ...state.data,
          bookingSchedule: action.payload, // Lưu lịch hẹn
        };
      })
      .addCase(getAllBookingSchedule.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });

    builder
      .addCase(getSpeciality.pending, (state) => {
        state.status = status.PENDING;
      })
      .addCase(getSpeciality.fulfilled, (state, action) => {
        state.status = status.SUCCESSFULLY;
        state.data = {
          ...state.data,
          vetSpeciality: action.payload, // Lưu thông tin về chuyên khoa của bác sĩ
        };
      })
      .addCase(getSpeciality.rejected, (state, action) => {
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
  updateValidVets,
} = bookingSlice.actions;

export default bookingSlice.reducer;
