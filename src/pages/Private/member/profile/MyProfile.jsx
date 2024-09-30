import React from "react";
import { assets } from "../../../../assets/assets";

const MyProfile = () => {
  return (
    <div className="flex flex-col justify-between items-center max-w-[100vw] my-10">
      <div className="flex flex-row gap-10 w-[70vw] border border-solid border-gray-200 shadow-lg p-5 rounded-3xl">
        <img src={assets.KoiPool} className="w-[10%] rounded-[50%]" />

        <div className="flex flex-col justify-between items-start gap-2">
          <p className="text-xl font-bold text-center mt-2">
            FULL NAME OF USER
          </p>

          <p className="text-lg text-gray-400">Username</p>
          <b>username</b>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-12 w-[70vw] border border-solid border-gray-200 shadow-lg p-5 rounded-3xl">
        <p className="text-xl font-bold">BASIC INFORMATION</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-lg text-gray-400">Last name</p>
            <b>name</b>
          </div>

          <div>
            <p className="text-lg text-gray-400">First name</p>
            <b>name</b>
          </div>

          <div>
            <p className="text-lg text-gray-400">Gender</p>
            <b>male</b>
            {/* <select>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select> */}
          </div>

          <div>
            <p className="text-lg text-gray-400">Birthday</p>
            <b>22-06-2018</b>
            {/* <input type="date" /> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-12 w-[70vw] border border-solid border-gray-200 shadow-lg p-5 rounded-3xl">
        <p className="text-xl font-bold">BASIC INFORMATION</p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-lg text-gray-400">Address</p>
            <b>456 Song Hanh, P.21, Q.2, HCMC</b>
          </div>

          <div>
            <p className="text-lg text-gray-400">Email</p>
            <b>email@gmail.com</b>
          </div>

          <div>
            <p className="text-lg text-gray-400">Phone</p>
            <b>(+84) 789456123</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
