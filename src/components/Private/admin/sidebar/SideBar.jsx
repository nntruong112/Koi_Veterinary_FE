import React from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { path } from "../../../../utils/constant";

const SideBar = () => {
  return (
    <aside className="flex flex-col gap-2 w-64 min-h-screen bg-gray-100">
      <NavLink
        to={path.DASHBOARD}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">Overview</p>
      </NavLink>

      <NavLink
        to={path.USERS}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">Users</p>
      </NavLink>

      <NavLink
        to={path.DOCTOR}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">Doctors</p>
      </NavLink>

      <NavLink
        to={path.ADD_DOCTOR}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">Add Doctor</p>
      </NavLink>
    </aside>
  );
};

export default SideBar;
