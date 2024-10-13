import React, { useState, useEffect } from "react";
import axios from "axios";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appointments");
        setAppointments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handlePay = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:8080/appointments/${appointmentId}`, {
        status: "Paid",
      });
      alert("Payment Successful");
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/${appointmentId}`);
      setAppointments(
        appointments.filter((app) => app.appointmentId !== appointmentId)
      );
      alert("Appointment Canceled");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p className="pb-3 mt-12 font-medium border-b">My Appointments</p>
      <div>
        {appointments.map((item) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap py-2 border-b"
            key={item.appointmentId}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.image || "defaultImageURL"}
                alt="Vet"
              />
            </div>
            <div className="flex-1 text-sm text-gray-400">
              <p>
                <strong>Appointment ID:</strong> {item.appointmentId}
              </p>
              <p>
                <strong>Date:</strong> {item.appointmentDate}
              </p>
              <p>
                <strong>Type:</strong> {item.appointmentType}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>
                <strong>Start Time:</strong> {item.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {item.endTime}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Customer:</strong> {item.userInfo?.username}
              </p>
              <p>
                <strong>Veterinarian:</strong> {item.veterinarian?.name}
              </p>
              <p>
                <strong>Fish:</strong> {item.fish?.species}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <button
                className="text-sm text-center sm:min-w-48 py-2 border hover:bg-blue-500 transition-all duration-300"
                onClick={() => handlePay(item.appointmentId)}
              >
                Pay
              </button>
              <button
                className="text-sm text-center sm:min-w-48 py-2 border hover:bg-red-500 transition-all duration-300"
                onClick={() => handleCancel(item.appointmentId)}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
