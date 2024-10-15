import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../Private/admin/adminNavbar/AdminNavbar";
import Navbar from "../Navbar";

const RolesNavbar = () => {
  const roles = useSelector((state) => state.users.data?.result?.roles);

  switch (roles) {
    case "ADMIN":
      return <AdminNavbar />;

    case "STAFF":
      return <AdminNavbar />;

    case "VET":
      return <AdminNavbar />;

    default:
      return <Navbar />;
  }
};

export default RolesNavbar;
