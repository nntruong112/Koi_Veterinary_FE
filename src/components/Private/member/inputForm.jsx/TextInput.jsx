import React from "react";

const TextInput = ({
  label,
  name,
  value,
  disabled,
  onChange,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label className="block text-xl font-medium mb-3">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default TextInput;
