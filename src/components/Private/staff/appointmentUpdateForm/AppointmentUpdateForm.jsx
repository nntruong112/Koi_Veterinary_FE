// AppointmentUpdateForm.js
import React, { useState } from "react";
import TextInput from "../../../../components/Private/member/inputForm.jsx/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmAppointment,
  getAllAppointment,
} from "../../../../services/adminService";
import { toast } from "react-toastify";

const availableTimes = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const AppointmentUpdateForm = ({ onBackToList }) => {
  const dispatch = useDispatch();

  const typeList = useSelector((state) => state.admin.data?.typeList) || [];

  const vets = useSelector((state) => state.users.data.vets?.result);

  const selectedAppointment = useSelector(
    (state) => state.admin.data?.selectedAppointment
  );

  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: selectedAppointment.appointmentDate,
    appointmentTypeId: selectedAppointment.appointmentType.appointmentTypeId,
    status: selectedAppointment.status,
    location: selectedAppointment.location,
    startTime: selectedAppointment.startTime,
    endTime: selectedAppointment.endTime,
    paymentStatus: selectedAppointment.paymentStatus,
    veterinarianId: selectedAppointment.veterinarian.userId,
    customerId: selectedAppointment.customer.userId,
    fishId: selectedAppointment.fish.fishId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Chỉ lấy giờ kết thúc hợp lệ
  const getValidEndTimes = () => {
    return availableTimes.filter((time) => time > appointmentData.startTime);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        confirmAppointment({
          appointmentId: selectedAppointment.appointmentId,
          updateData: appointmentData,
        })
      );

      toast.success("Update appointment successfully");

      onBackToList();

      await dispatch(getAllAppointment());
    } catch (error) {
      console.log("Error while updating", error);
      toast.error("Update failed!");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="w-full h-1/2 p-10 rounded-3xl shadow-lg border-gray-200 border bg-white"
    >
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-2xl">Customer information</p>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Last name"
            name="lastname"
            type="text"
            disabled
            value={selectedAppointment.customer.lastname}
            onChange={handleChange}
          />

          <TextInput
            label="First name"
            name="firstname"
            type="text"
            disabled
            value={selectedAppointment.customer.firstname}
            onChange={handleChange}
          />

          <TextInput
            label="Email"
            name="email"
            type="email"
            disabled
            value={selectedAppointment.customer.email}
            onChange={handleChange}
          />

          <TextInput
            label="Phone"
            name="phone"
            type="tel"
            disabled
            value={selectedAppointment.customer.phone}
            onChange={handleChange}
          />

          <TextInput
            label="Address"
            name="address"
            type="text"
            disabled
            value={selectedAppointment.customer.address}
            onChange={handleChange}
          />
        </div>

        <p className="font-semibold text-2xl">Appointment information</p>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Appointment Date"
            name="appointmentDate"
            type="date"
            value={appointmentData.appointmentDate}
            onChange={handleChange}
          />

          <div>
            <label className="block text-lg font-medium mb-3">
              Appointment Type
            </label>
            <select
              name="appointmentTypeId"
              onChange={handleChange}
              value={appointmentData.appointmentTypeId}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Appointment Type
              </option>
              {typeList.map((type) => (
                <option
                  key={type.appointmentTypeId}
                  value={type.appointmentTypeId}
                >
                  {type.appointmentService}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">Location</label>
            <select
              name="location"
              onChange={handleChange}
              value={appointmentData.location}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Online">Online</option>
              <option value="Home">At Home</option>
              <option value="Center">At Center</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">
              Veterinarian
            </label>
            <select
              name="veterinarianId"
              onChange={handleChange}
              value={appointmentData.veterinarianId}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Vet
              </option>
              {vets.map((vet) => (
                <option key={vet.userId} value={vet.userId}>
                  {vet.username} ({vet.firstname} {vet.lastname})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={appointmentData.status}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select status
              </option>

              <option value="Waiting">Waiting</option>
              <option value="Approved">Approved</option>
              <option value="In Service">In service</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-3">
              Payment status
            </label>
            <select
              name="paymentStatus"
              onChange={handleChange}
              value={appointmentData.paymentStatus}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select payment status
              </option>

              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          {/* Select for Start Time */}
          <div>
            <label className="block text-lg font-medium mb-3">Start time</label>
            <select
              name="startTime"
              value={appointmentData.startTime}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
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
          <div>
            <label className="block text-lg font-medium mb-3">End time</label>
            <select
              name="endTime"
              value={appointmentData.endTime}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
              disabled={!appointmentData.startTime}
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

        <button
          type="submit"
          className="bg-primary text-white font-semibold p-2 w-28 hover:bg-primary/80 mt-6"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AppointmentUpdateForm;
