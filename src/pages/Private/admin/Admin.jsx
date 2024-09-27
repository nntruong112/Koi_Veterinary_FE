import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const isLogin = true;
  const navigate = useNavigate();
  return (
    <div>
      <h1>Admin</h1>
      {/* <Outlet /> */}
      {isLogin ? <Outlet /> : navigate("/login")}
    </div>
  );
};

export default Admin;
