import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const toggleShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  return (
    <div className="flex justify-center items-center rounded-lg my-20 bg-white max-w-[50vw] max-h-[75vh]">
      <div className="bg-[url('./src/assets/LoginLogo.png')] bg-contain bg-center h-[75vh] w-[50vw]">
        <div className="flex flex-row ">
          {/* --------------- RIGHT SIDE ---------------- */}
          <form className="flex flex-col justify-center items-center gap-8 px-8 w-1/2 h-[75vh] bg-gradient-to-b from-gray-300/40 to-gray-600/40">
            <b className="text-4xl font-bold text-white">
              Hello
              <br />
              friends
            </b>
            <p className="font-normal text-white text-center">
              If you have an account, login here and have fun.
            </p>
            <div className="border border-solid rounded-full px-8 py-3 mx-24 md:block font-medium text-center w-[50%]">
              <Button
                text="Login"
                textColor="white"
                onClick={() => {
                  navigate("/Login");
                }}
              />
            </div>
          </form>

          {/* --------------- RIGHT SIDE ---------------- */}
          <form className="flex flex-col gap-6 bg-white px-8 w-1/2 h-[75vh] rounded-lg">
            <div className=" flex flex-col items-center justify-center gap-3 pt-8">
              <b className="text-4xl font-bold">Login</b>
              <span className="font-normal text-gray-500">
                Please login to book appointment.
              </span>
            </div>

            {/* --------- Full name --------- */}
            <input
              type="text"
              name="FullName"
              placeholder="Full Name"
              required
              className="bg-[#eee] rounded-xl px-5 py-2"
            />

            {/* --------- Username --------- */}
            <input
              type="text"
              name="Username"
              placeholder="Username"
              required
              className="bg-[#eee] rounded-xl px-5 py-2"
            />

            {/* --------- Password -------- */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="bg-[#eee] rounded-xl px-5 py-2 w-full"
              />

              <span
                onClick={toggleShowPass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* --------- Confirm Password -------- */}
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="Re-Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm Password"
                required
                className="bg-[#eee] rounded-xl px-5 py-2 w-full"
              />

              <span
                onClick={toggleShowConfirmPass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* ------- BUTTON LOGIN --------- */}
            <div className="bg-green-500 rounded-full px-8 py-3 mx-20 mt-5 md:block font-light text-center w-[50%]">
              <Button text="Register" textColor="white" />
            </div>

            <span className="text-center text-sm">or use another account</span>

            <div className="flex justify-center items-center gap-8">
              <FaFacebook className="text-blue-700 text-[30px] cursor-pointer" />
              <FcGoogle className="text-[33px] cursor-pointer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
