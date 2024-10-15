import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import bookingReducer from "../slices/bookingSlice";
import adminReducer from "../slices/adminSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import { setupInterceptor } from "../../api/axiosInstance";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  booking: bookingReducer,
  admin: adminReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// Thêm hành động để xóa Redux persist khi logout
export const clearPersistedStore = () => {
  persistor.purge();
};

// Gọi hàm mỗi khi có sự thay đổi trạng thái persistor
persistor.subscribe(() => {
  // bootstrapped để xác định dữ liệu đã khôi phục hoàn tất chưa, nếu true thì đã sẵn sàng để dùng
  if (persistor.getState().bootstrapped) {
    setupInterceptor(); // Thiết lập interceptor sau khi persistor đã hoàn tất
  }
});
