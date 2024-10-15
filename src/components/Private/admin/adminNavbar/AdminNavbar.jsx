import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../../../../utils/constant";
import { assets } from "../../../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.users?.data?.result);
  const roles = useSelector((state) => state.users.data?.result?.roles);

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
              onClick={handleClick}
              className="flex items-center justify-center gap-4 p-2 cursor-pointer"
            >
              <img
                src={userInfo.image || assets.DefaultAvatar}
                className="w-12 h-12 rounded-full"
                alt="Admin Avatar"
              />
              <span className="border border-black rounded-full p-3 bg-white/10">
                {getLabel()}
              </span>
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
