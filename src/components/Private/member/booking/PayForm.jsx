import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Thêm useSelector
import { updateInvoiceData } from "../../../../redux/slices/bookingSlice";
import { createPayment } from "../../../../services/bookingService";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

const PayForm = ({ updateFormData }) => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const formData = useSelector((state) => state.booking.data.bookingData);
  const invoiceData = useSelector((state) => state.booking.data.invoiceData);

  const handlePaymentChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);

    dispatch(updateInvoiceData({ paymentMethod: selectedPaymentMethod }));
  };

  // Hàm định dạng giá tiền với dấu phẩy và đơn vị VND
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "0 ₫";
  };

  return (
    <div className="flex flex-row min-h-[50vh] w-full gap-8 mt-5">
      {/* LEFT SIDE */}
      <form className="w-3/4 h-1/2 mx-auto p-6 bg-white rounded-3xl shadow-lg mb-4">
        <h1 className="text-xl font-bold mb-4">Choose Payment Method</h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Select payment method:
          </label>
          <select
            value={invoiceData.paymentMethod || ""}
            onChange={handlePaymentChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Select Payment Method --
            </option>
            <option value="cash">Cash Payment</option>
            <option value="vn_pay">VN Pay</option>
          </select>
        </div>

        {paymentMethod === "cash" && (
          <div className="text-lg font-medium text-gray-700">
            <p>
              You have selected <strong>Cash Payment</strong>.
            </p>
            <p>Please pay at the time of appointment.</p>
          </div>
        )}

        {paymentMethod === "vn_pay" && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Bank Transfer Information
            </h2>
            <p className="text-gray-700">
              Please transfer the amount to the following account:
            </p>
            <ul className="mt-2 text-gray-700">
              <li>
                <strong>Bank:</strong> VN Bank
              </li>
              <li>
                <strong>Account Name:</strong> Your Company Name
              </li>
              <li>
                <strong>Account Number:</strong> 123456789
              </li>
              <li>
                <strong>Branch:</strong> Hanoi Branch
              </li>
            </ul>
            <p className="mt-2 text-gray-600">
              Once the transfer is complete, please send us the payment
              confirmation.
            </p>
          </div>
        )}
      </form>

      {/* RIGHT SIDE */}
      <form className="flex flex-col gap-5 w-1/4 h-1/2 p-5 rounded-3xl shadow-lg border-gray-200 border bg-white">
        <section>
          <h1 className="text-lg font-bold">Appointment summary</h1>
          <div className="border-2 border-gray-200 grid grid-cols-2 gap-y-4 gap-x-14 rounded-lg p-2 mt-2 w-full">
            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Date</p>
              {formData.appointmentDate || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Type</p>
              {formData.appointmentService || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Location</p>
              {formData.location || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Vet name</p>
              {formData.veterinarianName || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">
                Start time
              </p>
              {formData.startTime || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">End time</p>
              {formData.endTime || "none"}
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-lg font-bold">Your price summary</h1>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center justify-between">
              <p>Price service:</p>
              <p>{formatPrice(invoiceData.price)}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Moving fee:</p>
              <p>{formatPrice(invoiceData.movingFee)}</p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between text-lg font-bold text-primary">
          <h1>Total price:</h1>
          <p>{formatPrice(invoiceData.total)}</p>
        </div>
      </form>
    </div>
  );
};

export default PayForm;
