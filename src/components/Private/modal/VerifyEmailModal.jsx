import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../../services/authService"; // Import API verifyEmail
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

const VerifyEmailModal = ({ isOpen, onClose, email }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill("")); // Mảng chứa 6 ô input
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) return null; // Không render modal nếu không mở

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Tự động chuyển đến ô input tiếp theo
      if (index < 5) {
        document.getElementsByName("digit")[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(""); // Ghép các chữ số thành chuỗi mã

    if (verificationCode.length === 6 && email) {
      setError("");
      try {
        const verification = { email, code: verificationCode }; // Tạo đối tượng {email, code}
        const resultAction = await dispatch(verifyEmail(verification)); // Gửi yêu cầu xác minh

        if (resultAction.payload) {
          // Kiểm tra xem xác minh thành công
          alert("Verification successful!");
          navigate(path.LOGIN);
          onClose();
        } else {
          setError("Verification failed. Please try again.");
        }
      } catch (error) {
        setError("Verification failed. Please try again.");
      }
    } else {
      setError("Please enter a valid 6-digit code.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-[30%] h-[40%] text-primary flex flex-col justify-between items-center">
        <div>
          <h2 className="text-3xl mb-3 font-bold text-center bg-primary text-transparent bg-clip-text">
            Email Verification
          </h2>
          <p className="text-center text-gray-400 ">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
          {code.map((digit, index) => (
            <input
              key={index}
              name="digit"
              className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
            />
          ))}
        </form>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-primary text-white w-1/4 h-12 rounded-lg text-center text-xl"
        >
          Verify
        </button>

        <p className="text-gray-400">
          Didn't receive code?
          <span className="text-primary ml-3 cursor-pointer">
            Request again
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
