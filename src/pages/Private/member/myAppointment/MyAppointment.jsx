import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentByUserId } from "../../../../services/userService";
import { unwrapResult } from "@reduxjs/toolkit";
import { path } from "../../../../utils/constant";
import { FaArrowLeft } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
import {
  clearSelectedAppointment,
  setSelectedAppointment,
} from "../../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { assets } from "../../../../assets/assets";

const MyAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedAppointment = useSelector(
    (state) => state.users.data.selectedAppointment
  );
  const [isOutletOpen, setIsOutletOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const appointmentList =
    useSelector((state) => state.users.data.myAppointment) || [];

  useEffect(() => {
    const appointmentListAction = dispatch(getAppointmentByUserId());
    unwrapResult(appointmentListAction);
  }, [dispatch]);

  const handleViewDetail = (appointment) => {
    dispatch(setSelectedAppointment(appointment));
    setIsOutletOpen(false);
  };

  const handleBackToList = () => {
    dispatch(clearSelectedAppointment());
    setIsOutletOpen(false);
    setIsLoading(false);
  };

  const handlePay = () => {
    setIsOutletOpen(true);
    setIsLoading(true);
    navigate(path.PAYMENT_PAGE, {
      state: { selectedAppointment: selectedAppointment },
    });
  };

  const handlePayBefore = () => {
    if (selectedAppointment.status === "Waiting") {
      toast.warn(
        "Center does not confirm your appointment. Please contact via phone number to be supported!"
      );
    } else {
      toast.warn("You cannot pay before appointment date that you booked!");
    }
  };

  const handlePayDetails = () => {
    setIsOutletOpen(true);
    setIsLoading(true);
    navigate(path.PAYMENT_DETAILS, {
      state: { selectedAppointment: selectedAppointment },
    });
  };

  const handFeedback = () => {
    setIsOutletOpen(true);
    setIsLoading(true);
    navigate(path.FEEDBACK, {
      state: { selectedAppointment: selectedAppointment },
    });
  };

  const handleCancel = () => {
    console.log("");
  };

  const today = new Date().toISOString().split("T")[0];

  const handleZaloRedirect = () => {
    window.open("https://zalo.me/0973141349", "_blank");
  };

  if (selectedAppointment) {
    return (
      <div className="p-5">
        <div className="flex items-center gap-10">
          <FaArrowLeft
            onClick={handleBackToList}
            className="text-2xl mb-2 hover:text-primary cursor-pointer"
          />
          <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
        </div>

        <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg  text-lg bg-white">
          <div className="grid grid-cols-3 gap-y-5 w-4/5">
            <p>
              <strong>Date: </strong> {selectedAppointment.appointmentDate}
            </p>
            <p>
              <strong>Service: </strong>
              {selectedAppointment.appointmentType?.appointmentService}
            </p>
            <p>
              <strong>Location: </strong> {selectedAppointment.location}
            </p>
            <p>
              <strong>Start Time: </strong> {selectedAppointment.startTime}
            </p>
            <p>
              <strong>End Time: </strong> {selectedAppointment.endTime}
            </p>
            <p>
              <strong>Status: </strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Veterinarian: </strong>
              {`${selectedAppointment.veterinarian?.firstname} ${selectedAppointment.veterinarian?.lastname}`}
            </p>
            <p>
              <strong>Fish:</strong> {selectedAppointment.fish?.species}
            </p>
            <p>
              <strong>Payment status: </strong>
              {selectedAppointment?.paymentStatus}
            </p>

            {selectedAppointment.location === "Online" &&
            selectedAppointment.appointmentDate === today &&
            selectedAppointment.paymentStatus !== "paid" ? (
              <p className="text-red-600">
                Please pay before starting consultant
              </p>
            ) : selectedAppointment.location !== "Online" ? (
              ""
            ) : (
              "Please click zalo for starting consultant"
            )}
          </div>

          {selectedAppointment.paymentStatus !== "Unpaid" &&
          selectedAppointment.location === "Online" ? (
            <div className="flex flex-col w-1/5">
              <button
                onClick={handleZaloRedirect}
                className="flex items-center justify-center gap-4 rounded-lg border-2 border-gray-200 mt-4 mr-4 px-4 py-2 hover:bg-gray-100"
              >
                <img src={assets.zalo_icon} alt="Zalo" className="w-8 h-8" />
                Consultant
              </button>

              <button
                onClick={handFeedback}
                className="mt-4 mr-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
              >
                {isLoading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={isLoading} />
                ) : (
                  "Feedback"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-1/5">
              {selectedAppointment.appointmentDate === today &&
              selectedAppointment.status !== "Waiting" ? (
                <button
                  onClick={handlePay}
                  className="mt-4 mr-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
                >
                  {isLoading ? (
                    <ClipLoader
                      size={20}
                      color={"#ffffff"}
                      loading={isLoading}
                    />
                  ) : (
                    "Pay"
                  )}
                </button>
              ) : selectedAppointment.paymentStatus === "paid" ? (
                ""
              ) : (
                <div className="flex flex-col items-center">
                  <button
                    onClick={handlePayBefore}
                    className="w-full mt-4 mr-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
                  >
                    Pay
                  </button>

                  <button className="w-full mt-4 mr-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-600/80">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isOutletOpen && <Outlet />}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-2xl p-5">
      <table className="w-full text-base text-left bg-white text-gray-500 dark:text-gray-400 overflow-y-scroll shadow-lg rounded-2xl table-auto">
        <thead className="text-sm text-gray-700 uppercase dark:text-gray-400 border-b bg-gray-200">
          <tr>
            <th className="px-3 py-3 rounded-tl-2xl">Date</th>
            <th className="px-3 py-3">Service</th>
            <th className="px-3 py-3">Location</th>
            <th className="px-3 py-3">Start time</th>
            <th className="px-3 py-3">End time</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Payment status</th>
            <th className="px-3 py-3 rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((appointment) => (
            <tr
              key={appointment.appointmentId}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-3 py-4 whitespace-normal">
                {appointment.appointmentDate}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment?.appointmentType?.appointmentService}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.location}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.startTime}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.endTime}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.status}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                <p
                  className={`w-16 rounded-full text-white p-2 text-sm text-center ml-5 ${
                    appointment.paymentStatus === "Unpaid"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {appointment.paymentStatus}
                </p>
              </td>

              <td className="px-3 py-4 whitespace-normal">
                <button
                  onClick={() => handleViewDetail(appointment)}
                  className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                >
                  View detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointment;
