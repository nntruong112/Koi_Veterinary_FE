import React from "react";
import { assets } from "../../../../assets/assets";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const userInfo = useSelector((state) => state.users.data?.result);
  console.log(userInfo);

  return (
    <div className="flex flex-col min-h-screen w-full gap-8 mt-5">
      <form className="flex flex-col justify-between items-center gap-6 p-8 rounded-3xl shadow-lg w-1/4 h-72 border-gray-200 border">
        <p className="text-2xl font-bold">
          {userInfo?.lastname}
          {userInfo?.firstname}
        </p>
        <img src={assets.KoiPool} className="w-28 h-28 rounded-full" />
        <button className="bg-primary text-white font-semibold p-2">
          Upload Photo
        </button>
      </form>

      <form className="p-8 rounded-3xl shadow-lg border-gray-200 border">
        <div className="grid grid-cols-2">
          <div className="mb-4">
            <label className="block text-xl font-medium">Last name</label>
            <p className="text-lg font-semibold">{userInfo?.lastname}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">First Name</label>
            <p className="text-lg font-semibold">{userInfo?.firstname}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Username</label>
            <p className="text-lg font-semibold">{userInfo?.username}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Gender</label>
            <p className="text-lg font-semibold">{userInfo?.lastname}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Date of Birth</label>
            <p className="text-lg font-semibold">{userInfo?.lastname}</p>
          </div>

          <div className="mb-4">
            <label className="block text-xl font-medium">Email</label>
            <p className="text-lg font-semibold">{userInfo?.email}</p>
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
            className="bg-primary text-white font-semibold p-2 w-28"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
