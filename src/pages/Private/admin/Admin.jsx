import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../../components/Private/admin/sidebar/SideBar";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";

const Admin = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row">
        <SideBar />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;
