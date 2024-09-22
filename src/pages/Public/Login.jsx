import React from "react";
import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="bg-center bg-cover bg-[url('./src/assets/BgLogin.jpg')] min-h-svh">
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
