// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";

// const PaymentDetailsPage = () => {
//   const { paymentId } = useParams(); // Use paymentId from the URL
//   const navigate = useNavigate(); // Initialize useNavigate for redirection
//   const location = useLocation(); // Use useLocation to access the URL
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); // State for success message

//   // State for query parameters
//   const [queryParams, setQueryParams] = useState({});

//   // Function to parse query parameters
//   const parseQueryParams = () => {
//     const params = new URLSearchParams(location.search);
//     const paramsObject = {};
//     for (const [key, value] of params.entries()) {
//       paramsObject[key] = value;
//     }
//     return paramsObject;
//   };

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
//         setSuccessMessage("Payment processed successfully!"); // Set success message
//       } catch (error) {
//         console.error("Error fetching payment:", error);
//         setError("Failed to fetch payment details. Please try again.");
//       } finally {
//         setIsLoading(false); // Stop loading
//       }
//     };

//     // Parse query parameters and update state
//     const params = parseQueryParams();
//     setQueryParams(params);

//     fetchPaymentDetails();
//   }, [paymentId, location.search]);

//   // Handle redirection if paymentDetails are not found or error exists
//   useEffect(() => {
//     if (error) {
//       console.error(error); // Log the error for debugging
//     }
//   }, [error]);

//   // Extract payment data either from paymentDetails or queryParams
//   const displayData = {
//     paymentId: paymentDetails
//       ? paymentDetails.paymentId
//       : queryParams.vnp_TxnRef || "N/A",
//     amountValue: paymentDetails
//       ? paymentDetails.amountValue
//       : queryParams.vnp_Amount || "N/A",
//     payDate: paymentDetails
//       ? new Date(paymentDetails.payDate).toLocaleDateString()
//       : queryParams.vnp_PayDate
//       ? new Date(queryParams.vnp_PayDate).toLocaleDateString()
//       : "N/A",
//     orderType: paymentDetails
//       ? paymentDetails.orderType
//       : queryParams.vnp_OrderInfo
//       ? queryParams.vnp_OrderInfo.split("|")[4]
//       : "N/A",
//     email: paymentDetails
//       ? paymentDetails.email
//       : queryParams.vnp_OrderInfo
//       ? queryParams.vnp_OrderInfo.split("|")[2]
//       : "N/A",
//     username: paymentDetails
//       ? paymentDetails.username
//       : queryParams.vnp_OrderInfo
//       ? queryParams.vnp_OrderInfo.split("|")[1]
//       : "N/A",
//   };

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

//       {successMessage && (
//         <p className="text-center text-green-500 font-semibold">
//           {successMessage}
//         </p>
//       )}

//       {error && (
//         <p className="text-center text-red-500 font-semibold">{error}</p>
//       )}

//       <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
//         <div className="grid grid-cols-3 gap-y-5 w-4/5">
//           <div>
//             <strong>Payment ID:</strong> {displayData.paymentId}
//           </div>
//           <div>
//             <strong>Amount:</strong> {displayData.amountValue} VND
//           </div>
//           <div>
//             <strong>Date:</strong> {displayData.payDate}
//           </div>
//           <div>
//             <strong>Order Type:</strong> {displayData.orderType}
//           </div>
//           <div>
//             <strong>Email:</strong> {displayData.email}
//           </div>
//           <div>
//             <strong>Username:</strong> {displayData.username}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetailsPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams(); // Use paymentId from the URL
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const location = useLocation(); // Use useLocation to access the URL
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [queryParams, setQueryParams] = useState({}); // Initialize state for query parameters
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Function to parse query parameters
  const parseQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const paramsObject = {};
    for (const [key, value] of params.entries()) {
      paramsObject[key] = value;
    }
    return paramsObject;
  };

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
        setSuccessMessage("Payment processed successfully!"); // Set success message
      } catch (error) {
        console.error("Error fetching payment:", error);
        setError("Failed to fetch payment details. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    // Parse query parameters and update state
    const params = parseQueryParams();
    setQueryParams(params); // Now this line will work

    fetchPaymentDetails();
  }, [paymentId, location.search]); // No need to include parseQueryParams here

  // Handle redirection if paymentDetails are not found or error exists
  useEffect(() => {
    if (error) {
      console.error(error); // Log the error for debugging
    }
  }, [error]);

  // Extract payment data either from paymentDetails or queryParams
  const displayData = {
    paymentId: paymentDetails
      ? paymentDetails.paymentId || "N/A"
      : queryParams.vnp_TxnRef || "N/A",
    amountValue: paymentDetails
      ? paymentDetails.amountValue || "N/A"
      : queryParams.vnp_Amount || "N/A",
    payDate: paymentDetails
      ? new Date(paymentDetails.payDate).toLocaleDateString() || "N/A"
      : queryParams.vnp_PayDate
      ? new Date(queryParams.vnp_PayDate).toLocaleDateString()
      : "N/A",
    orderType: paymentDetails
      ? paymentDetails.orderType || "N/A"
      : queryParams.vnp_OrderInfo
      ? queryParams.vnp_OrderInfo.split("|")[4]
      : "N/A",
    email: paymentDetails
      ? paymentDetails.email || "N/A"
      : queryParams.vnp_OrderInfo
      ? queryParams.vnp_OrderInfo.split("|")[2]
      : "N/A",
    username: paymentDetails
      ? paymentDetails.username || "N/A"
      : queryParams.vnp_OrderInfo
      ? queryParams.vnp_OrderInfo.split("|")[1]
      : "N/A",
  };

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

      {successMessage && (
        <p className="text-center text-green-500 font-semibold">
          {successMessage}
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
        <div className="grid grid-cols-3 gap-y-5 w-4/5">
          <div>
            <strong>Payment ID:</strong> {displayData.paymentId}
          </div>
          <div>
            <strong>Amount:</strong> {displayData.amountValue} VND
          </div>
          <div>
            <strong>Date:</strong> {displayData.payDate}
          </div>
          <div>
            <strong>Order Type:</strong> {displayData.orderType}
          </div>
          <div>
            <strong>Email:</strong> {displayData.email}
          </div>
          <div>
            <strong>Username:</strong> {displayData.username}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
