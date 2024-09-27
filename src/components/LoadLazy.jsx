import PropTypes from "prop-types";
import { Suspense } from "react";

const LoadLazy = ({ children }) => {
  return <Suspense fallback={<div>Loading...</div>}> {children} </Suspense>;
};

// Khai báo kiểu dữ liệu cho props
LoadLazy.propTypes = {
  children: PropTypes.node.isRequired, // `children` phải là node và bắt buộc
};

export default LoadLazy;
