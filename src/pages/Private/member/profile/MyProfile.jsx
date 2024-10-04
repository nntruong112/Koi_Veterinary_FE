import React from "react";
import { assets } from "../../../../assets/assets";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const userInfo = useSelector((state) => state.users.data.result);
  console.log(userInfo);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
      <form className="p-8 rounded-3xl shadow-lg w-[80vw]">
        {/* User image */}
        <div className="flex justify-start gap-6 mb-8">
          <img src={assets.KoiPool} className="w-20 h-20 rounded-full" />

          <div className="mb-4">
            <label className="block text-xl font-medium">Username</label>
            <p className="text-2xl font-semibold">{userInfo?.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="mb-4">
            <label className="block text-xl font-medium">Last name</label>
            <p className="text-lg font-semibold">{userInfo?.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">First Name</label>
            <p className="text-lg font-semibold">{userInfo?.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Gender</label>
            <p className="text-lg font-semibold">{userInfo?.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Date of Birth</label>
            <p className="text-lg font-semibold">{userInfo?.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Email</label>
            <p className="text-lg font-semibold">{userInfo?.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium ">Address</label>
            <p className="text-lg font-semibold">{userInfo?.username}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium ">Phone</label>
            <p className="text-lg font-semibold">{userInfo?.username}</p>
          </div>
        </div>

        {/* Nút submit */}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
