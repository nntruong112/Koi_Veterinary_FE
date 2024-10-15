import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { getMyFish } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { PiSelectionAllFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { unwrapResult } from "@reduxjs/toolkit";

const MyFish = () => {
  const dispatch = useDispatch();
  const fishList = useSelector((state) => state.users.data?.myFish) || []; // Lấy danh sách cá từ Redux store
  const [selectedFishIds, setSelectedFishIds] = useState([]); // Mảng để lưu ID cá đã chọn
  const [selectAll, setSelectAll] = useState(false); // Trạng thái cho nút select all

  // Thêm trạng thái cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [fishPerPage] = useState(6); // Số lượng cá mỗi trang

  useEffect(() => {
    const myFish = dispatch(getMyFish());

    unwrapResult(myFish);
  }, [dispatch]);

  // Hàm để xử lý chọn cá
  const handleFishSelect = (fishId) => {
    setSelectedFishIds((prevSelected) => {
      if (prevSelected.includes(fishId)) {
        return prevSelected.filter((id) => id !== fishId);
      }
      return [...prevSelected, fishId];
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
    console.log("Delete fish IDs:", selectedFishIds);
  };

  // Tính toán chỉ số cá hiển thị trên trang
  const indexOfLastFish = currentPage * fishPerPage;
  const indexOfFirstFish = indexOfLastFish - fishPerPage;
  const currentFishList = fishList.slice(indexOfFirstFish, indexOfLastFish); // Lấy danh sách cá theo trang

  // Tính số lượng trang
  const totalPages = Math.ceil(fishList.length / fishPerPage);

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
        {currentFishList.map((fish) => (
          <div
            key={fish.fishId}
            className={`flex flex-col items-start border rounded-lg p-4 bg-gray-200 shadow-lg ${
              selectedFishIds.includes(fish.fishId) ? "border-primary" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedFishIds.includes(fish.fishId)}
              onChange={() => handleFishSelect(fish.fishId)}
              className="mb-2"
            />
            <img
              src={fish.image || assets.KoiPool}
              alt="Fish"
              className="w-full h-40 object-contain"
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

      {/* Các nút phân trang */}
      <div className="flex justify-center items-center gap-4 py-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 gap-1 text-lg font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <FaLongArrowAltLeft />
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 h-8 gap-1 text-lg font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default MyFish;
