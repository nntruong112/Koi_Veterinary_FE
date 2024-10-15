import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../../firebase/firebaseConfig";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { path } from "../../../../utils/constant";
import { toast } from "react-toastify";
import { updateFishInfo } from "../../../../services/userService";
import { clearFishUpdateData } from "../../../../redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const UpdateFish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fishUpdateData = useSelector(
    (state) => state.users.data.fishUpdateData
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const [fishInfo, setFishInfo] = useState({
    species: fishUpdateData.species,
    age: fishUpdateData.age,
    size: fishUpdateData.size,
    weight: fishUpdateData.weight,
    gender: fishUpdateData.gender,
    color: fishUpdateData.color,
    image: fishUpdateData.image,
    customerId: fishUpdateData.customerId,
  });

  useEffect(() => {
    if (fishUpdateData) {
      setFishInfo({
        species: fishUpdateData.species,
        age: fishUpdateData.age,
        size: fishUpdateData.size,
        weight: fishUpdateData.weight,
        gender: fishUpdateData.gender,
        color: fishUpdateData.color,
        image: fishUpdateData.image,
        customerId: fishUpdateData.customerId,
      });
    }
  }, [fishUpdateData]);

  // Lấy giá trị trong từng ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishInfo({ ...fishInfo, [name]: value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleCloseClick = () => {
    navigate(`${path.MEMBER}/${path.FISH}`);
  };

  const handleUpdateFish = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (selectedImage) {
      const imageRef = ref(storage, `fishImages/${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
      imageUrl = await getDownloadURL(imageRef);
    }

    // Thêm userId và imageUrl vào fishInfo trước khi gửi yêu cầu
    const fishData = {
      ...fishInfo,
      age: Number(fishInfo.age),
      size: Number(fishInfo.size),
      weight: Number(fishInfo.weight),
      image: imageUrl || fishUpdateData.image,
    };

    try {
      const updateAction = await dispatch(
        updateFishInfo({ fishId: fishUpdateData.fishId, updateData: fishData })
      );

      unwrapResult(updateAction);

      await dispatch(clearFishUpdateData);

      setFishInfo({
        species: "",
        age: "",
        size: "",
        weight: "",
        gender: "",
        color: "",
        image: "",
      });

      setSelectedImage(null);

      toast.success("Update successfully");

      navigate(`${path.MEMBER}/${path.FISH}`, { state: { updated: true } });
    } catch (error) {
      console.log("Error while adding: ", error);
      toast.error("Update fail!");
    }
  };

  // Các field của cá
  const fields = [
    { label: "Species", name: "species", type: "text" },
    { label: "Age", name: "age", type: "text" },
    { label: "Size", name: "size", type: "text" },
    { label: "Weight", name: "weight", type: "text" },
    { label: "Gender", name: "gender", type: "text" },
    { label: "Color", name: "color", type: "text" },
    { label: "Image", name: "image", type: "file" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen w-[35%] gap-4">
      <form
        onSubmit={handleUpdateFish}
        className="w-full h-full px-10 py-4  shadow-lg border-gray-200 border"
      >
        <div className="flex justify-end">
          <button
            onClick={handleCloseClick}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-2 "
          >
            <AiOutlineClose />
          </button>
        </div>

        <p className="text-3xl font-bold mb-5 text-center">Update Fish Info</p>

        <div className="flex flex-col gap-4">
          {fields.map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-lg font-medium text-gray-700 mb-1">
                {label}
              </label>
              {type === "file" ? (
                <input
                  type={type}
                  name={name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Select ${label.toLowerCase()}`}
                  onChange={handleImageSelect}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  onChange={handleChange}
                  value={fishInfo[name]}
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Update Fish
        </button>
      </form>
    </div>
  );
};

export default UpdateFish;
