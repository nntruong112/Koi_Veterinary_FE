import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmAppointment,
  getAllAppointment,
  getAllAppointmentType,
  getAllSchedule,
} from "../../../../services/adminService";

import { toast } from "react-toastify";
import {
  clearSelectedAppointment,
  setSelectedAppointment,
} from "../../../../redux/slices/adminSlice";

import { FaArrowLeft } from "react-icons/fa6";
import AppointmentUpdateForm from "../../../../components/Private/staff/appointmentUpdateForm/AppointmentUpdateForm";
import { getVetByRole } from "../../../../services/userService";

const BookingConfirm = () => {
  const dispatch = useDispatch();

  const appointmentList =
    useSelector((state) => state.admin.data?.appointmentList) || [];

  const selectedAppointment = useSelector(
    (state) => state.admin.data?.selectedAppointment
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllAppointment());
      await dispatch(getAllAppointmentType());
      await dispatch(getVetByRole());
    };

    fetchData();
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

  const handleViewDetail = (appointment) => {
    dispatch(setSelectedAppointment(appointment));
  };

  const handleBackToList = () => {
    dispatch(clearSelectedAppointment());
  };

  const handleConfirm = async (appointment) => {
    const updateData = {
      appointmentDate: appointment.appointmentDate,
      appointmentTypeId: appointment.appointmentType.appointmentTypeId,
      location: appointment.location,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      paymentStatus: appointment.paymentStatus,
      customerId: appointment.customer.userId,
      veterinarianId: appointment.veterinarian.userId,
      fishId: appointment.fish.fishId,
      status: "Approved",
    };

    console.log(updateData);

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
      appointmentTypeId: appointment.appointmentType.appointmentTypeId,
      location: appointment.location,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      paymentStatus: appointment.paymentStatus,
      customerId: appointment.customer.userId,
      veterinarianId: appointment.veterinarian.userId,
      fishId: appointment.fish.fishId,
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
        <AppointmentUpdateForm onBackToList={handleBackToList} />
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
              onClick={() => handleViewDetail(appointment)}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100"
            >
              <td className="px-3 py-4 whitespace-normal">
                {appointment.appointmentDate}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.appointmentType.appointmentService}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {`${appointment.veterinarian.firstname} ${appointment.veterinarian.lastname}`}
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
                {`${appointment.customer.firstname} ${appointment.customer.lastname}`}
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
              <td className="px-3 py-4 whitespace-normal flex items-center gap-2">
                {appointment.status === "Approved" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện lan truyền
                      handleSendToVet(appointment);
                    }}
                    className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                  >
                    Send to vet
                  </button>
                ) : appointment.status !== "Approved" &&
                  appointment.status !== "Waiting" ? (
                  ""
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện lan truyền
                      handleConfirm(appointment);
                    }}
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
