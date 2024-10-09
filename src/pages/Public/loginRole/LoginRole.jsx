import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LoginRoleForm from "../../../components/LoginRoleForm";
import { assets } from "../../../assets/assets";

const LoginRole = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen flex justify-center items-center">
        <img
          src={assets.BackgroundLogin}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <LoginRoleForm />
      </div>
      <Footer />
    </>
  );
};

export default LoginRole;
