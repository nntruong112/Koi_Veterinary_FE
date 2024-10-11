import PropTypes from "prop-types";
import { Suspense } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadLazy = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed flex justify-center items-center text-9xl top-0 bottom-0 left-0 right-0">
          <PacmanLoader
            size={80}
            color={"#16d6e6"}
            speedMultiplier={2}
            loading={true}
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

// Khai báo kiểu dữ liệu cho props
LoadLazy.propTypes = {
  children: PropTypes.node.isRequired, // `children` phải là node và bắt buộc
};

export default LoadLazy;
