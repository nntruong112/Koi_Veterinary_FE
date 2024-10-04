import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../services/authService";
import { useDispatch } from "react-redux";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { validateEmail } from "../utils/validateData";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const toggleShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "name":
        if (!value) {
          setNameError("Name must be not blank");
          invalid = false;
        } else {
          setNameError("");
        }
        break;

      case "email":
        if (!value) {
          setEmailError("Email must be not blank");
          invalid = false;
        } else {
          if (!validateEmail(value)) {
            setEmailError("Email is incorrect format");
            invalid = false;
          } else {
            setEmailError("");
          }
        }
        break;

      case "username":
        if (!value) {
          setUsernameError("Username must be not blank");
          invalid = false;
        } else {
          if (value.length < 5) {
            setUsernameError("Password must be at least 5 characters");
            invalid = false;
          } else {
            setUsernameError("");
          }
        }
        break;

      case "password":
        if (!value) {
          setPasswordError("Password must be not blank");
          invalid = false;
        } else {
          if (value.length < 7) {
            setPasswordError("Password must be at least 7 characters");
            invalid = false;
          } else {
            setPasswordError("");
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          setConfirmPasswordError("Confirm password must be not blank");
          invalid = false;
        } else {
          if (value !== user.password) {
            setConfirmPasswordError("Password is incorrect");
            invalid = false;
          } else {
            setConfirmPasswordError("");
          }
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const nameValid = validateData("name", user.name);
    const emailValid = validateData("email", user.email);
    const usernameValid = validateData("username", user.username);
    const passwordValid = validateData("password", user.password);
    const confirmPasswordValid = validateData(
      "confirmPassword",
      user.confirmPassword
    );

    if (
      nameValid &&
      emailValid &&
      usernameValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      try {
        //Submit form
        const response = await register(user);

        console.log("Response: ", response);
      } catch (error) {
        const responseError = error?.response?.data;
        alert(responseError);
      }
    }
  };

  // Login by Google
  const loginByGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className="flex justify-center items-center rounded-lg my-20 bg-white max-w-[50vw] min-h-[70vh]">
      <div className="bg-[url('./src/assets/LoginLogo.png')] bg-contain bg-center min-h-[70vh] w-[50vw]">
        <div className="flex flex-row ">
          {/* --------------- LEFT SIDE ---------------- */}
          <form className="flex flex-col justify-center items-center gap-8 px-8 w-1/2 min-h-[70vh] bg-gradient-to-b from-gray-300/40 to-gray-600/40">
            <b className="text-4xl font-bold text-white">
              Hello
              <br />
              friends
            </b>
            <p className="font-normal text-white text-center">
              If you have an account, login here and have fun.
            </p>
            <div className="border border-solid rounded-full px-8 py-3 mx-24 md:block font-medium text-center w-[50%]">
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          </form>

          {/* --------------- RIGHT SIDE ---------------- */}
          {/* {message ? <Message message={message} /> : null} */}
          <form
            className="flex flex-col gap-6 bg-white px-8 py-4 w-1/2 min-h-[70vh] rounded-lg"
            onSubmit={handleRegister}
          >
            <div className=" flex flex-col items-center justify-center gap-3 pt-8">
              <b className="text-4xl font-bold">Login</b>
              <span className="font-normal text-gray-500">
                Please register to book appointment.
              </span>
            </div>

            {/* --------- Full name --------- */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                  nameError ? "border-red-500" : "border-none"
                } focus:border-red-500 `}
                // onChange={(e) => setName(e.target.value)}
                onChange={handleChange}
              />

              {nameError && (
                <p className="text-red-500 text-sm ml-2 mt-2">{nameError}</p>
              )}
            </div>

            {/* --------- Email --------- */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                  emailError ? "border-red-500" : "border-none"
                } focus:border-red-500 `}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleChange}
              />

              {emailError && (
                <p className="text-red-500 text-sm ml-2 mt-2">{emailError}</p>
              )}
            </div>

            {/* --------- Username --------- */}
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                  usernameError ? "border-red-500" : "border-none"
                } focus:border-red-500 `}
                // onChange={(e) => setUsername(e.target.value)}
                onChange={handleChange}
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
                  placeholder="Password"
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={handleChange}
                  className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                    confirmPasswordError ? "border-red-500" : "border-none"
                  } focus:border-red-500`}
                />

                <span
                  onClick={toggleShowPass}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
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

            {/* --------- Confirm Password -------- */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                    nameError ? "border-red-500" : "border-none"
                  } focus:border-red-500`}
                />

                <span
                  onClick={toggleShowConfirmPass}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {confirmPasswordError && (
                <p className="text-red-500 text-sm ml-2 mt-2">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {/* ------- BUTTON LOGIN --------- */}

            <button
              type="submit"
              className="bg-green-500 rounded-full px-8 py-3 mx-20 mt-5 md:block font-light text-center w-[50%] text-white"
            >
              Register
            </button>

            <span className="text-center text-sm">
              <hr className="" />
              or use another account
              <hr />
            </span>

            <div className="flex justify-center items-center gap-8">
              <FaFacebook className="text-blue-700 text-[30px] cursor-pointer" />
              <FcGoogle
                onClick={() => loginByGoogle()}
                className="text-[33px] cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
