import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmAppointment,
  getAllAppointment,
  getAllAppointmentType,
} from "../../../../services/adminService";

import { toast } from "react-toastify";
import {
  clearSelectedAppointment,
  setSelectedAppointment,
} from "../../../../redux/slices/adminSlice";

import { FaArrowLeft } from "react-icons/fa6";
import AppointmentUpdateForm from "../../../../components/Private/staff/appointmentUpdateForm/AppointmentUpdateForm";
import { getVetByRole } from "../../../../services/userService";

const ListAllAppointment = () => {
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
            <th className="px-3 py-3 rounded-tr-2xl">Payment status</th>
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
                    appointment.paymentStatus === "unpaid"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {appointment.paymentStatus}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAllAppointment;
