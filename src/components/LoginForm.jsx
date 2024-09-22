import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center rounded-lg mt-40 bg-white max-w-[50vw] max-h-[60vh]">
      <div className="bg-[url('./src/assets/LoginLogo.png')] bg-contain bg-center h-[60vh] w-[50vw]">
        <div className="flex flex-row">
          <form className="flex flex-col gap-4 bg-white px-8 w-1/2 h-[60vh] rounded-lg">
            <div className=" flex flex-col items-center justify-center gap-3 pt-8">
              <b className="text-4xl font-bold">Login</b>
              <span className="font-normal text-gray-500">
                Please login to book appointment.
              </span>
            </div>

            {/* --------- Email --------- */}
            <label className="mx-1">Username</label>
            <input
              type="text"
              name="Username"
              placeholder="Input your username"
              required
              className="bg-[#eee] rounded-xl px-5 py-2"
            />

            {/* --------- Password -------- */}
            <label className="mx-1">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Input your password"
              required
              className="bg-[#eee] rounded-xl px-5 py-2"
            />

            {/* -------- REMEMBER --------- */}
            <div></div>

            {/* ------- BUTTON LOGIN --------- */}
            <div className="bg-green-500 rounded-full px-8 py-3 mx-20 mt-5 md:block font-light text-center w-[50%]">
              <Button text="Login" textColor="white" />
            </div>

            <span className="text-center">or use another account</span>
            <div></div>
          </form>

          <form className="flex flex-col justify-center items-center gap-5 px-8 w-1/2 h-[60vh] bg-gradient-to-b from-gray-300/40 to-gray-600/40">
            <b className="text-4xl font-bold text-white">
              Start your <br />
              journey now
            </b>
            <p className="font-normal text-white">
              If you don't have an account yet, join us and start your journey.
            </p>
            <div className="border rounded-full px-8 py-3 mx-24 md:block font-light text-center w-[50%]">
              <Button text="Register" textColor="white" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
