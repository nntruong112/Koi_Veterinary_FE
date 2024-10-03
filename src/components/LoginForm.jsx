import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../services/authService.js";

const LoginForm = () => {
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

        if (originalPromiseResult) {
          //Hien thi thong bao
          alert("Login successfully");

          //Chuyen huong ve trang login
          navigate("/");
        }
      } catch (error) {
        const responseError = error?.response?.data?.error;
        alert("Login failed: " + responseError);
      }
    }
  };

  return (
    <div className="flex justify-center items-center rounded-lg my-32 bg-white max-w-[50vw] min-h-[70vh]">
      <div className="bg-[url('./src/assets/LoginLogo.png')] bg-contain bg-center min-h-[70vh] w-[50vw]">
        <div className="flex flex-row ">
          {/* --------------- LEFT SIDE ---------------- */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-6 bg-white px-8 w-1/2 min-h-[70vh] rounded-lg"
          >
            <div className=" flex flex-col items-center justify-center gap-3 pt-8">
              <b className="text-4xl font-bold">Login</b>
              <span className="font-normal text-gray-500">
                Please login to book appointment.
              </span>
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
                <p className="text-red-500 text-sm ml-2 mt-2">
                  {usernameError}
                </p>
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
                <p className="text-red-500 text-sm ml-2 mt-2">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-center">
              {/* -------- REMEMBER CHECKBOX --------- */}
              <label className="flex items-center justify-center text-center text-sm">
                <input
                  type="checkbox"
                  className="mr-1 mt-1 bg-[#eee] text-sm"
                />
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
            <div className="rounded-full px-8 py-3 mx-20 mt-5 md:block font-medium text-center text-white w-[50%] bg-primary">
              <button type="submit">Login</button>
            </div>

            <span className="text-center text-sm">
              <hr />
              or use another account
              <hr />
            </span>

            <div className="flex justify-center items-center gap-8">
              <FaFacebook className="text-blue-700 text-[30px] cursor-pointer" />
              <FcGoogle className="text-[33px] cursor-pointer" />
            </div>
          </form>

          {/* --------------- RIGHT SIDE ---------------- */}
          <form className="flex flex-col justify-center items-center gap-5 px-8 w-1/2 min-h-[70vh] bg-gradient-to-b from-gray-300/40 to-gray-600/40">
            <b className="text-4xl font-bold text-black">
              Start your <br />
              journey now
            </b>
            <p className="font-normal text-black">
              If you don't have an account yet, join us and start your journey.
            </p>
            <div className="border border-solid rounded-full px-8 py-3 mx-24 md:block font-medium text-center text-white w-[50%] bg-primary">
              <button
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
