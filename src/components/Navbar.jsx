import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { IoIosArrowDropdown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  // Tạo state để lưu thông tin giải mã
  const [decodedUser, setDecodedUser] = useState(null);

  useEffect(() => {
    // Giải mã token khi component được mount hoặc khi user data thay đổi
    if (user?.data?.token) {
      try {
        const decoded = jwtDecode(user.data.token);
        setDecodedUser(decoded); // Lưu thông tin đã giải mã vào state
        console.log("Decoded JWT: ", decoded);
      } catch (decodeError) {
        console.log("Decode error: ", decodeError);
      }
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-around bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-200 text-xl py-4">
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

      <div className="flex items-center gap-4">
        {user.data ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <p>
              Hi, <span> {decodedUser?.["user: "]?.name || "User"} </span>
            </p>
            <IoIosArrowDropdown />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointment")}
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
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            LOGIN
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
