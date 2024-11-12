import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { useSelector } from "react-redux";
import { assets } from "../../../../assets/assets.js";
import { LuActivitySquare, LuCalendar } from "react-icons/lu";

const VetSideBar = () => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.users?.data?.result);

  const isDashboardActive =
    location.pathname === path.VET || location.pathname === path.VET_PROFILE;

  return (
    <aside className="flex flex-col gap-2 w-64 min-h-screen">
      <div className="h-full px-3 py-4 bg-white dark:bg-gray-800 border">
        <ul className="space-y-2 font-semibold text-xl">
          <div className="flex items-center justify-start gap-4 p-2">
            <img
              src={userInfo?.image || assets.DefaultAvatar}
              className="w-10 h-10 rounded-full border border-black"
              alt="Admin Avatar"
            />
            <span>Veterinarian</span>
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
              <span className="flex-1 ms-3 whitespace-nowrap">
                Veterinarian Profile
              </span>
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
              <LuCalendar />
              <span className="flex-1 ms-3 whitespace-nowrap">Schedule</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.CREATE_HEALTH_RECORD}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <LuActivitySquare />

              <span className="flex-1 ms-3 whitespace-nowrap">
                Health Record
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.DO_APPOINTMENT}
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
                Appointments
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default VetSideBar;
