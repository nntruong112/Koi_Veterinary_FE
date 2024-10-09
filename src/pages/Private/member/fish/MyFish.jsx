import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { getMyFish } from "../../../../services/userService";
import { useDispatch } from "react-redux";

const MyFish = () => {
  const dispatch = useDispatch();
  const [fishList, setFishList] = useState([]);

  useEffect(() => {
    // Fetch fish data when the component loads
    const fetchFishData = async () => {
      try {
        const response = await dispatch(getMyFish());
        setFishList(response.payload);
      } catch (error) {
        console.error("Failed to fetch fish data:", error);
      }
    };
    fetchFishData();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-10 py-10">
      {fishList.map((fish, index) => (
        <div
          key={index}
          className="flex flex-col items-center border rounded-lg p-4 bg-gray-200 shadow-lg"
        >
          <img
            src={assets.KoiPool}
            alt="Fish"
            className="w-full h-40 object-cover"
          />
          <p className="mt-4 font-semibold text-gray-700">
            Species: {fish.species}
          </p>
          <p className="text-gray-600">Age: {fish.age}</p>
        </div>
      ))}
    </div>
  );
};

export default MyFish;
