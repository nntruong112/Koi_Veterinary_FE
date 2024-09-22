import React, { memo } from "react";

const Button = ({ text, textColor, onClick }) => {
  return (
    <button
      size="large"
      style={{
        color: textColor,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default memo(Button);
