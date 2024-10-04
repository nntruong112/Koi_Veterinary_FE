import React from "react";
import { CiCircleCheck } from "react-icons/ci";

const SuccessModal = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-[30%] h-[30%] text-primary flex flex-col justify-center items-center">
        <CiCircleCheck className="text-7xl" />
        <h2 className="text-4xl font-bold">{message}</h2>
      </div>
    </div>
  );
};

export default SuccessModal;
