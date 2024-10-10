import React, { useState } from "react";
import { addNewFish } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddFish = () => {
  const dispatch = useDispatch();

  // Lấy userId từ Redux store
  const userId = useSelector((state) => state.users.data?.result?.userId);

  const [fishInfo, setFishInfo] = useState({
    species: "",
    age: "",
    size: "",
    weight: "",
    gender: "",
    color: "",
    // image: "",
  });

  //lay gia tri trong tung o input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFishInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddFish = async (e) => {
    e.preventDefault();

    // Thêm userId vào fishInfo trước khi gửi yêu cầu
    const fishData = {
      ...fishInfo,
      age: Number(fishInfo.age),
      customerId: userId,
      size: Number(fishInfo.age),
      weight: Number(fishInfo.age),
    };

    try {
      await dispatch(addNewFish(fishData));
      setFishInfo(fishInfo); // Reset form sau khi thêm thành công
      toast.success("Added successfully");
    } catch (error) {
      toast.error("Added fail!");
    }
  };

  return (
    <div className="mt-10">
      <form className="space-y-6" onSubmit={handleAddFish}>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Species
          </label>
          <input
            type="text"
            name="species"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter species"
            onChange={handleChange}
            value={fishInfo.species}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="text"
            name="age"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter age"
            onChange={handleChange}
            value={fishInfo.age}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Size
          </label>
          <input
            type="text"
            name="size"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter age"
            onChange={handleChange}
            value={fishInfo.size}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Weight
          </label>
          <input
            type="text"
            name="weight"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter age"
            onChange={handleChange}
            value={fishInfo.weight}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter age"
            onChange={handleChange}
            value={fishInfo.gender}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Color
          </label>
          <input
            type="text"
            name="color"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter age"
            onChange={handleChange}
            value={fishInfo.color}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Fish
        </button>
      </form>
    </div>
  );
};

export default AddFish;
