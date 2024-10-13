import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { GiCirclingFish } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { logout } from "../../../../redux/slices/authSlice";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearPersistedStore } from "../../../../redux/store/store";
import { path } from "../../../../utils/constant";
import { assets } from "../../../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.users?.data?.result);

  return (
    <div className="relative">
      <div className="flex items-center justify-around bg-gradient-to-r from-cyan-100 via-purple-300 to-cyan-300 text-xl py-4">
        <img
          onClick={() => navigate(path.HOME)}
          className="w-28 cursor-pointer"
          src={assets.Logo}
          alt="Logo"
        />
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to={path.HOME}>
            <li className="py-1">Home</li>
          </NavLink>
          <NavLink to={path.ABOUT}>
            <li className="py-1">About</li>
          </NavLink>
          <NavLink to={path.TESTIMONIALS}>
            <li className="py-1">Testimonials</li>
          </NavLink>
          <NavLink to={path.TEAM}>
            <li className="py-1">All Vet</li>
          </NavLink>
          <NavLink to={path.FEATURES}>
            <li className="py-1">Features</li>
          </NavLink>
          <NavLink to={path.PRICING}>
            <li className="py-1">Pricing</li>
          </NavLink>
          <NavLink to={path.CONTACT}>
            <li className="py-1">Contact</li>
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {userInfo ? (
            <button
              onClick={() => navigate(path.ADMIN)}
              className="flex items-center justify-center gap-4 p-2 cursor-pointer"
            >
              <img
                src={userInfo.image || assets.DefaultAvatar}
                className="w-10 h-10 rounded-full"
                alt="Admin Avatar"
              />
              <span>Admin Panel</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
