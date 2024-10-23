// PaymentDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams(); // Lấy paymentId từ URL
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!payment) {
    return <div>Không tìm thấy thông tin thanh toán.</div>;
  }

  return (
    <div className="payment-details p-4">
      <h2 className="text-xl font-bold mb-4">Chi tiết thanh toán</h2>
      <p>
        <strong>ID thanh toán:</strong> {payment.paymentId}
      </p>
      {/* <p>
        <strong>Người dùng:</strong> {payment.user.username}
      </p> */}
      <p>
        <strong>Email:</strong> {payment.email}
      </p>
      <p>
        <strong>Số tiền:</strong> {payment.amountValue} VND
      </p>
      <p>
        <strong>Ngày thanh toán:</strong> {payment.vnp_PayDate}
      </p>
      <p>
        <strong>Loại đơn hàng:</strong> {payment.orderType}
      </p>
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
