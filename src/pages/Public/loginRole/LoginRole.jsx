import React from "react";
import Footer from "../../../components/Footer";
import LoginRoleForm from "../../../components/LoginRoleForm";
import { assets } from "../../../assets/assets";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";

const LoginRole = () => {
  return (
    <>
      <AdminNavbar />
      <div className="relative w-full min-h-screen flex justify-center items-center">
        <img
          src={assets.GifLogin}
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
