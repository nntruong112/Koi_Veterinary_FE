import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { resetBookingData } from "../../../../redux/slices/bookingSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { bookingAppointment } from "../../../../services/bookingService";
import { useNavigate } from "react-router-dom";
import { path } from "../../../../utils/constant";

const ConfirmForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingData = useSelector((state) => state.booking.data.bookingData);
  const userId = useSelector((state) => state.users.data.result.userId);
  const invoiceData = useSelector((state) => state.booking.data.invoiceData);

  // Hàm định dạng giá tiền với dấu phẩy và đơn vị VND
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "0 ₫";
  };

  const handleSubmit = async () => {
    const appointmentData = {
      customerId: userId,
      appointmentDate: bookingData.appointmentDate,
      appointmentTypeId: bookingData.appointmentTypeId,
      location: bookingData.location,
      veterinarianId: bookingData.veterinarianId,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      fishId: bookingData.fishId,
      status: "Waiting",
      paymentStatus: "unpaid",
    };

    try {
      // Tạo lịch hẹn
      await dispatch(bookingAppointment(appointmentData));

      // Reset booking data sau khi hoàn thành
      dispatch(resetBookingData());

      navigate(path.BOOKING);

      toast.success("Booking successfully!");
    } catch (error) {
      console.error("Error while requesting: ", error);
      toast.error(error.response?.data?.message || "Booking unsuccessfully!");
    }
  };

  return (
    <div className="flex flex-row min-h-[50vh] w-full gap-8 mt-5">
      <form className="w-3/4 h-1/2 mx-auto p-6 bg-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <p className="mt-1 text-gray-900">
              {bookingData?.appointmentDate || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Type
            </label>
            <p className="mt-1 text-gray-900">
              {bookingData.appointmentService || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Location
            </label>
            <p className="mt-1 text-gray-900">
              {bookingData.location || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Veterinarian name
            </label>
            <p className="mt-1 text-gray-900">{bookingData.veterinarianName}</p>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Start time
            </label>
            <p className="mt-1 text-gray-900">
              {bookingData.startTime || "N/A"}
            </p>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              End time
            </label>
            <p className="mt-1 text-gray-900">{bookingData.endTime || "N/A"}</p>
          </div>
        </div>
      </form>

      {/* RIGHT SIDE */}
      <form className="flex flex-col gap-5 w-1/4 h-1/2 p-6 rounded-3xl shadow-lg border-gray-200 border bg-white">
        <h1 className="text-2xl font-semibold mb-4">Your price summary</h1>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p>Price service:</p>
            <p>{formatPrice(invoiceData.price)}</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Moving fee:</p>
            <p>{formatPrice(invoiceData.movingPrice)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-lg font-bold text-primary">
          <h1>Total price:</h1>
          <p>{formatPrice(invoiceData.total)}</p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
        >
          Request to book
        </button>
      </form>
    </div>
  );
};

export default ConfirmForm;
