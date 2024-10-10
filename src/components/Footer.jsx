import React from "react";
import { assets } from "../assets/assets";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-cyan-100 via-purple-300 to-cyan-300">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-0 text-sm md:mx-10">
        {/* ------- Left Section -------- */}
        <div className="mt-5">
          <img className="mb-8 w-28" src={assets.Logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Our team would like to thank all 5th semester students for their
            support during the project implementation process. In addition, we
            would like to thank Ms. Huong for accompanying us.
          </p>
        </div>

        {/* ------- Center Section -------- */}
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li onClick={() => navigate("/")}> Home</li>
            <li onClick={() => navigate("/about")}>About us</li>
            <li onClick={() => navigate("/contact")}>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------- Right Section -------- */}
        <div className="mt-10">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>0359177611</li>
            <li>KoiHealthService@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* ---------- Copyright text --------- */}
      <div className="flex justify-around justify-items-center border-t-2 border-t-black">
        <p className="py-5 text-sm text-center">
          &copy; {new Date().getFullYear()} Koi Heath Services|Privacy Policy &
          Terms of Use
        </p>
        <div className="flex justify-between justify-items-end m-3 gap-3">
          <span className="m-2">Follow us:</span>
          <AiFillFacebook size="2rem" color="#0000FF" />
          <AiFillInstagram size="2.1rem" color="#EE3A8C" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
