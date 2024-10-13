import React from "react";
import { assets } from "../../../assets/assets";
import { useSelector } from "react-redux";

const AppointmentBooking = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-6">
        <img
          src={assets.Vet1}
          alt="Doctor"
          className="w-36 h-36 rounded-lg object-cover bg-blue-500"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            Dr. Richard James <span className="text-blue-600">✔️</span>
          </h2>
          <p className="text-gray-600">MBBS - General physician</p>
          <p className="text-gray-500 mt-1">4 Years</p>
          <p className="mt-4">
            <span className="font-semibold">About</span>
            <span className="ml-2 cursor-pointer text-gray-400">ℹ️</span>
          </p>
          <p className="text-gray-500 mt-2">
            Dr. Davis has a strong commitment to delivering comprehensive
            medical care, focusing on preventive medicine, early diagnosis, and
            effective treatment strategies. Dr. Davis has a strong commitment to
            delivering comprehensive medical care, focusing on preventive
            medicine, early diagnosis, and effective treatment strategies.
          </p>
          <p className="mt-4 font-semibold">Appointment fee: $50</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Booking slots</h3>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white">
            SUN 13
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300">
            MON 14
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300">
            TUE 15
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300">
            WED 16
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300">
            THU 17
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300">
            FRI 18
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
