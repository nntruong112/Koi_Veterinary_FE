import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { getUsersFailed, getUsersSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());

  try {
    const response = await axios.post("http://localhost:8080/auth/token", user);
    dispatch(loginSuccess(response.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());

  try {
    await axios.post("http://localhost:8080/users/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getAllUsers());

  try {
    const response = await axios.get("http://localhost:8080/api/register", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};
