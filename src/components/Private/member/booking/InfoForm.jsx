import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../inputForm.jsx/TextInput";
import { getMyFish } from "../../../../services/userService";
import { getAllAppointmentType } from "../../../../services/adminService";
import { updateInvoiceData } from "../../../../redux/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { toast } from "react-toastify";

const InfoForm = ({ updateFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fishList = useSelector((state) => state.users.data?.myFish) || [];
  const typeList = useSelector((state) => state.admin.data?.typeList) || [];
  const [selectedFishId, setSelectedFishId] = useState(null);
  const formData = useSelector((state) => state.booking.data.bookingData);
  const invoiceData = useSelector((state) => state.booking.data.invoiceData);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    dispatch(getAllAppointmentType());
    dispatch(getMyFish());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu là trường ngày và ngày không được ở quá khứ
    if (name === "appointmentDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Đặt giờ của ngày hiện tại về 0 để so sánh

      if (selectedDate < today) {
        toast.error("Appointment date cannot be in the past.");
        updateFormData({ [name]: "" }); // Reset giá trị nếu ngày không hợp lệ
        return;
      }
    }

    updateFormData({ [name]: value });
  };

  const handleFishSelect = (fishId) => {
    setSelectedFishId(fishId);
    updateFormData({ fishId });
  };

  const handleTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    const selectedType = typeList.find(
      (type) => type.appointmentTypeId === selectedTypeId
    );

    updateFormData({
      appointmentService: selectedType.appointmentService,
      appointmentTypeId: selectedTypeId,
    });

    dispatch(updateInvoiceData({ price: selectedType.price }));
  };

  // Hàm định dạng giá tiền với dấu phẩy và đơn vị VND
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "0 ₫";
  };

  const handleDistanceChange = (e) => {
    const newDistance = e.target.value;
    setDistance(newDistance);

    // Calculate the moving fee based on the new distance
    const movingFee = calculatePriceByDistance(newDistance);

    // Update the invoice data with the moving fee
    dispatch(updateInvoiceData({ movingFee, newDistance }));
  };

  const calculatePriceByDistance = (distance) => {
    const pricePerKm = 5000;
    return pricePerKm * distance;
  };

  useEffect(() => {
    const servicePrice = invoiceData?.price || 0;
    const movingFee = invoiceData?.movingFee || 0;
    const total = servicePrice + movingFee;
    dispatch(updateInvoiceData({ total }));
  }, [invoiceData?.price, invoiceData?.movingFee, dispatch]);

  const handleClearSelection = () => {
    updateFormData({
      appointmentDate: null,
      appointmentService: null,
      appointmentTypeId: null,
      location: null,
      fishId: null,
      distance: 0,
    });

    setSelectedFishId(null);
    setDistance(0);

    dispatch(
      updateInvoiceData({
        price: 0,
        movingFee: 0,
        total: 0,
      })
    );
  };

  return (
    <div className="flex flex-row min-h-[50vh] w-full gap-8 mt-5">
      <form className="w-3/4 h-1/2 p-10 rounded-3xl shadow-lg border-gray-200 border bg-white">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleClearSelection}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-500/90"
          >
            Clear Selection
          </button>
        </div>

        <TextInput
          label="Appointment Date"
          name="appointmentDate"
          type="date"
          value={formData.appointmentDate || ""}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="block text-lg font-medium mb-3">
            Appointment Type
          </label>
          <select
            name="appointmentType"
            onChange={handleTypeChange}
            value={formData.appointmentTypeId}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option selected disabled>
              Select Appointment Type
            </option>
            {typeList.map((type) => (
              <option
                key={type.appointmentTypeId}
                value={type.appointmentTypeId}
              >
                {type.appointmentService || ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-3">Location</label>
          <select
            name="location"
            onChange={handleChange}
            value={formData.location}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option selected disabled>
              Select Location
            </option>
            <option value="Online">Online</option>
            <option value="Home">At Home</option>
            <option value="Center">At Center</option>
          </select>
        </div>

        {formData.location === "Home" && (
          <div className="mb-4">
            <TextInput
              label="Distance (km)"
              name="distance"
              type="number"
              value={invoiceData.newDistance || distance}
              onChange={handleDistanceChange}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-medium mb-3">Select Fish</label>
          <div className="grid grid-cols-6 gap-5 mt-2">
            {fishList && fishList.length > 0 ? (
              fishList.map((fish) => (
                <div
                  key={fish.fishId}
                  className={`flex flex-col items-center cursor-pointer border-2 rounded-lg ${
                    selectedFishId === fish.fishId
                      ? "border-2 border-blue-500 rounded-lg"
                      : ""
                  }`}
                  onClick={() => handleFishSelect(fish.fishId)}
                >
                  <img
                    src={fish.image}
                    alt={fish.species}
                    className="w-24 h-20 object-contain pt-2"
                  />
                  <span>{fish.species}</span>
                </div>
              ))
            ) : (
              <div>
                <p>No fish available</p>
                <button
                  onClick={() => navigate(`${path.MEMBER}/${path.ADD_FISH}`)}
                  className="hover:text-primary underline"
                >
                  Click here to add
                </button>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* RIGHT SIDE */}
      <form className="flex flex-col gap-5 w-1/4 h-1/2 p-5 rounded-3xl shadow-lg border-gray-200 border bg-white">
        <section>
          <h1 className="text-lg font-bold">Appointment summary</h1>
          <div className="border-2 border-gray-200 grid grid-cols-2 gap-4 rounded-lg p-2 mt-2 w-full">
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

export default InfoForm;
