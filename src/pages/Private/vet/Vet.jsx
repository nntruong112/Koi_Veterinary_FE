import React from "react";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";
import VetSideBar from "../../../components/Private/vet/vetSideBar/VetSideBar";
import { Outlet } from "react-router-dom";

const Vet = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-row gap-1">
        <VetSideBar />
        <main className="w-full px-10 pb-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Vet;
