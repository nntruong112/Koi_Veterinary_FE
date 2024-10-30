import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../services/authService";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ message, onClose }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await dispatch(forgotPassword({ email: email }));
      toast.success("Send successfully!");
    } catch (error) {
      console.error("Processing failed: ", error);
      toast.error("Failed while processing!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-[40%] h-[30%] text-primary flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-6">{message}</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
        />

        <div className="flex space-x-4">
          <button
            onClick={handleForgotPassword}
            className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/80"
          >
            Send
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-500/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
