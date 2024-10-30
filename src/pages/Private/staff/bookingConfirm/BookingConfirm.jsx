import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmAppointment,
  getAllAppointment,
} from "../../../../services/adminService";

import { toast } from "react-toastify";
import {
  clearSelectedAppointment,
  setSelectedAppointment,
} from "../../../../redux/slices/adminSlice";
import TextInput from "../../../../components/Private/member/inputForm.jsx/TextInput";
import { FaArrowLeft } from "react-icons/fa6";

const BookingConfirm = () => {
  const dispatch = useDispatch();

  const appointmentList =
    useSelector((state) => state.admin.data?.appointmentList) || [];

  const selectedAppointment = useSelector(
    (state) => state.admin.data?.selectedAppointment
  );

  const updateFormData = useState({});

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

  const handleViewDetail = (appointment) => {
    dispatch(setSelectedAppointment(appointment));
  };

  const handleBackToList = () => {
    dispatch(clearSelectedAppointment());
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = {
      appointmentDate: selectedAppointment.appointmentDate,
      appointmentTypeId: selectedAppointment.appointmentTypeId,
      location: selectedAppointment.location,
      startTime: selectedAppointment.startTime,
      endTime: selectedAppointment.endTime,
      paymentStatus: selectedAppointment.paymentStatus,
      status: selectedAppointment.status,
    };

    try {
      await dispatch(
        confirmAppointment({
          appointmentId: selectedAppointment.appointmentId,
          updateData: updateData,
        })
      );

      toast.success("Send this appointment successfully");
    } catch (error) {
      console.log("Error while updating", error);
      toast.error("Update failed!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAppointment({ ...selectedAppointment, [name]: value });
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

        <div className="flex flex-row min-h-screen w-full gap-8 p-8">
          <form
            onSubmit={handleUpdate}
            className="w-full h-1/2 p-10 rounded-3xl shadow-lg border-gray-200 border bg-white"
          >
            <div className="flex flex-col gap-4">
              <TextInput
                label="Appointment Date"
                name="appointmentDate"
                type="date"
                value={selectedAppointment.appointmentDate}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="bg-primary text-white font-semibold p-2 w-28 hover:bg-primary/80 mt-6"
              >
                Save
              </button>
            </div>
          </form>
        </div>
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
              <td className="px-3 py-4 whitespace-normal flex items-center gap-2">
                {appointment.status === "Approved" ? (
                  <button
                    onClick={() => handleSendToVet(appointment)}
                    className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                  >
                    Send to vet
                  </button>
                ) : appointment.status !== "Approved" &&
                  appointment.status !== "Waiting" ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleConfirm(appointment)}
                    className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                  >
                    Confirm
                  </button>
                )}

                {/* <button
                  onClick={() => handleUpdate(appointment)}
                  className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                >
                  Update
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingConfirm;
