import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../../components/Private/admin/sidebar/SideBar";
import NavBar from "../../../components/Navbar";

const Admin = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-row gap-5">
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;
