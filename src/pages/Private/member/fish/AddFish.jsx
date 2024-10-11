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
  });

  // Lấy giá trị trong từng ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddFish = async (e) => {
    e.preventDefault();

    // Thêm userId vào fishInfo trước khi gửi yêu cầu
    const fishData = {
      ...fishInfo,
      age: Number(fishInfo.age),
      customerId: userId,
      size: Number(fishInfo.size),
      weight: Number(fishInfo.weight),
    };

    try {
      await dispatch(addNewFish(fishData));
      setFishInfo({
        species: "",
        age: "",
        size: "",
        weight: "",
        gender: "",
        color: "",
      });
      toast.success("Added successfully");
    } catch (error) {
      console.log("Error while adding: ", error);
      toast.error("Added fail!");
    }
  };

  // Các field của cá
  const fields = [
    { label: "Species", name: "species", type: "text", required: true },
    { label: "Age", name: "age", type: "text" },
    { label: "Size", name: "size", type: "text" },
    { label: "Weight", name: "weight", type: "text" },
    { label: "Gender", name: "gender", type: "text" },
    { label: "Color", name: "color", type: "text" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-4">
      <p className="text-3xl font-bold mt-4">Add your a new fish</p>

      <form
        onSubmit={handleAddFish}
        className="w-full h-full p-10 rounded-3xl shadow-lg border-gray-200 border"
      >
        <div className="flex flex-col gap-4">
          {fields.map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${label.toLowerCase()}`}
                onChange={handleChange}
                value={fishInfo[name]}
                required={required}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Fish
        </button>
      </form>
    </div>
  );
};

export default AddFish;
