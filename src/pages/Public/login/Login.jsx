import React from "react";
import LoginForm from "../../../components/LoginForm";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

const Login = () => {
  return (
    <>
      <RolesNavbar />
      <div className="relative w-full min-h-screen flex justify-center items-center">
        <img
          src={assets.GifLogin}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default Login;
