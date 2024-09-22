import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center rounded-lg mt-48 bg-white max-w-[50vw] max-h-[50vh] ">
      <div className="bg-[url('./src/assets/LogoLogin.png')] h-[50vh] w-[25vw] p-5">
        <form className="flex flex-col gap-2">
          <div className=" flex flex-col items-center justify-center">
            <b>Login</b>
            <span>Please login to book appointment.</span>
          </div>

          {/* --------- Email --------- */}
          <label>Email</label>
          <input type="email" name="Email" required className="" />

          {/* --------- Password -------- */}
          <label>Password</label>
          <input type="password" name="Password" required />

          <div>
            <Button text="Login" textColor="white" onClick={navigate()} />
          </div>

          <span>or use another account</span>
          <div></div>
        </form>
      </div>

      <div className="h-[50vh] w-[25vw] ">
        <h1>Register</h1>
      </div>
    </div>
  );
};

export default LoginForm;
