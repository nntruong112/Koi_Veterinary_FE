import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GrSchedule } from "react-icons/gr";
import { NavLink, useLocation } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { assets } from "../../../../assets/assets.js";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.users?.data?.result);

  const isDashboardActive =
    location.pathname === path.ADMIN || location.pathname === path.DASHBOARD;

  return (
    <aside className="flex flex-col gap-2 w-64 min-h-screen">
      <div className="h-full px-3 py-4 bg-white dark:bg-gray-800 border">
        <ul className="space-y-2 font-semibold text-xl">
          <div className="flex items-center justify-start gap-4 p-2">
            <img
              src={userInfo?.image || assets.DefaultAvatar}
              className="w-10 h-10 rounded-full"
              alt="Admin Avatar"
            />
            <span>Admin</span>
          </div>

          <hr className="my-2 h-0.5 bg-black dark:bg-gray-700" />

          <li>
            <NavLink
              to={path.ADMIN}
              className={`flex items-center p-2 rounded-lg group ${
                isDashboardActive
                  ? "text-white bg-blue-500 dark:bg-blue-700"
                  : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <MdSpaceDashboard />
              <span className="flex-1 ms-3 whitespace-nowrap">Overview</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.USERS}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaUser />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.VETS}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <FaUserDoctor />
              <span className="flex-1 ms-3 whitespace-nowrap">Vets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.ADD_VET}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <IoAddCircle />
              <span className="flex-1 ms-3 whitespace-nowrap">Add New Vet</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={path.ALL_APPOINTMENT}
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

          <li>
            <NavLink
              to={path.ALL_SCHEDULE}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg group ${
                  isActive
                    ? "text-white bg-blue-500 dark:bg-blue-700"
                    : "text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <GrSchedule />
              <span className="flex-1 ms-3 whitespace-nowrap">Schedule</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
