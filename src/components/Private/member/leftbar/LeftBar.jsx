import React from "react";
import { NavLink } from "react-router-dom";
import { path } from "../../../../utils/constant";

const LeftBar = () => {
  return (
    <aside className="flex flex-col gap-2 w-64 min-h-screen bg-gray-100">
      <NavLink
        to={path.PROFILE}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">My Profile</p>
      </NavLink>

      <NavLink
        to={path.MY_APPOINTMENT}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">My Appointment</p>
      </NavLink>

      <NavLink
        to={path.FISH}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">My Fish</p>
      </NavLink>

      <NavLink
        to={path.ADD_FISH}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 md:px-9 md:min-w-60 cursor-pointer ${
            isActive ? "bg-gray-200 border-r-4 border-primary" : ""
          } `
        }
      >
        <p className="text-xl">Add New Fish</p>
      </NavLink>
    </aside>
  );
};

export default LeftBar;
