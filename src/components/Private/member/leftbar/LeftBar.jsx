import React from "react";
import { NavLink } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { GiCirclingFish } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { IoMdBackspace } from "react-icons/io";

const LeftBar = () => {
  return (
    <aside className="flex flex-col gap-2 w-64 min-h-screen">
      <div className="h-full px-3 py-4 bg-gray-100 dark:bg-gray-800">
        <ul className="space-y-2 font-semibold text-xl">
          <li>
            <NavLink
              to={path.PROFILE}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaUser />
              <span className="ms-3">My Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.MY_APPOINTMENT}
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
                My Appointment
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.FISH}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <GiCirclingFish className="text-2xl" />
              <span className="flex-1 ms-3 whitespace-nowrap">My Fish</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.ADD_FISH}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <IoAddCircle className="text-2xl" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Add New Fish
              </span>
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to={path.HOME}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <IoMdBackspace className="text-2xl" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Back To Home
              </span>
            </NavLink>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default LeftBar;
