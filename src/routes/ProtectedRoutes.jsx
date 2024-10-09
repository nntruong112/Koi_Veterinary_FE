import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../utils/constant";
import PrivateRoutes from "./PrivateRoutes";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const userInfo = useSelector((state) => state.users.data.result); // Lấy thông tin người dùng từ Redux store

  // Kiểm tra vai trò người dùng
  const roles = userInfo?.roles;
  console.log(roles);

  // Kiểm tra xem người dùng có quyền truy cập không
  if (!allowedRoles.some((allowedRole) => roles.includes(allowedRole))) {
    return <Navigate to={path.HOME} replace />; // replace để không cho phép người dùng quay lại trang đã bị chặn bằng nút back của trình duyệt
  }

  return children;
};

// Định nghĩa kiểu dữ liệu cho props
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired, // Đảm bảo rằng children là một node React
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Đảm bảo rằng allowedRoles là một mảng các chuỗi
};

export default ProtectedRoutes;
