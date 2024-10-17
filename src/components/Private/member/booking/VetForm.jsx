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

  // Lấy danh sách bác sĩ từ Redux state
  const vets = useSelector((state) => state.users.data?.vets?.result) || [];

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

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    updateFormData({ startTime: time }); // Cập nhật dữ liệu lên cha
  };

  // const handleEndTimeChange = (time) => {
  //   setEndTime(time);
  //   updateFormData({ endTime: time }); // Cập nhật dữ liệu lên cha
  // };
  const handleEndTimeChange = (time) => {
    if (time === startTime) {
      alert("End time cannot be the same as start time!");
      return;
    }
    setEndTime(time);
    updateFormData({ endTime: time }); // Cập nhật dữ liệu lên cha
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-3xl shadow-lg mb-4">
      <h2 className="text-2xl font-semibold mb-4">Choose a Veterinarian</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-40 h-52 rounded-lg object-cover"
            />
            <h3 className="text-lg font-semibold">
              {vet.firstname} {vet.lastname}
            </h3>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Booking Times for {selectedDoctor.firstname}{" "}
            {selectedDoctor.lastname}
          </h3>
          <div className="flex flex-wrap mb-4">
            <span className="mr-2">Start Time:</span>
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleStartTimeChange(time)}
                className={`m-1 py-2 px-4 rounded-full border ${
                  startTime === time
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 text-gray-700"
                } hover:bg-blue-400 hover:text-white transition-colors`}
              >
                {time}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap mb-4">
            <span className="mr-2">End Time:</span>
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleEndTimeChange(time)}
                className={`m-1 py-2 px-4 rounded-full border ${
                  endTime === time
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 text-gray-700"
                } hover:bg-blue-400 hover:text-white transition-colors`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VetForm;
