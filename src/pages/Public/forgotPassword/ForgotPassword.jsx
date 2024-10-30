import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const toggleShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const [user, setUser] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateData = (name, value) => {
    let invalid = true;
    switch (name) {
      case "newPassword":
        if (!value) {
          setPasswordError("Password must be not blank");
          invalid = false;
        } else {
          if (value.length < 7) {
            setPasswordError("Password must be at least 7 characters");
            invalid = false;
          } else {
            setPasswordError("");
          }
        }
        break;

      case "confirmPassword":
        if (!value) {
          setConfirmPasswordError("Confirm password must be not blank");
          invalid = false;
        } else {
          if (value !== user.newPassword) {
            setConfirmPasswordError("Password is incorrect");
            invalid = false;
          } else {
            setConfirmPasswordError("");
          }
        }
        break;

      default:
        break;
    }

    return invalid;
  };

  //lay gia tri trong tung o input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    validateData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValid = validateData("password", user.newPassword);
    const confirmPasswordValid = validateData(
      "confirmPassword",
      user.confirmPassword
    );

    const resetPasswordData = {
      email: email,
      newPassword: user.newPassword,
    };

    if (passwordValid && confirmPasswordValid) {
      try {
        await dispatch(resetPassword(resetPasswordData));
        toast.success("Password changed successfully");
        navigate(path.LOGIN);
      } catch (error) {
        console.error("Error: ", error);
        toast.error("Error while submitting!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-[90%] max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* --------- Password -------- */}
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                onChange={handleChange}
                className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                  confirmPasswordError ? "border-red-500" : "border-none"
                } focus:border-red-500`}
              />

              <span
                onClick={toggleShowPass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {passwordError && (
              <p className="text-red-500 text-sm ml-2 mt-2">{passwordError}</p>
            )}
          </div>

          {/* --------- Confirm Password -------- */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter new password again"
                onChange={handleChange}
                className={`bg-[#eee] rounded-xl px-5 py-2 w-full border ${
                  confirmPasswordError ? "border-red-500" : "border-none"
                } focus:border-red-500`}
              />

              <span
                onClick={toggleShowConfirmPass}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {confirmPasswordError && (
              <p className="text-red-500 text-sm ml-2 mt-2">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
