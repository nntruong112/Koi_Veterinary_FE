import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../inputForm.jsx/TextInput";

const InfoForm = ({ updateFormData }) => {
  // Lấy danh sách cá từ Redux store
  const fishList = useSelector((state) => state.users.data?.myFish);

  // Trạng thái để lưu ID cá được chọn
  const [selectedFishId, setSelectedFishId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFishSelect = (fishId) => {
    setSelectedFishId(fishId); // Cập nhật ID cá được chọn
    updateFormData({ fishId }); // Cập nhật thông tin cá trong form
  };

  return (
    <div className="flex flex-row min-h-[50vh] w-full gap-8 mt-5">
      <form className="w-full h-1/2 p-10 rounded-3xl shadow-lg border-gray-200 border mb-4">
        <TextInput
          label="Appointment Date"
          name="appointmentDate"
          type="date"
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="block text-xl font-medium mb-3">
            Appointment Type
          </label>
          <select
            name="appointmentType"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option selected disabled>
              Select Appointment Type
            </option>
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xl font-medium mb-3">Location</label>
          <select
            name="location"
            onChange={handleChange}
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

        <div className="mb-4">
          <label className="block text-xl font-medium mb-3">Select Fish</label>
          <div className="grid grid-cols-6 gap-2 mt-2">
            {fishList && fishList.length > 0 ? (
              fishList.map((fish) => (
                <div
                  key={fish.fishId}
                  className={`flex flex-col items-center cursor-pointer ${
                    selectedFishId === fish.fishId
                      ? "border-2 border-blue-500 rounded-lg"
                      : ""
                  }`}
                  onClick={() => handleFishSelect(fish.fishId)}
                >
                  <img
                    src={fish.image} // Đường dẫn tới hình ảnh cá từ Firestore
                    alt={fish.species}
                    className="w-36 h-52 object-cover mb-2 pt-3"
                  />
                  <span>{fish.species}</span>
                </div>
              ))
            ) : (
              <p>No fish available</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
