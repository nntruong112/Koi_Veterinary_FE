import React from "react";
import RegisterForm from "../../components/RegisterForm";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="bg-center bg-cover bg-[url('./src/assets/BgLogin.jpg')] min-h-svh">
        <div className="flex justify-center">
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
