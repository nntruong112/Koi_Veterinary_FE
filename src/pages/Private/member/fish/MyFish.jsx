import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { deleteMyFish, getMyFish } from "../../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { unwrapResult } from "@reduxjs/toolkit";
import DeleteFishModal from "../../../../components/Private/modal/DeleteFishModal";
import { RxUpdate } from "react-icons/rx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { setFishUpdateData } from "../../../../redux/slices/userSlice";

const MyFish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fishList = useSelector((state) => state.users.data?.myFish) || [];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFishId, setSelectedFishId] = useState(null);
  const [isOpenMenuUpdate, setOpenMenuUpdate] = useState(false);

  // Set up trạng thái cho trang
  const [currentPage, setCurrentPage] = useState(1);
  const [fishPerPage] = useState(6);

  useEffect(() => {
    const myFish = dispatch(getMyFish());
    unwrapResult(myFish);
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.updated) {
      const myFish = dispatch(getMyFish());
      unwrapResult(myFish);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [dispatch, location.state, navigate, location.pathname]);

  const handleDeleteClick = (fishId) => {
    setSelectedFishId(fishId);
    setShowDeleteModal(true);
  };

  const handleUpdateClick = (fish) => {
    const fishUpdateData = {
      species: fish.species,
      age: fish.age,
      size: fish.size,
      weight: fish.weight,
      image: fish.image,
      gender: fish.gender,
      color: fish.color,
      customerId: fish.customer.userId,
      fishId: fish.fishId,
    };
    dispatch(setFishUpdateData(fishUpdateData));
    navigate(path.UPDATE_FISH);
  };

  // Xác nhận delete
  const handleConfirmDelete = () => {
    if (selectedFishId) {
      const deleteAction = dispatch(deleteMyFish(selectedFishId));
      unwrapResult(deleteAction);
      setShowDeleteModal(false);
      setSelectedFishId(null);
    }
  };

  // Hủy delete
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedFishId(null);
  };

  // Tính toán số trang và vị trí trang
  const indexOfLastFish = currentPage * fishPerPage;
  const indexOfFirstFish = indexOfLastFish - fishPerPage;
  const currentFishList = fishList.slice(indexOfFirstFish, indexOfLastFish);
  const totalPages = Math.ceil(fishList.length / fishPerPage);

  return (
    <div
      className={`flex ${
        isOpenMenuUpdate ? "items-center justify-between gap-5" : ""
      }`}
    >
      {!isOpenMenuUpdate && (
        <div className="pr-10 w-full">
          <div className="grid grid-cols-3 gap-10 py-10">
            {currentFishList.map((fish) => (
              <div
                key={fish.fishId}
                className="flex flex-col items-start border rounded-lg p-4 bg-gray-200 shadow-lg"
              >
                <img
                  src={fish.image || assets.KoiPool}
                  alt="Fish"
                  className="w-full h-40 object-contain"
                />
                <p className="mt-4 font-semibold text-gray-700">
                  Species: {fish.species}
                </p>
                <p className="text-gray-700">Age: {fish.age}</p>
                <p className="text-gray-600">Size: {fish.size}</p>
                <p className="text-gray-600">Weight: {fish.weight}</p>
                <p className="text-gray-700">Gender: {fish.gender}</p>
                <p className="text-gray-600">Color: {fish.color}</p>

                <div className="flex items-center gap-5">
                  <button
                    onClick={() => handleUpdateClick(fish)}
                    className="mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white rounded-full p-2"
                  >
                    Update
                    <RxUpdate />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(fish.fishId)}
                    className="mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-500/80 text-white rounded-full p-2"
                  >
                    Delete
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination buttons */}
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

          {/* Delete confirmation modal */}
          {showDeleteModal && (
            <DeleteFishModal
              message="Do you want to delete this fish?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default MyFish;
