import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmAppointment,
  getAllAppointment,
} from "../../../../services/adminService";

import { toast } from "react-toastify";

const BookingConfirm = () => {
  const dispatch = useDispatch();
  const appointmentList =
    useSelector((state) => state.admin.data?.appointmentList) || [];

  useEffect(() => {
    dispatch(getAllAppointment());
  }, [dispatch]);

  // Hàm sắp xếp cuộc hẹn theo appointmentDate
  const sortedAppointmentList = [...appointmentList].sort((a, b) => {
    const isActionAvailableA =
      a.status === "Waiting" || a.status === "Approved";
    const isActionAvailableB =
      b.status === "Waiting" || b.status === "Approved";

    if (isActionAvailableA && !isActionAvailableB) return -1;
    if (!isActionAvailableA && isActionAvailableB) return 1;

    return 0;
  });

  const handleConfirm = async (appointment) => {
    const updateData = {
      appointmentDate: appointment.appointmentDate,
      appointmentTypeId: appointment.appointmentTypeId,
      location: appointment.location,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      paymentStatus: appointment.paymentStatus,
      status: "Approved",
    };

    try {
      await dispatch(
        confirmAppointment({
          appointmentId: appointment.appointmentId,
          updateData: updateData,
        })
      );

      toast.success("Confirm successfully");

      dispatch(getAllAppointment());
    } catch (error) {
      console.log("Error while updating", error);
      toast.error("Confirm fail!");
    }
  };

  const handleSendToVet = async (appointment) => {
    const updateData = {
      appointmentDate: appointment.appointmentDate,
      appointmentTypeId: appointment.appointmentTypeId,
      location: appointment.location,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      paymentStatus: appointment.paymentStatus,
      status: "In service",
    };

    try {
      await dispatch(
        confirmAppointment({
          appointmentId: appointment.appointmentId,
          updateData: updateData,
        })
      );

      toast.success("Send this appointment successfully");

      dispatch(getAllAppointment());
    } catch (error) {
      console.log("Error while updating", error);
      toast.error("Send to vet fail!");
    }
  };

  return (
    <div className="relative overflow-x-auto rounded-2xl p-5">
      <table className="w-full text-base text-left bg-white text-gray-500 dark:text-gray-400 overflow-y-scroll shadow-lg rounded-2xl table-auto">
        <thead className="text-sm text-gray-700 uppercase dark:text-gray-400 border-b bg-gray-200">
          <tr>
            <th className="px-3 py-3 rounded-tl-2xl">Date</th>
            <th className="px-3 py-3">Service</th>
            <th className="px-3 py-3">Vet's name</th>
            <th className="px-3 py-3">Location</th>
            <th className="px-3 py-3">Start time</th>
            <th className="px-3 py-3">End time</th>
            <th className="px-3 py-3">Customer name</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Payment status</th>
            <th className="px-3 py-3 rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedAppointmentList.map((appointment) => (
            <tr
              key={appointment.appointmentId}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-3 py-4 whitespace-normal">
                {appointment.appointmentDate}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.appointmentType?.appointmentService}
              </td>
              <td className="px-3 py-4 whitespace-normal">{`${appointment.veterinarian.firstname} ${appointment.veterinarian.lastname}`}</td>
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
                {`${appointment.customer?.firstname} ${appointment.customer?.lastname}`}
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
                {appointment.status === "Approved" ? (
                  <button
                    onClick={() => handleSendToVet(appointment)}
                    className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                  >
                    Send to vet
                  </button>
                ) : appointment.status === "In service" ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleConfirm(appointment)}
                    className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingConfirm;
