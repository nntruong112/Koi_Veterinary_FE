import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { getMyFish } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { PiSelectionAllFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";

const MyFish = () => {
  const dispatch = useDispatch();
  const fishList = useSelector((state) => state.users.data?.myFish) || []; // Lấy danh sách cá từ Redux store
  const [selectedFishIds, setSelectedFishIds] = useState([]); // Mảng để lưu ID cá đã chọn
  const [selectAll, setSelectAll] = useState(false); // Trạng thái cho nút select all

  useEffect(() => {
    dispatch(getMyFish());
  }, [dispatch]);

  // Hàm để xử lý chọn cá
  const handleFishSelect = (fishId) => {
    setSelectedFishIds((prevSelected) => {
      if (prevSelected.includes(fishId)) {
        return prevSelected.filter((id) => id !== fishId); // Bỏ chọn nếu đã chọn
      }
      return [...prevSelected, fishId]; // Thêm vào danh sách đã chọn
    });
  };

  // Hàm để xử lý chọn tất cả cá
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFishIds([]); // Bỏ chọn tất cả
    } else {
      setSelectedFishIds(fishList.map((fish) => fish.fishId)); // Chọn tất cả
    }

    setSelectAll(!selectAll); // Đảo ngược trạng thái selectAll
  };

  // Hàm để xử lý xóa cá đã chọn
  const handleDeleteSelected = () => {
    // TODO: Xử lý xóa cá đã chọn ở đây
    console.log("Delete fish IDs:", selectedFishIds);
  };

  return (
    <div>
      <div className="flex items-center justify-end gap-5 p-4 border-b-2">
        <button
          onClick={handleSelectAll}
          className={`flex items-center gap-2 bg-primary hover:bg-primary/80 rounded-full p-3 ${
            selectAll ? "text-white" : "text-white"
          }`}
        >
          {selectAll ? "Cancel" : "Select All"}
          <PiSelectionAllFill />
        </button>
        <button
          onClick={handleDeleteSelected}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white rounded-full p-3"
        >
          Delete Selected Fish
          <MdDelete />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-10 py-10">
        {fishList.map((fish) => (
          <div
            key={fish.fishId} // Sử dụng fishId của cá làm key
            className={`flex flex-col items-start border rounded-lg p-4 bg-gray-200 shadow-lg ${
              selectedFishIds.includes(fish.fishId) ? "border-blue-500" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedFishIds.includes(fish.fishId)}
              onChange={() => handleFishSelect(fish.fishId)}
              className="mb-2"
            />
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
