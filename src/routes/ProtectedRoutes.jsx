import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../utils/constant";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const roles = useSelector((state) => state.users.data?.result?.roles);

  // Kiểm tra quyền truy cập
  const hasAccessRole = roles === allowedRoles;

  if (roles && !hasAccessRole) {
    return <Navigate to={path.HOME} replace />;
  }

  return children;
};

export default ProtectedRoutes;
