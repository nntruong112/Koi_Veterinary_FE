import React, { useState, useEffect } from "react";
import { assets } from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";
import { getVetByRole } from "../../../../services/userService";

const availableTimes = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const VetForm = ({ updateFormData }) => {
  const dispatch = useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const vets = useSelector((state) => state.users.data?.vets?.result) || [];
  const formData = useSelector((state) => state.booking.data);

  useEffect(() => {
    const action = dispatch(getVetByRole());
    unwrapResult(action);
  }, [dispatch]);

  const handleDoctorSelect = (vet) => {
    setSelectedDoctor(vet);
    updateFormData({
      veterinarianId: vet.userId,
    });
  };

  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
    updateFormData({ startTime: time });
  };

  const handleEndTimeChange = (event) => {
    const time = event.target.value;
    setEndTime(time);
    updateFormData({ endTime: time });
  };

  const handleClearDoctorSelection = () => {
    setSelectedDoctor(null);
    updateFormData({ veterinarianId: null });
  };

  const getValidEndTimes = () => {
    return availableTimes.filter((time) => time > startTime);
  };

  return (
    <div className="flex flex-row min-h-[50vh] w-full gap-8 mt-5">
      <form className="w-3/4 mx-auto p-6 bg-white rounded-3xl shadow-lg mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">
            Choose a Veterinarian (Optional)
          </h2>

          {/* Nút Clear để hủy chọn bác sĩ */}
          <button
            onClick={handleClearDoctorSelection}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-500/90"
          >
            Clear Selection
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {vets.map((vet) => (
            <div
              key={vet.userId}
              className={`p-4 border rounded-lg shadow-lg cursor-pointer transition-all ${
                selectedDoctor?.userId === vet.userId
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => handleDoctorSelect(vet)}
            >
              <img
                src={vet.image || assets.DefaultAvatar}
                alt="Vet"
                className="w-20 h-28 rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">
                {vet.firstname} {vet.lastname}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">
            Booking Times
            {selectedDoctor
              ? ` for ${selectedDoctor.firstname} ${selectedDoctor.lastname}`
              : ""}
          </h3>

          <div className="flex items-center gap-10">
            {/* Select for Start Time */}
            <div className="mb-4">
              <label className="mr-2">Start Time:</label>
              <select
                value={startTime}
                onChange={handleStartTimeChange}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="" disabled>
                  Select Start Time
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Select for End Time */}
            <div className="mb-4">
              <label className="mr-2">End Time:</label>
              <select
                value={endTime}
                onChange={handleEndTimeChange}
                className="p-2 border border-gray-300 rounded-lg"
                disabled={!startTime}
              >
                <option value="" disabled>
                  Select End Time
                </option>
                {getValidEndTimes().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* RIGHT SIDE */}
      <form className="flex flex-col gap-5 w-1/4 h-1/2 p-5 rounded-3xl shadow-lg border-gray-200 border bg-white">
        <section>
          <h1 className="text-lg font-bold">Appointment summary</h1>
          <div className="border-2 border-gray-200 grid grid-cols-2 gap-y-4 gap-x-14 rounded-lg p-2 mt-2 w-full">
            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Date</p>
              {formData.appointmentDate || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Type</p>
              {formData.appointmentType || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Location</p>
              {formData.location || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Your fish</p>
              {formData.fish || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Vet name</p>
              {selectedDoctor
                ? `${selectedDoctor.firstname} ${selectedDoctor.lastname}`
                : "none"}
            </div>

            <div></div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">
                Start time
              </p>
              {formData.startTime || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">End time</p>
              {formData.endTime || "none"}
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-lg font-bold">Your price summary</h1>

          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center justify-between">
              <p>Price service:</p>
              <p>200,000 VND</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Moving fee:</p>
              <p>50,000 VND</p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between text-lg font-bold text-primary">
          <h1>Total price:</h1>
          <p>250,000 VND</p>
        </div>
      </form>
    </div>
  );
};

export default VetForm;
