import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/axiosInstance";
// import {
//   loginFailed,
//   loginStart,
//   loginSuccess,
//   registerFailed,
//   registerStart,
//   registerSuccess,
// } from "../redux/slices/authSlice";
// import {
//   getUsersFailed,
//   getUsersStart,
//   getUsersSuccess,
// } from "../redux/slices/userSlice";

/**
 *
 * @param {*} user
 * @returns
 */
export const register = async (user) => {
  const response = await BASE_URL.post("users/register", user);

  return response;
};

/**
 *
 * @param {*} user
 * @returns
 */
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await BASE_URL.post("/auth/token", user);
    return response.data.result; // Giả sử server trả về token trong 'result'
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// export const loginUser = (user, dispatch, navigate) => {
//   dispatch(loginStart());

//   try {
//     const response = BASE_URL.post("http://localhost:8080/auth/token", user);
//     dispatch(loginSuccess(response.data));
//     navigate("/");
//     return response;
//   } catch (error) {
//     dispatch(loginFailed());
//     console.error("Login error: ", error?.response?.data);
//   }
// };

// export const registerUser = (user, dispatch, navigate) => {
//   dispatch(registerStart());

//   try {
//     const response = BASE_URL.post("users/register", user);
//     dispatch(registerSuccess());
//     navigate("/login");
//     return response;
//   } catch (error) {
//     dispatch(registerFailed());
//   }
// };

// export const verifyToken = async (accessToken) => {
//   const response = await axios.get("http://localhost:8080/auth/token", {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   return response.data;
// };

// export const getAllUsers = async (accessToken, dispatch) => {
//   dispatch(getUsersStart());

//   try {
//     const response = await axios.get("http://localhost:8080/users/Get_user", {
//       headers: { token: `Bearer ${accessToken}` },
//     });
//     dispatch(getUsersSuccess(response.data));
//   } catch (error) {
//     dispatch(getUsersFailed());
//   }
// };
