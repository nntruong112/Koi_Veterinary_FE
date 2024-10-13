import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { path } from "../utils/constant";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.users.data?.result?.roles);

  const bookClick = () => {
    if (role && role === "USER") {
      navigate(path.BOOKING);
    } else {
      navigate(path.LOGIN);
      toast.warn("Please login to book appointment with us!");
    }
  };

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src={assets.GifLogin}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 mx-11 md:py-[10vw] md:mb-[-30px] relative z-10">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight ">
          Got a sick fish?
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <p>
            Our mobile veterinary service is here to help pet fish in Ho Chi
            Minh City.
          </p>
        </div>

        <a
          onClick={bookClick}
          className="flex items-center gap-3 bg-primary px-8 py-3 rounded-full text-white text-sm m-auto md:m-0 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Book Appointment
          <FaArrowRightLong className="w-4 mt-0.5" />
        </a>
      </div>
    </section>
  );
};

export default Header;
