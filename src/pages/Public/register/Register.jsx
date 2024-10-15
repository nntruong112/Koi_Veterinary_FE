import React from "react";
import RegisterForm from "../../../components/RegisterForm";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

const Register = () => {
  return (
    <>
      <RolesNavbar />
      <div className="relative w-full min-h-screen flex justify-center items-center">
        <img
          src={assets.GifLogin}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
};

export default Register;
