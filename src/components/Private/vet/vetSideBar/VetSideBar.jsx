import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slices/authSlice";
import { clearUser } from "../../../../redux/slices/userSlice";
import { clearPersistedStore } from "../../../../redux/store/store";
import { VscSignOut } from "react-icons/vsc";
import { assets } from "../../../../assets/assets.js";

const VetSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.users?.data?.result);

  const isDashboardActive =
    location.pathname === path.VET || location.pathname === path.VET_PROFILE;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    clearPersistedStore();
    navigate(path.HOME);
  };

  return (
    <aside className="flex flex-col gap-2 w-64 min-h-screen">
      <div className="h-full px-3 py-4 bg-gray-100 dark:bg-gray-800">
        <ul className="space-y-2 font-semibold text-xl">
          <div className="flex items-center justify-start gap-4 p-2">
            <img
              src={userInfo?.image || assets.DefaultAvatar}
              className="w-10 h-10 rounded-full border border-black"
              alt="Admin Avatar"
            />
            <span>Admin</span>
          </div>

          <hr className="my-2 h-0.5 bg-black dark:bg-gray-700" />

          <li>
            <NavLink
              to={path.VET}
              className={`flex items-center p-2 rounded-lg group ${
                isDashboardActive
                  ? "text-white bg-blue-500 dark:bg-blue-700"
                  : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <FaUserDoctor />
              <span className="flex-1 ms-3 whitespace-nowrap">Vet Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.SCHEDULE}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <RiCalendarScheduleFill />
              <span className="flex-1 ms-3 whitespace-nowrap">Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={path.HEALTH_RECORD}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <RiCalendarScheduleFill />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Health Record
              </span>
            </NavLink>
          </li>
          <hr className="my-2 h-0.5 bg-black dark:bg-gray-700" />

          <li
            onClick={handleLogout}
            className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          >
            <VscSignOut />
            <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default VetSideBar;
