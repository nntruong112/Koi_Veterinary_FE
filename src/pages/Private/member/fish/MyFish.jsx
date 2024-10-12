import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { getMyFish } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import * as status from "../../../../utils/status";

const MyFish = () => {
  const dispatch = useDispatch();
  const fishList = useSelector((state) => state.users.data?.myFish) || []; // Lấy danh sách cá từ Redux store

  useEffect(() => {
    // Fetch fish data when the component loads
    const fetchFishData = async () => {
      try {
        await dispatch(getMyFish()); // Gọi API để lấy danh sách cá
      } catch (error) {
        console.error("Failed to fetch fish data:", error);
      }
    };
    fetchFishData();
  }, [dispatch]);

  return (
    <div>
      <button className="bg-red-500 hover:bg-red-600">Delete Fish</button>
      <button>Delete All Fish</button>
      <div className="grid grid-cols-3 gap-10 py-10">
        {fishList.map((fish, index) => (
          <div
            key={index}
            className="flex flex-col items-start border rounded-lg p-4 bg-gray-200 shadow-lg"
          >
            <img
              src={assets.KoiPool}
              alt="Fish"
              className="w-full h-40 object-cover"
            />
            <p className="mt-4 font-semibold text-gray-700">
              Species: {fish.species}
            </p>
            <p className="mt-4 text-gray-700">Age: {fish.age}</p>
            <p className="text-gray-600">Size: {fish.size}</p>
            <p className="text-gray-600">Weight: {fish.weight}</p>
            <p className="text-gray-700">Gender: {fish.gender}</p>
            <p className="text-gray-600">Color: {fish.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFish;
