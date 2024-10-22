// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";

// const PaymentDetailsPage = () => {
//   const { paymentId } = useParams(); // Use paymentId from the URL
//   const navigate = useNavigate(); // Initialize useNavigate for redirection
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch payment details when component mounts
//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       if (!paymentId) return; // Ensure paymentId is available
//       setIsLoading(true); // Start loading
//       setError(null); // Clear any previous errors
//       try {
//         const res = await axios.get(
//           `http://localhost:8080/payments/get-payments/${paymentId}`
//         );
//         console.log("Payment Response:", res.data); // Log the response
//         setPaymentDetails(res.data);
//       } catch (error) {
//         console.error("Error fetching payment:", error);
//         setError("Failed to fetch payment details. Please try again.");
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId]);

//   return (
//     <div className="payment-details-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
//         Payment Details
//       </h1>

//       {isLoading && (
//         <div className="flex justify-center mb-4">
//           <ClipLoader size={50} color={"#1d4ed8"} loading={isLoading} />
//         </div>
//       )}

//       {error && (
//         <p className="text-center text-red-500 font-semibold">{error}</p>
//       )}

//       {paymentDetails && (
//         <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
//           <div className="grid grid-cols-3 gap-y-5 w-4/5">
//             <div>
//               <strong>Payment ID:</strong> {paymentDetails.paymentId}
//             </div>
//             <div>
//               <strong>Amount:</strong> {paymentDetails.amountValue} VND
//             </div>
//             <div>
//               <strong>Date:</strong>{" "}
//               {new Date(paymentDetails.payDate).toLocaleDateString()}
//             </div>
//             <div>
//               <strong>Order Type:</strong> {paymentDetails.orderType}
//             </div>
//             <div>
//               <strong>Email:</strong> {paymentDetails.email}
//             </div>
//             <div>
//               <strong>Username:</strong> {paymentDetails.username}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentDetailsPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams(); // Use paymentId from the URL
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch payment details when component mounts
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentId) return; // Ensure paymentId is available
      setIsLoading(true); // Start loading
      setError(null); // Clear any previous errors
      try {
        const res = await axios.get(
          `http://localhost:8080/payments/get-payments/${paymentId}`
        );
        console.log("Payment Response:", res.data); // Log the response
        setPaymentDetails(res.data);
      } catch (error) {
        console.error("Error fetching payment:", error);
        setError("Failed to fetch payment details. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  return (
    <div className="payment-details-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Payment Details
      </h1>

      {isLoading && (
        <div className="flex justify-center mb-4">
          <ClipLoader size={50} color={"#1d4ed8"} loading={isLoading} />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {paymentDetails && (
        <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
          <div className="grid grid-cols-3 gap-y-5 w-4/5">
            <div>
              <strong>Payment ID:</strong> {paymentDetails.paymentId}
            </div>
            <div>
              <strong>Amount:</strong> {paymentDetails.amountValue} VND
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(paymentDetails.payDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Order Type:</strong> {paymentDetails.orderType}
            </div>
            <div>
              <strong>Email:</strong> {paymentDetails.email}
            </div>
            <div>
              <strong>Username:</strong> {paymentDetails.username}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsPage;
