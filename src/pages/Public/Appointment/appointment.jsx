import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Appointment = () => {
  const { vet } = useContext(AppContext);
  return (
    <>
      <Navbar />
      <div>
        <p className="pb-3 mt-12 font-medium border-b">
          My Appointments
          <div>
            {vet.slice(0, 4).map((item, index) => (
              <div
                className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap py-2 border-b"
                key={index}
              >
                <div>
                  <img className="w-32 bg-indigo-50 " src={item.image} />
                </div>
                <div className="flex-1 text-sm text-gray-400">
                  <p className="text-neutral-800 font-semibold">{item.name}</p>
                  <p className="text-neutral-800 font-medium">Address</p>
                  <p className="text-xs">{item.address.line1}</p>
                  <p className="text-xs mt-1">Date & Time:</p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 justify-end">
                  <button className="text-sm text-center sm:min-w-48 py-2 border hover:bg-blue-500 transition-all duration-300 ">
                    Pay
                  </button>
                  <button className="text-sm text-center sm:min-w-48 py-2 border hover:bg-red-500 transition-all duration-300 ">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Appointment;
