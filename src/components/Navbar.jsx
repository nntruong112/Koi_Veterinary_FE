import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearPersistedStore } from "../redux/store/store";
import { clearUser } from "../redux/slices/userSlice";
import { FaUser } from "react-icons/fa";
import { GiCirclingFish } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users?.data?.result);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
    dispatch(clearUser());
    clearPersistedStore();
    navigate(path.HOME);
  };

  return (
    <div className="relative">
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMenu}
        ></div>
      )}

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
          <NavLink to={path.TEAM}>
            <li className="py-1">All Vet</li>
            <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to={path.FEATURES}>
            <li className="py-1">Features</li>
            <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to={path.WORK}>
            <li className="py-1">Work</li>
            <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to={path.CONTACT}>
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
          </NavLink>
          {/* <NavLink to={path.PRICING}>
            <li className="py-1">Pricing</li>
            <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
          </NavLink> */}
          <NavLink to={path.CHAT}>
            <li className="py-1">Chat</li>
            <hr className="border-none outline-none h-0.5 bg-black w-3/5 m-auto hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {userInfo ? (
            <div className="flex items-center gap-2 ">
              <p>Welcome, </p>
              <button onClick={toggleMenu} className="p-2 cursor-pointer">
                <img
                  src={userInfo.image}
                  className="w-10 h-10 rounded-full"
                  alt="User Avatar"
                />
              </button>

              {/* Sidebar menu */}
              <div
                className={`fixed top-0 right-0 z-30 h-full w-72 bg-white shadow-lg transition-transform transform ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between border-b-2">
                  <div className="flex items-center justify-start gap-2 py-4 px-4 ">
                    <img
                      src={userInfo.image}
                      className="w-10 h-10 rounded-full"
                      alt="User Avatar"
                    />
                    <p>{userInfo?.username}</p>
                  </div>

                  <button
                    onClick={toggleMenu}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 mr-4"
                  >
                    <AiOutlineClose />
                  </button>
                </div>

                <ul className="space-y-4 font-medium px-6 py-4">
                  <li
                    onClick={() => navigate(`${path.MEMBER}/${path.PROFILE}`)}
                    className="flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <FaUser />
                    <p>My Profile</p>
                  </li>
                  <li
                    onClick={() => navigate(`${path.MEMBER}/${path.FISH}`)}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <GiCirclingFish className="text-2xl" />
                    <p>My Fish</p>
                  </li>
                  <li
                    onClick={() =>
                      navigate(`${path.MEMBER}/${path.MY_APPOINTMENT}`)
                    }
                    className="flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <RiCalendarScheduleFill />
                    <p>My Appointment</p>
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <VscSignOut />
                    <p>Logout</p>
                  </li>
                </ul>
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
    </div>
  );
};

export default Navbar;
