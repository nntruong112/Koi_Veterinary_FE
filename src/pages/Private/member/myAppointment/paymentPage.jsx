import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const { appointmentId } = useParams(); // Get appointmentId from URL
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/${appointmentId}`
        );
        setAppointment(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [appointmentId]);

  const handleConfirmPayment = () => {
    // Simulate payment confirmation, this is where payment gateway logic could be integrated
    alert("Payment confirmed! Thank you for your payment.");
  };

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Payment for Appointment</h2>
      {appointment && (
        <div className="mb-6">
          <p>
            <strong>Appointment Date:</strong> {appointment.appointmentDate}
          </p>
          <p>
            <strong>Type:</strong> {appointment.appointmentType}
          </p>
          <p>
            <strong>Status:</strong> {appointment.status}
          </p>
          <p>
            <strong>Veterinarian:</strong> {appointment.veterinarian?.name}
          </p>
          <p>
            <strong>Location:</strong> {appointment.location}
          </p>
          <p>
            <strong>Amount Due:</strong> $50 {/* Hardcoded for now */}
          </p>
        </div>
      )}

      <button
        onClick={handleConfirmPayment}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentPage;
