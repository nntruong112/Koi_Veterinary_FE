import React from "react";
import StaffSideBar from "../../../components/Private/staff/staffSideBar/StaffSideBar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";

const Staff = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row">
        <StaffSideBar />
        <main className="w-full bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Staff;
