// import React, { useState } from "react";
// import axios from "axios";

// const PaymentPage = () => {
//   // States for creating payment
//   const [appointmentId, setAppointmentId] = useState("");
//   const [userId, setUserId] = useState("");
//   const [paymentResponse, setPaymentResponse] = useState(null);
//   const [paymentUrl, setPaymentUrl] = useState("");

//   // States for retrieving payment details
//   const [paymentId, setPaymentId] = useState("");
//   const [paymentDetails, setPaymentDetails] = useState(null);

//   // Handle payment creation
//   const handleCreatePayment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/payments/create-payment",
//         {
//           appointmentId,
//           userId,
//         }
//       );
//       setPaymentResponse(res.data);
//       setPaymentUrl(res.data.paymentUrl); // Save the payment URL from the response
//     } catch (error) {
//       console.error("Error creating payment:", error);
//       setPaymentResponse({ message: "Error creating payment" });
//     }
//   };

//   // Handle retrieving payment details
//   const handleGetPayment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/payments/get-payment/${paymentId}`
//       );
//       setPaymentDetails(res.data);
//     } catch (error) {
//       console.error("Error fetching payment:", error);
//       setPaymentDetails(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Koi Health Service Payments</h1>

//       {/* Create Payment Section */}
//       <div>
//         <h2>Create Payment</h2>
//         <form onSubmit={handleCreatePayment}>
//           <div>
//             <label>Appointment ID:</label>
//             <input
//               type="text"
//               value={appointmentId}
//               onChange={(e) => setAppointmentId(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>User ID:</label>
//             <input
//               type="text"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Create Payment</button>
//         </form>
//         {paymentResponse && (
//           <div>
//             <h3>Response:</h3>
//             <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
//             {paymentUrl && (
//               <div>
//                 <h4>Payment URL:</h4>
//                 <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
//                   Click here to make the payment
//                 </a>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Get Payment Details Section */}
//       <div>
//         <h2>Get Payment Details</h2>
//         <form onSubmit={handleGetPayment}>
//           <div>
//             <label>Payment ID:</label>
//             <input
//               type="text"
//               value={paymentId}
//               onChange={(e) => setPaymentId(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Get Payment</button>
//         </form>
//         {paymentDetails && (
//           <div>
//             <h3>Payment Details:</h3>
//             <pre>{JSON.stringify(paymentDetails, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
// src/PaymentPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentPage = () => {
  const location = useLocation();
  const appointmentP = location.state?.selectedAppointment;
  const appointmentId = appointmentP.appointmentId;

  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.users.data?.result?.userId);

  // Automatically create payment when component mounts
  useEffect(() => {
    const createPayment = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await axios.post(
          "http://localhost:8080/payments/create-payment",
          {
            appointmentId,
            userId,
          }
        );
        setPaymentResponse(res.data);
        // Lưu paymentId vào localStorage
        localStorage.setItem("paymentId", res.data.paymentId);
        setPaymentUrl(res.data.paymentUrl);

        // setPaymentUrl(`${res.data.paymentUrl}?paymentId=${res.data.paymentId}`);
      } catch (error) {
        console.error("Error creating payment:", error);
        setPaymentResponse({ message: "Error creating payment" });
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    createPayment(); // Call the function
  }, [appointmentId, userId]); // Dependency array

  // Fetch payment details
  const fetchPaymentDetails = async () => {
    let paymentId;

    // Kiểm tra nếu có paymentResponse, nếu không thì lấy paymentId từ localStorage
    if (paymentResponse && paymentResponse.paymentId) {
      paymentId = paymentResponse.paymentId;
    } else {
      paymentId = localStorage.getItem("paymentId");
    }

    if (!paymentId) {
      setError("No payment ID found.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const res = await axios.get(`BASE_URL/payments/get-payment/${paymentId}`);
      setPaymentDetails(res.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching payment:", error);
      setPaymentDetails(null);
      setError("Failed to fetch payment details. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="payment-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Koi Health Service Payments
      </h1>

      {isLoading && (
        <div className="flex justify-center mb-4">
          <ClipLoader size={50} color={"#1d4ed8"} loading={isLoading} />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* Payment Response Section */}
      {paymentResponse && (
        <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg  text-lg">
          <div className="grid grid-cols-3 gap-y-5 w-4/5">
            {/* <div>
              <strong>Appointment ID:</strong> {appointmentId}
            </div>

            <div>
              <strong>Payment ID:</strong> {paymentResponse.paymentId}
            </div> */}
            <div>
              <strong>Create Date:</strong> {paymentResponse.vnp_CreateDate}
            </div>
            <div>
              <strong>Expire Date:</strong> {paymentResponse.vnp_ExpireDate}
            </div>
            <div>
              <strong>User:</strong>{" "}
              {paymentResponse.user ? paymentResponse.user.name : "N/A"}
            </div>
            <div>
              <strong>Order Type:</strong>{" "}
              {paymentResponse.orderType ||
                "Thanh Toan Dich Vu KoiHealthService"}
            </div>
          </div>
          <div className="flex flex-col w-1/5">
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
              <button className="mt-4 mr-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90">
                Make Payment
              </button>
            </a>
          </div>
        </div>
      )}

      {/* Get Payment Details Section */}
      <div className="bg-gray-100 p-5 rounded-lg shadow-md">
        <button
          onClick={fetchPaymentDetails}
          className="py-2 px-4 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition duration-300 ease-in-out"
        >
          Get Payment Details
        </button>
        {paymentDetails && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Payment Details:
            </h3>
            <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg  text-lg">
              <div className="grid grid-cols-3 gap-y-5 w-4/5">
                <div className="mb-2">
                  <strong>Payment ID:</strong> {paymentDetails.paymentId}
                </div>
                <div className="mb-2">
                  <strong>Amount:</strong> {paymentDetails.amount}
                </div>
                <div className="mb-2">
                  <strong>Status:</strong> {paymentDetails.status}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(paymentDetails.date).toLocaleDateString()}
                </div>
                <div className="mb-2">
                  <strong>Create Date:</strong> {paymentDetails.vnp_CreateDate}
                </div>
                <div className="mb-2">
                  <strong>Expire Date:</strong> {paymentDetails.vnp_ExpireDate}
                </div>

                <div className="mb-2">
                  <strong>Order Type:</strong>{" "}
                  {paymentDetails.orderType ||
                    "Thanh Toan Dich Vu KoiHealthService"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
