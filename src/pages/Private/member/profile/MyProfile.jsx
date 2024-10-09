import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { updateInfoById } from "../../../../services/userService";
import SuccessModal from "../../../../components/Private/modal/SuccessModal";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.data?.result);

  const [isEdit, setIsEdit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State cho modal

  // Lưu thông tin người dùng vào form
  const [formData, setFormData] = useState({
    lastname: userInfo?.lastname || "",
    firstname: userInfo?.firstname || "",
    username: userInfo?.username || "",
    gender: userInfo?.gender || "",
    dob: userInfo?.dob || "",
    email: userInfo?.email || "",
    address: userInfo?.address || "",
    phone: userInfo?.phone || "",
  });

  // Cập nhật dữ liệu khi userInfo thay đổi
  useEffect(() => {
    if (userInfo) {
      setFormData({
        lastname: userInfo.lastname || "",
        firstname: userInfo.firstname || "",
        username: userInfo.username || "",
        // gender: userInfo.gender || "",
        dob: userInfo.dob || "",
        name: userInfo.name || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  const handleEditClick = () => {
    setIsEdit((prev) => !prev); // Chuyển đổi trạng thái
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi dữ liệu cập nhật lên server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = userInfo?.id; // Lấy id người dùng từ userInfo

      await dispatch(updateInfoById({ userId, updateData: formData })); // Gọi hàm update

      setShowSuccessModal(true); // Hiện thị modal thành công

      setTimeout(() => {
        setShowSuccessModal(false); // Ẩn modal
        setIsEdit(false); // Đóng chế độ chỉnh sửa
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full gap-8 mt-5">
      <form className="flex flex-col justify-between items-center gap-6 p-8 rounded-3xl shadow-lg w-1/4 h-72 border-gray-200 border">
        <p className="text-2xl font-bold">
          {userInfo?.lastname}
          {userInfo?.firstname}
        </p>
        <img src={assets.KoiPool} className="w-28 h-28 rounded-full" />
        <button className="bg-primary text-white font-semibold p-2 hover:bg-primary/80">
          Upload Photo
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
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Gender</label>
                <input
                  type="text"
                  name="gender"
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
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
                  className="border p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xl font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  className="border p-2 w-full"
                />
              </div>
            </>
          ) : (
            // View profile
            <>
              <div className="mb-4">
                <label className="block text-xl font-medium">Last name</label>
                <p className="text-lg font-semibold">{formData.lastname}</p>
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
                <p className="text-lg font-semibold">{formData?.dob}</p>
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
