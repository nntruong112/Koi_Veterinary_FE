import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoByToken,
  updateInfoById,
} from "../../../../services/userService";
import SuccessModal from "../../../../components/Private/modal/SuccessModal";
import { unwrapResult } from "@reduxjs/toolkit";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.data?.result);
  const image = useSelector((state) => state.users.data?.result);
  console.log(image);

  const [isEdit, setIsEdit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State cho modal
  const [uploading, setUploading] = useState(false);

  // Lưu thông tin người dùng vào form
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

  // Cập nhật dữ liệu khi userInfo thay đổi
  useEffect(() => {
    if (userInfo) {
      setFormData({
        lastname: userInfo.lastname || "",
        firstname: userInfo.firstname || "",
        username: userInfo.username || "",
        gender: userInfo.gender || "",
        dateOfBirth: userInfo.dateOfBirth || "",
        name: userInfo.name || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        phone: userInfo.phone || "",
        image: userInfo.image || "",
      });
    }
  }, [userInfo]);

  const handleEditClick = () => {
    setIsEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const imageRef = ref(storage, `profileImages/${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      console.log(url);

      // Chỉ cần lưu URL vào trạng thái mà không gọi updateInfoById ở đây
      setFormData((prevData) => ({
        ...prevData,
        image: url,
      }));

      setUploading(false);
      return url; // Trả về URL
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  // Gửi dữ liệu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = userInfo?.userId; // Lấy id người dùng từ userInfo

      const updatedInfo = await dispatch(
        updateInfoById({ userId, updateData: formData })
      );
      const result = unwrapResult(updatedInfo);

      if (result) {
        const newInfo = await dispatch(getInfoByToken());

        unwrapResult(newInfo);

        setShowSuccessModal(true); // Hiện thị modal thành công

        setTimeout(() => {
          setShowSuccessModal(false); // Ẩn modal
          setIsEdit(false); // Đóng chế độ chỉnh sửa
        }, 1000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full gap-8 mt-5">
      <form className="flex flex-col justify-between items-center gap-6 p-8 rounded-3xl shadow-lg w-1/4 h-72 border-gray-200 border">
        <p className="text-2xl font-bold">
          {formData?.lastname}
          {formData?.firstname}
        </p>

        <img
          src={formData.image || assets.KoiPool}
          className="w-28 h-28 rounded-full"
          alt="Profile"
        />

        {/* Image upload button */}
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const url = await handleImageUpload(file);
              setFormData({ ...formData, image: url });
            }
          }}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => document.getElementById("image-upload-input").click()}
          className="bg-primary text-white font-semibold p-2 hover:bg-primary/80"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Photo"}
        </button>
      </form>

      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-3xl shadow-lg border-gray-200 border"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Update profile */}
          {isEdit ? (
            <>
              <div className="mb-4">
                <label className="block text-xl font-medium">Last name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
            </>
          ) : (
            // View profile
            <>
              <div className="mb-4">
                <label className="block text-xl font-medium">Last name</label>
                <p className="text-lg font-semibold">{formData?.lastname}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">First Name</label>
                <p className="text-lg font-semibold">{formData?.firstname}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Username</label>
                <p className="text-lg font-semibold">{formData?.username}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Gender</label>
                <p className="text-lg font-semibold">{formData?.gender}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">
                  Date of Birth
                </label>
                <p className="text-lg font-semibold">{formData?.dateOfBirth}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Email</label>
                <p className="text-lg font-semibold">{formData?.email}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Address</label>
                <p className="text-lg font-semibold">{formData?.address}</p>
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Phone</label>
                <p className="text-lg font-semibold">{formData?.phone}</p>
              </div>
            </>
          )}
        </div>

        {/* Nút chỉnh sửa hoặc lưu */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={isEdit ? handleSubmit : handleEditClick}
            className="bg-primary text-white font-semibold p-2 w-28 hover:bg-primary/80 mt-6"
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </form>

      {/* Hiển thị modal khi đăng nhập thành công */}
      {showSuccessModal && (
        <SuccessModal
          message="Update successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default MyProfile;
