// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ClipLoader from "react-spinners/ClipLoader";

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // Use navigate to return to the previous page
//   const appointmentP = location.state?.selectedAppointment;
//   const appointmentId = appointmentP.appointmentId;

//   const [paymentResponse, setPaymentResponse] = useState(null);
//   const [paymentUrl, setPaymentUrl] = useState("");
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const userId = useSelector((state) => state.users.data?.result?.userId);

//   // Automatically create payment when component mounts
//   useEffect(() => {
//     const createPayment = async () => {
//       setIsLoading(true); // Start loading
//       try {
//         const res = await axios.post(
//           "http://localhost:8080/payments/create-payment",
//           {
//             appointmentId,
//             userId,
//           }
//         );
//         setPaymentResponse(res.data);
//         setPaymentUrl(res.data.paymentUrl);
//       } catch (error) {
//         console.error("Error creating payment:", error);
//         setPaymentResponse({ message: "Error creating payment" });
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     };

//     createPayment(); // Call the function
//   }, [appointmentId, userId]); // Dependency array

//   // Fetch payment details
//   const fetchPaymentDetails = async () => {
//     if (!paymentResponse) return; // Ensure paymentResponse is available
//     setIsLoading(true); // Start loading
//     try {
//       const res = await axios.get(
//         `http://localhost:8080/payments/get-payment/${paymentResponse.paymentId}`
//       );
//       setPaymentDetails(res.data);
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       console.error("Error fetching payment:", error);
//       setPaymentDetails(null);
//       setError("Failed to fetch payment details. Please try again.");
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   // Function to update appointment status to "Paid"
//   const updateAppointmentStatus = async () => {
//     setIsLoading(true); // Start loading
//     try {
//       await axios.patch(
//         `http://localhost:8080/appointments/update-status/${appointmentId}`,
//         { status: "Paid" }
//       );
//       // After successful update, navigate back to the appointments page
//       navigate("/appointments"); // Adjust the route based on your application's routing
//     } catch (error) {
//       console.error("Error updating appointment status:", error);
//       setError("Failed to update appointment status. Please try again.");
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   // Check if the payment is completed and update the appointment status
//   useEffect(() => {
//     const checkPaymentStatus = async () => {
//       if (paymentResponse && paymentResponse.status === "success") {
//         await updateAppointmentStatus(); // Update the status to "Paid"
//       }
//     };
//     checkPaymentStatus();
//   }, [paymentResponse]);

//   return (
//     <div className="payment-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
//         Koi Health Service Payments
//       </h1>

//       {isLoading && (
//         <div className="flex justify-center mb-4">
//           <ClipLoader size={50} color={"#1d4ed8"} loading={isLoading} />
//         </div>
//       )}

//       {error && (
//         <p className="text-center text-red-500 font-semibold">{error}</p>
//       )}

//       {/* Payment Response Section */}
//       {paymentResponse && (
//         <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
//           <div className="grid grid-cols-3 gap-y-5 w-4/5">
//             <div>
//               <strong>Order Type:</strong>{" "}
//               {paymentResponse.orderType ||
//                 "Thanh Toan Dich Vu KoiHealthService"}
//             </div>
//             <div>
//               <strong>Create Date:</strong> {paymentResponse.vnp_CreateDate}
//             </div>
//             <div>
//               <strong>Expire Date:</strong> {paymentResponse.vnp_ExpireDate}
//             </div>
//             <div>
//               <strong>User:</strong> {paymentResponse.user?.username}
//             </div>
//           </div>
//           <div className="flex flex-col w-1/5">
//             <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
//               <button className="mt-4 mr-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90">
//                 Make Payment
//               </button>
//             </a>
//           </div>
//         </div>
//       )}

//       {/* Get Payment Details Section */}
//       <div className="bg-gray-100 p-5 rounded-lg shadow-md">
//         <button
//           onClick={fetchPaymentDetails}
//           className="py-2 px-4 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition duration-300 ease-in-out"
//         >
//           Get Payment Details
//         </button>
//         {paymentDetails && (
//           <div className="mt-4">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//               Payment Details:
//             </h3>
//             <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
//               <div className="grid grid-cols-3 gap-y-5 w-4/5">
//                 <div className="mb-2">
//                   <strong>Payment ID:</strong> {paymentDetails.paymentId}
//                 </div>
//                 <div className="mb-2">
//                   <strong>Amount:</strong> {paymentDetails.amountValue}
//                 </div>

//                 <div className="mb-2">
//                   <strong>Date:</strong> {new Date().toLocaleDateString()}
//                 </div>

//                 <div className="mb-2">
//                   <strong>Create Date:</strong> {paymentDetails.vnp_CreateDate}
//                 </div>
//                 <div className="mb-2">
//                   <strong>Expire Date:</strong> {paymentDetails.vnp_ExpireDate}
//                 </div>
//                 <div className="mb-2">
//                   <strong>Order Type:</strong>{" "}
//                   {paymentDetails.orderType ||
//                     "Thanh Toan Dich Vu KoiHealthService"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate to return to the previous page
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
            appointmentId, // Pass appointmentId in POST request
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
  }, [appointmentId, userId]);

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
      const res = await axios.get(
        `http://localhost:8080/payments/get-payment/${paymentResponse?.paymentId}`,
        {
          params: { appointmentId },
        }
      );
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
        <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
          <div className="grid grid-cols-3 gap-y-5 w-4/5">
            <div>
              <strong>Order Type:</strong>{" "}
              {paymentResponse.orderType ||
                "Thanh Toan Dich Vu KoiHealthService"}
            </div>
            <div>
              <strong>Create Date:</strong> {paymentResponse.vnp_CreateDate}
            </div>
            <div>
              <strong>Expire Date:</strong> {paymentResponse.vnp_ExpireDate}
            </div>
            <div>
              <strong>User:</strong> {paymentResponse.user?.username}
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
            <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
              <div className="grid grid-cols-3 gap-y-5 w-4/5">
                <div className="mb-2">
                  <strong>Payment ID:</strong> {paymentDetails.paymentId}
                </div>
                <div className="mb-2">
                  <strong>Amount:</strong> {paymentDetails.amountValue}
                </div>

                <div className="mb-2">
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
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
