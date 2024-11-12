import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../../../utils/constant";
import { assets } from "../../../../assets/assets";
import { logout } from "../../../../redux/slices/authSlice";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearAdmin } from "../../../../redux/slices/adminSlice";
import { clearPersistedStore } from "../../../../redux/store/store";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { FaSolarPanel } from "react-icons/fa";
import { clearVetData } from "../../../../redux/slices/vetSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.users?.data?.result);
  const roles = useSelector((state) => state.users.data?.result?.roles);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    switch (roles) {
      case "ADMIN":
        navigate(path.ADMIN);
        break;
      case "STAFF":
        navigate(path.STAFF);
        break;
      case "VET":
        navigate(path.VET);
        break;
    }
  };

  const getLabel = () => {
    switch (roles) {
      case "ADMIN":
        return "Admin Panel";
      case "STAFF":
        return "Staff Panel";
      case "VET":
        return "Vet Panel";
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logout());
    dispatch(clearUser());
    dispatch(clearAdmin());
    dispatch(clearVetData());
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
            <li className="py-1">FAQ</li>
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
        </ul>

        <div className="flex items-center gap-4">
          {userInfo ? (
            <div className="flex items-center gap-2 ">
              <p>Welcome, </p>
              <button onClick={toggleMenu} className="p-2 cursor-pointer">
                <img
                  src={userInfo.image || assets.DefaultAvatar}
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
                      src={userInfo.image || assets.DefaultAvatar}
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
                    onClick={handleClick}
                    className="flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <FaSolarPanel />
                    {getLabel()}
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
              onClick={() => navigate(path.LOGIN)}
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
