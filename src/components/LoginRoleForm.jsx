import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../services/authService.js";
import { path } from "../utils/constant.js";
import SuccessModal from "./Private/modal/SuccessModal.jsx";
import { getInfoByToken } from "../services/userService.js";
import { toast } from "react-toastify";
import { logout } from "../redux/slices/authSlice.js";
import { clearUser } from "../redux/slices/userSlice.js";

const LoginRoleForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State cho modal

  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "username":
        if (!value) {
          setUsernameError("Username must be not blank");
          invalid = false;
        } else {
          setUsernameError("");
        }
        break;

      case "password":
        if (!value) {
          setPasswordError("Password must be not blank");
          invalid = false;
        } else {
          setPasswordError("");
        }
        break;

      default:
        break;
    }

    return invalid;
  };

  //lay gia tri trong tung o input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const usernameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);

    if (usernameValid && passwordValid) {
      try {
        //Submit form
        const resultAction = await dispatch(login(user));

        const originalPromiseResult = unwrapResult(resultAction);

        if (originalPromiseResult.token) {
          const userInfoAction = await dispatch(getInfoByToken()); // Gọi thunk để lấy thông tin người dùng

          const userInfo = unwrapResult(userInfoAction); // Đợi kết quả và unwrap

          const roles = userInfo.result.roles;

          if (roles && roles.includes("ADMIN")) {
            // Hiện thị modal thành công
            setShowSuccessModal(true);

            // Chuyển hướng sau 2 giây
            setTimeout(() => {
              navigate(path.ADMIN);
            }, 1000);
          } else {
            dispatch(logout());
            dispatch(clearUser());
            toast.error("You don't have permission to access!");
          }
        }
      } catch (error) {
        toast.error("Access denied!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center rounded-lg bg-white max-w-[35vw] min-h-[70vh] relative overflow-hidden">
      <div className="min-h-[20vh] w-[35vw] bg-white relative">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6 px-8 w-full h-full rounded-lg"
        >
          <div className=" flex flex-col items-center justify-center gap-3 pt-8">
            <b className="text-4xl font-bold">Login</b>
          </div>

          {/* --------- Username --------- */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                usernameError ? "border-red-500" : "border-none"
              } focus:border-red-500 `}
            />

            {usernameError && (
              <p className="text-red-500 text-sm ml-2 mt-2">{usernameError}</p>
            )}
          </div>

          {/* --------- Password -------- */}
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                  passwordError ? "border-red-500" : "border-none"
                } focus:border-red-500 `}
              />

              <span
                onClick={toggleShowPass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                aria-label="Show password"
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm ml-2 mt-2">{passwordError}</p>
            )}
          </div>

          <div className="flex justify-between items-center text-center">
            {/* -------- REMEMBER CHECKBOX --------- */}
            <label className="flex items-center justify-center text-center text-sm">
              <input type="checkbox" className="mr-1 mt-1 bg-[#eee] text-sm" />
              Remember me
            </label>

            {/* -------- Forgot pass --------- */}
            <button
              type="button"
              className="text-center inline text-sm hover:text-blue-600"
            >
              Forgot password?
            </button>
          </div>

          {/* ------- BUTTON LOGIN --------- */}
          <div className="rounded-full px-8 py-3  md:block font-medium text-center text-white w-full bg-primary">
            <button type="submit">Login</button>
          </div>

          <div className="flex flex-row justify-center items-center text-center text-sm">
            <p>or</p>
          </div>

          <div
            onClick={() => navigate(path.LOGIN)}
            className="flex justify-center items-center gap-8 border-2 p-1 mb-4 rounded-2xl hover:bg-gray-200 cursor-pointer"
          >
            <FaUser className="text-[30px] text-primary" />
            <p>Login for User</p>
          </div>
        </form>
      </div>
      {/* Hiển thị modal khi đăng nhập thành công */}
      {showSuccessModal && (
        <SuccessModal
          message="Login successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default LoginRoleForm;
