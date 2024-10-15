import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoByToken,
  updateInfoById,
} from "../../../../services/userService";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import TextInput from "../../../../components/Private/member/inputForm.jsx/TextInput";
import { assets } from "../../../../assets/assets";

const VetProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.data?.result);

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    lastname: userInfo?.lastname || "",
    firstname: userInfo?.firstname || "",
    username: userInfo?.username || "",
    gender: userInfo?.gender || "",
    dateOfBirth: userInfo?.dateOfBirth || "",
    email: userInfo?.email || "",
    address: userInfo?.address || "",
    phone: userInfo?.phone || "",
    image: userInfo?.image || "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        lastname: userInfo.lastname || "",
        firstname: userInfo.firstname || "",
        username: userInfo.username || "",
        gender: userInfo.gender || "",
        dateOfBirth: userInfo.dateOfBirth || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        phone: userInfo.phone || "",
        image: userInfo.image || "",
      });
    }
  }, [userInfo]);

  const handleEditClick = () => setIsEdit((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      if (selectedImage) {
        const imageRef = ref(storage, `vetProfileImages/${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updatedInfo = await dispatch(
        updateInfoById({
          ...formData,
          image: imageUrl,
        })
      );

      unwrapResult(updatedInfo);

      if (updateInfoById) {
        const newInfo = await dispatch(getInfoByToken());

        unwrapResult(newInfo);

        toast.success("Update successfully");

        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error while updating: ", error);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-full gap-8 mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full h-1/2 p-10 rounded-3xl shadow-lg border-gray-200 border"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : formData?.image || assets.DefaultAvatar
              }
              className="w-28 h-28 rounded-full border-black border"
              alt="Profile"
            />
            <p className="text-2xl font-semibold"> {formData.username} </p>
            {isEdit && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="mt-2"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <TextInput
              label="Last name"
              name="lastname"
              value={formData.lastname}
              disabled={!isEdit}
              onChange={handleChange}
            />
            <TextInput
              label="First name"
              name="firstname"
              value={formData.firstname}
              disabled={!isEdit}
              onChange={handleChange}
            />
          </div>

          <label className="block text-xl font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEdit}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option selected value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            disabled={!isEdit}
            onChange={handleChange}
          />
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            disabled={!isEdit}
            onChange={handleChange}
          />
          <TextInput
            label="Address"
            name="address"
            value={formData.address}
            disabled={!isEdit}
            onChange={handleChange}
          />
          <TextInput
            label="Phone"
            name="phone"
            value={formData.phone}
            disabled={!isEdit}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={isEdit ? handleSubmit : handleEditClick}
            className="bg-primary text-white font-semibold p-2 w-28 hover:bg-primary/80 mt-6"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VetProfile;
