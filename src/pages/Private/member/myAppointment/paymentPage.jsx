// // src/PaymentPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const PaymentPage = () => {
//   const [appointment, setAppointment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = useSelector((state) => state.auth.data?.token);
//   const customerId = useSelector((state) => state.users?.data?.result?.userId);

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/appointments/belonged_to_customerId/${customerId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAppointment(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointment();
//   }, [customerId, token]);

//   if (loading)
//     return (
//       <p className="text-center mt-12 text-lg font-light">
//         Loading appointments...
//       </p>
//     );
//   if (error)
//     return (
//       <p className="text-center text-red-500 font-semibold">Error: {error}</p>
//     );

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center">Payment Details</h1>
//       <div className="border-b pb-4 mb-4">
//         <p className="text-lg">
//           <strong>Appointment ID:</strong> {appointment.appointmentId}
//         </p>
//         <p className="text-lg">
//           <strong>Date:</strong> {appointment.appointmentDate}
//         </p>
//         <p className="text-lg">
//           <strong>Type:</strong> {appointment.appointmentType}
//         </p>
//       </div>
//       <div className="border-b pb-4 mb-4">
//         <p className="text-lg">
//           <strong>Status:</strong> {appointment.status}
//         </p>
//         <p className="text-lg">
//           <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
//         </p>
//         <p className="text-lg">
//           <strong>Location:</strong> {appointment.location}
//         </p>
//       </div>
//       <div className="border-b pb-4 mb-4">
//         <p className="text-lg">
//           <strong>Customer:</strong> {appointment.userInfo?.username}
//         </p>
//         <p className="text-lg">
//           <strong>Veterinarian:</strong> {appointment.veterinarian?.name}
//         </p>
//         <p className="text-lg">
//           <strong>Fish:</strong> {appointment.fish?.species}
//         </p>
//       </div>

//       <button
//         className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
//         onClick={() => alert("Proceed to payment...")}
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const appointmentId = location.state?.appointmentId;
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`BASE_URLinvoices/${appointmentId}`);
        if (response.data) {
          setInvoice(response.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          setError("Failed to fetch invoice data.");
        }
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          setError("Failed to fetch invoice data.");
        }
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
      await axios.post(`BASE_URLpayments`, {
        appointmentId,
        paymentMethod,
      });
      alert("Payment successful!");
      navigate(`/appointments`);
      navigate(`/appointments`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed! Please try again.");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-12 text-lg font-light">
        Loading invoice details...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">{error}</p>;
    return <p className="text-center text-red-500 font-semibold">{error}</p>;
  }

  return (
    <div className="payment-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Invoice Payment
      </h1>
      <div className="invoice-details mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Invoice Details
        </h2>
        <p className="text-gray-600 mb-3">
          <strong>Invoice ID:</strong> {invoice.invoiceId}
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Total Amount:</strong> ${invoice.total}
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Discount:</strong> ${invoice.discount}
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Final Amount:</strong> $
          {(invoice.total - invoice.discount).toFixed(2)}
        </p>
        <p className="text-gray-600">
          <strong>Payment Status:</strong> {invoice.paymentStatus}
        </p>
      </div>

      <div className="payment-method mb-10">
        <h3 className="text-xl font-medium text-gray-700 mb-4">
          Choose Payment Method
        </h3>
      <div className="payment-method mb-10">
        <h3 className="text-xl font-medium text-gray-700 mb-4">
          Choose Payment Method
        </h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handlePayment}
          className="py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
        >
          Pay Now
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePayment}
          className="py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
