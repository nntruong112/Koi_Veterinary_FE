// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import NotFound from "../NotFound"; // Giả sử NotFound nằm trong cùng thư mục components

// const PaymentPage = () => {
//   const { invoiceId } = useParams(); // Lấy invoiceId từ URL
//   const [invoice, setInvoice] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [notFound, setNotFound] = useState(false); // Kiểm tra NotFound
//   const navigate = useNavigate(); // Để điều hướng sau khi thanh toán thành công

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/invoices/${invoiceId}`
//         );
//         if (response.data) {
//           setInvoice(response.data);
//         } else {
//           setNotFound(true); // Nếu không có dữ liệu
//         }
//       } catch (err) {
//         if (err.response && err.response.status === 404) {
//           setNotFound(true); // Lỗi 404: Không tìm thấy hóa đơn
//         } else {
//           setError("Failed to fetch invoice data.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoice();
//   }, [invoiceId]);

//   const handlePayment = async () => {
//     if (!paymentMethod) {
//       alert("Please choose a payment method!");
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:8080/payments`, {
//         invoiceId,
//         paymentMethod,
//       });
//       alert("Payment successful!");
//       navigate(`/appointments`); // Điều hướng về trang appointments sau khi thanh toán thành công
//     } catch (error) {
//       console.error("Payment failed:", error);
//       alert("Payment failed! Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center mt-12 text-lg font-light">
//         Loading invoice details...
//       </p>
//     );
//   }

//   if (notFound) {
//     return <NotFound />; // Hiển thị trang NotFound nếu hóa đơn không tồn tại
//   }

//   if (error) {
//     return <p className="text-center text-red-500 font-semibold">{error}</p>;
//   }

//   return (
//     <div className="payment-page w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-semibold mb-4">Invoice Payment</h1>
//       <div className="invoice-details mb-6">
//         <h2 className="text-lg font-medium">Invoice ID: {invoice.invoiceId}</h2>
//         <p>Total Amount: ${invoice.total}</p>
//         <p>Discount: ${invoice.discount}</p>
//         <p>Final Amount: ${(invoice.total - invoice.discount).toFixed(2)}</p>
//         <p>Payment Status: {invoice.paymentStatus}</p>
//       </div>

//       <div className="payment-method mb-6">
//         <h3 className="text-lg font-medium mb-2">Choose Payment Method</h3>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="p-2 border rounded-lg w-full"
//         >
//           <option value="">Select Payment Method</option>
//           <option value="credit_card">Credit Card</option>
//           <option value="paypal">PayPal</option>
//           <option value="bank_transfer">Bank Transfer</option>
//         </select>
//       </div>

//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={handlePayment}
//           className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy appointmentId từ URL

const PaymentPage = () => {
  const { appointmentId } = useParams(); // Lấy appointmentId từ URL
  const [invoice, setInvoice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/invoices/${appointmentId}`
        );
        setInvoice(response.data);
      } catch (err) {
        setError("Error fetching invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [appointmentId]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please choose a payment method!");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/invoices`, {
        appointmentId,
        paymentMethod,
      });
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed! Please try again.");
    }
  };

  if (loading) {
    return <p>Loading invoice...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!invoice) {
    return <p>No invoice found.</p>;
  }

  return (
    <div className="payment-page w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Invoice Payment</h1>
      <div className="invoice-details mb-6">
        <h2 className="text-lg font-medium">Invoice ID: {invoice.invoiceId}</h2>
        <p>Total Amount: ${invoice.total}</p>
        <p>Discount: ${invoice.discount}</p>
        <p>Final Amount: ${(invoice.total - invoice.discount).toFixed(2)}</p>
        <p>Payment Status: {invoice.paymentStatus}</p>
      </div>

      <div className="payment-method mb-6">
        <h3 className="text-lg font-medium mb-2">Choose Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded-lg w-full"
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
