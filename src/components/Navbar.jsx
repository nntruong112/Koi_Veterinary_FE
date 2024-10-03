import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { IoIosArrowDropdown } from "react-icons/io";
import { unwrapResult } from "@reduxjs/toolkit";
import { getInfoByToken } from "../services/userService";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data); // Lấy token khi login thành công từ Redux
  const token = authData?.token; // Kiểm tra nếu authData tồn tại và lấy token
  const userInfo = useSelector((state) => state.users.data.result); // Lấy thông tin người dùng từ Redux store

  useEffect(() => {
    if (token && !userInfo) {
      // Kiểm tra nếu có token và chưa có thông tin người dùng
      const fetchUserInfo = async () => {
        try {
          const userInfoAction = await dispatch(getInfoByToken(token)); // Gọi thunk để lấy thông tin người dùng
          unwrapResult(userInfoAction); // Đợi kết quả và unwrap
        } catch (error) {
          console.error("Failed to fetch user info: ", error);
        }
      };
      fetchUserInfo();
    }
  }, [token, userInfo, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-around bg-gradient-to-r from-white via-purple-300 to-cyan-300 text-xl py-4">
      <img
        onClick={() => navigate(path.HOME)}
        className="w-28 cursor-pointer"
        src={assets.Logo}
        alt=""
      />
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

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <p>Hi, {userInfo?.name}</p>
            <IoIosArrowDropdown />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate(path.PROFILE)}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate(path.FISH)}
                  className="hover:text-black cursor-pointer"
                >
                  My Fish
                </p>

                <p
                  onClick={() => navigate(path.MY_APPOINTMENT)}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>

                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
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
  );
};

export default Navbar;
