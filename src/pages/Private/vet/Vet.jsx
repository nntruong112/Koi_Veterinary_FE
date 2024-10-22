import React from "react";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";
import VetSideBar from "../../../components/Private/vet/vetSideBar/VetSideBar";
import { Outlet } from "react-router-dom";

const Vet = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row">
        <VetSideBar />
        <main className="w-full bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Vet;
