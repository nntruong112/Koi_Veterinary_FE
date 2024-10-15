import React from "react";
import StaffSideBar from "../../../components/Private/staff/staffSideBar/StaffSideBar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";

const Staff = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row gap-1">
        <StaffSideBar />
        <main className="w-full px-10 pb-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Staff;
