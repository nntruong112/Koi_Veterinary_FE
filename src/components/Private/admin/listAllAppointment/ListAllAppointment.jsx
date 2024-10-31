import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointment } from "../../../../services/adminService";
import { FaArrowLeft } from "react-icons/fa6";

const ListAllAppointment = () => {
  const dispatch = useDispatch();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointmentList =
    useSelector((state) => state.admin.data.appointmentList) || [];

  useEffect(() => {
    dispatch(getAllAppointment());
  }, [dispatch]);

  const handleViewDetail = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleBackToList = () => {
    setSelectedAppointment(null);
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

        <div className="w-full border rounded-xl p-5 shadow-lg  text-lg">
          <div className="grid grid-cols-3 gap-y-5 gap-x-10">
            <p>
              <strong>Date: </strong> {selectedAppointment.appointmentDate}
            </p>
            <p>
              <strong>Service: </strong>
              {selectedAppointment.appointmentType.appointmentService}
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
              <strong>Fish: </strong> {selectedAppointment.fish?.species}
            </p>
            <p>
              <strong>Payment status: </strong>
              {selectedAppointment.paymentStatus}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-2xl p-5">
      <table className="w-full text-base text-left text-gray-500 dark:text-gray-400 overflow-y-scroll shadow-lg rounded-2xl table-auto">
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
                {appointment.appointmentType?.appointmentService}
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
                    appointment.paymentStatus === "unpaid"
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

export default ListAllAppointment;
