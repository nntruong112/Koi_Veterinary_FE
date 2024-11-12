// PaymentDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../../../../assets/assets";
import { path } from "../../../../utils/constant";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams(); // Lấy paymentId từ URL
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate cho điều hướng

  useEffect(() => {
    // Gọi API để lấy thông tin thanh toán
    const fetchPayment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/payments/get-payments/${paymentId}`
        );
        setPayment(response.data);
      } catch (err) {
        setError("Không thể tải thông tin thanh toán.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  const formatDate = (dateString) => {
    // Lấy năm, tháng, ngày, giờ, phút, giây từ chuỗi
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // Tháng bắt đầu từ 0
    const day = parseInt(dateString.substring(6, 8), 10);
    const hours = parseInt(dateString.substring(8, 10), 10);
    const minutes = parseInt(dateString.substring(10, 12), 10);
    const seconds = parseInt(dateString.substring(12, 14), 10);

    // Tạo đối tượng Date
    const date = new Date(year, month, day, hours, minutes, seconds);
    return date.toLocaleString("vi-VN"); // Định dạng theo phong cách Việt Nam
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!payment) {
    return <div>Not found payment details!</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-full mx-auto p-6 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src={assets.tick} className="w-28 h-28" alt="Tick" />
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">PAYMENT INVOICE</h2>
          <p className="text-sm text-gray-600">
            Invoice Date: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="border-b border-gray-300 mb-6"></div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Payment Information
          </h3>
          <p className="text-gray-700">
            <strong>Payment ID:</strong> {payment.vnp_TxnRef}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {payment.email}
          </p>
        </div>

        <div className="border-b border-gray-300 mb-6"></div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Order Details
          </h3>
          <p className="text-gray-700">
            <strong>Amount:</strong> {payment.amountValue.toLocaleString()} VND
          </p>
          <p className="text-gray-700">
            <strong>Payment Date:</strong> {payment.vnp_PayDate}
          </p>
          <p className="text-gray-700">
            <strong>Order Type:</strong> {payment.orderType}
          </p>
        </div>

        <div className="border-b border-gray-300 mb-6"></div>

        <div className="text-right">
          <h3 className="text-lg font-semibold text-gray-800">Total</h3>
          <p className="text-2xl font-bold text-gray-900">
            {payment.amountValue.toLocaleString()} VND
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Thank you for using our service!
          </p>
        </div>
        <div className="mt-8 text-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            onClick={() => navigate(`${path.MEMBER}/${path.MY_APPOINTMENT}`)}
          >
            Back to My Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;

// import React from "react";
// import ClipLoader from "react-spinners/ClipLoader";

// const PaymentDetailsPage = () => {
//   return (
//     <div className="w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
//         Thanh toán đã hoàn tất
//       </h1>

//       <div className="flex justify-center mb-4">
//         <ClipLoader size={50} color={"#1d4ed8"} loading={false} />
//       </div>

//       <p className="text-center text-green-500 font-semibold">
//         Thanh toán đã hoàn tất
//       </p>
//     </div>
//   );
// };

// export default PaymentDetailsPage;
