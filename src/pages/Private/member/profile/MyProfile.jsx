import React from "react";
import { assets } from "../../../../assets/assets";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const userInfo = useSelector((state) => state.users.data.result);

  return (
    // <div className="flex justify-center items-center">
    //   {/* <div className="flex flex-row gap-10 w-[70vw] border border-solid border-gray-200 shadow-lg p-5 rounded-3xl">
    //     <img src={assets.KoiPool} className="w-[10%] rounded-[50%]" />

    //     <div className="flex flex-col justify-between items-start gap-2">
    //       <p className="text-xl font-bold text-center mt-2">{userInfo?.name}</p>

    //       <p className="text-lg text-gray-400">Username</p>
    //       <b>{userInfo?.username}</b>
    //     </div>
    //   </div> */}
    //   <form className="bg-primary"> zxczxczxc</form>
    // </div>

    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
      <form className="bg-gradient-to-b from-cyan-500 to-gray-600 p-8 rounded-3xl shadow-lg w-[80vw] ">
        {/* User image */}
        <div className="flex justify-center mb-4">
          <img src={assets.KoiPool} className="w-20 h-20 rounded-full" />
        </div>

        {/* User */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Name
          </label>
          <p className="text-lg font-semibold">{userInfo?.name}</p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <p className="text-lg font-semibold">{userInfo?.username}</p>
        </div>

        {/* Nút submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Chỉnh Sửa
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
