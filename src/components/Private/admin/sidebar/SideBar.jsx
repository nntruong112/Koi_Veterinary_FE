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
    <div className="min-h-screen bg-white border-r">
      <NavLink
        to={path.DASHBOARD}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <MdOutlineSpaceDashboard className="text-4xl" />
        <p className="text-2xl">Dashboard</p>
      </NavLink>

      <NavLink
        to={path.USERS}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <FaRegUser className="text-4xl" />
        <p className="text-2xl">Users</p>
      </NavLink>

      <NavLink
        to={path.APPOINTMENT}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <GrSchedules className="text-4xl" />
        <p className="text-2xl">Appointment</p>
      </NavLink>

      <NavLink
        to={path.ADDDOCTOR}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <CiSquarePlus className="text-4xl" />
        <p className="text-2xl">Add Doctor</p>
      </NavLink>

      <NavLink
        to={path.DOCTOR}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <FaUserDoctor className="text-4xl" />
        <p className="text-2xl">Doctor List</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
