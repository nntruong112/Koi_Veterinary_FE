import React, { useCallback } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import Button from "../components/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);

  return (
    <div className="flex items-center justify-around bg-primary text-xl py-4 border-b-2 border-b-black">
      <img className="w-44 cursor-pointer" src={assets.Logo} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={path.HOME}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.ABOUT}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.TESTIMONIALS}>
          <li className="py-1">Testimonials</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.WORK}>
          <li className="py-1">Work</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.TEAM}>
          <li className="py-1">Team</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.FEATURES}>
          <li className="py-1">Features</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.PRICING}>
          <li className="py-1">Pricing</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to={path.CONTACT}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="bg-[#3399FF] px-8 py-3 rounded-full font-light md:block">
        <Button onClick={goLogin} text={"Login"} textColor="white" />
      </div>
    </div>
  );
};

export default Navbar;
