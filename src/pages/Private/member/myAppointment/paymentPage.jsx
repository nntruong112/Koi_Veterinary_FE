import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentP = location.state?.selectedAppointment;
  const appointmentId = appointmentP.appointmentId;

  const [paymentResponse, setPaymentResponse] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        setPaymentResponse(res.data);
        // Lưu paymentId vào localStorage
        localStorage.setItem("paymentId", res.data.paymentId);
        setPaymentUrl(res.data.paymentUrl);

        // setPaymentUrl(`${res.data.paymentUrl}?paymentId=${res.data.paymentId}`);
      } catch (error) {
        console.error("Error creating payment:", error);
        setPaymentResponse({ message: "Error creating payment" });
      } finally {
        setIsLoading(false);
      }
    };

    createPayment();
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
    </div>
  );
};

export default PaymentPage;
