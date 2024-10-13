import React from "react";
import { useSelector } from "react-redux";

const ConfirmForm = () => {
  const bookingData = useSelector((state) => state.booking.data);
  const vets = useSelector((state) => state.users.data?.vets?.result);

  // Kiểm tra nếu vetId có trong bookingData
  const selectedVet =
    bookingData.veterinarianId && vets
      ? vets.find((vet) => vet.userId === bookingData.veterinarianId)
      : null;

  return (
    <div className="w-full p-10 rounded-3xl shadow-lg border-gray-200 border bg-white mb-4">
      <h2 className="text-2xl font-semibold mb-6">
        Confirm Appointment Information
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Appointment Date
          </label>
          <p className="mt-1 text-gray-900">
            {bookingData.appointmentDate || "N/A"}
          </p>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Appointment Type
          </label>
          <p className="mt-1 text-gray-900">
            {bookingData.appointmentType || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Location
          </label>
          <p className="mt-1 text-gray-900">{bookingData.location || "N/A"}</p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Veterinarian Name
          </label>
          <p className="mt-1 text-gray-900">
            {selectedVet ? selectedVet.lastname : "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Start Time
          </label>
          <p className="mt-1 text-gray-900">{bookingData.startTime || "N/A"}</p>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            End Time
          </label>
          <p className="mt-1 text-gray-900">{bookingData.endTime || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmForm;
