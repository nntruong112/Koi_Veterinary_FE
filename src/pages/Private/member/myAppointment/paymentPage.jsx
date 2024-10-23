import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentP = location.state?.selectedAppointment;
  const appointmentId = appointmentP?.appointmentId;

  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null); // State to store payment details
  const userId = useSelector((state) => state.users.data?.result?.userId);

  // Automatically create payment when component mounts
  useEffect(() => {
    const createPayment = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:8080/payments/create-payment",
          {
            appointmentId,
            userId,
          }
        );

        if (res.data && res.data.paymentUrl) {
          setPaymentResponse(res.data);
          localStorage.setItem("paymentId", res.data.paymentId); // Store paymentId
          setPaymentUrl(res.data.paymentUrl); // Set payment URL
        } else {
          throw new Error("Invalid payment response");
        }
      } catch (error) {
        console.error("Error creating payment:", error);
        setError("Error creating payment: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    createPayment();
  }, [appointmentId, userId]);

  // Handle VNPay redirect and check payment status
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const responseCode = params.get("vnp_ResponseCode");
    const paymentId = params.get("vnp_TxnRef"); // Get payment ID from the URL params

    if (responseCode === "00" && paymentId) {
      // Fetch payment details using the get-payments API
      axios
        .get(`http://localhost:8080/payments/get-payments/${paymentId}`)
        .then((res) => {
          setPaymentDetails(res.data); // Save payment details to state
        })
        .catch((err) => {
          setError("Failed to fetch payment details");
          console.error(err);
        });
    } else if (responseCode) {
      setError("Payment failed or canceled");
    }
  }, [navigate]);

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

      {paymentResponse && (
        <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg text-lg">
          <div className="grid grid-cols-3 gap-y-5 w-3/5">
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

      {/* Display Payment Details after successful payment */}
      {paymentDetails && (
        <div className="mt-10 p-6 bg-gray-100 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
          <div className="grid grid-cols-2 gap-4 text-lg">
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

export default PaymentPage;
