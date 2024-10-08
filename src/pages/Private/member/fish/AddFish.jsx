import React, { useState } from "react";
import { addNewFish } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";

const AddFish = () => {
  const dispatch = useDispatch();

  // Lấy userId từ Redux store
  const userId = useSelector((state) => state.users.data?.result?.userId);

  const token = useSelector((state) => state.auth.data?.token);

  const [fishInfo, setFishInfo] = useState({
    species: "",
    age: "",
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
      userId: userId, // Gán userId vào fishData
    };

    console.log(fishData);

    try {
      await dispatch(addNewFish({ fishData, token }));
      setFishInfo({ species: "", age: "" }); // Reset form sau khi thêm thành công
    } catch (error) {
      const responseError = error?.response?.data;
      alert(responseError);
    }
  };

  return (
    <div className="mt-10">
      <form className="space-y-6" onSubmit={handleAddFish}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
