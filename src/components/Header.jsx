import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-center bg-cover bg-[url('./src/assets/home.jpg')]">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 mx-11 md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Got a sick fish?
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <p>
            Our mobile veterinary service is here to help pet fish in Ho Chi
            Minh City.
          </p>
        </div>

        <a
          onClick={() => navigate("/booking")}
          className="flex items-center gap-3 bg-blue-400 px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img className="w-4" src={assets.ArrowIcon} alt="" />
        </a>
      </div>
    </section>
  );
};

export default Header;
