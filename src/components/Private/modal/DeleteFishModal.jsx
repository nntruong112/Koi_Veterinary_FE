import React from "react";

const DeleteFishModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-[40%] h-[20%] text-primary flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-6">{message}</h2>

        <div className="flex space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/80"
          >
            OK
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-500/80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFishModal;
