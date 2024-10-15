import React from "react";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiUserReceivedFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";

const SummaryCard = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 p-10 ml-10">
      <div className="flex items-center justify-center gap-4 text-2xl w-52 rounded-lg p-5 bg-gray-500 text-white">
        <FaUser />
        <p>USER</p>
      </div>

      <div className="flex items-center justify-center gap-4 text-2xl w-52 rounded-lg p-5 bg-gray-500 text-white">
        <FaUserDoctor />
        <p>VETS</p>
      </div>

      <div className="flex items-center justify-center gap-4 text-2xl w-52 rounded-lg p-5 bg-gray-500 text-white">
        <RiUserReceivedFill />
        <p>STAFF</p>
      </div>

      <div className="flex items-center justify-center gap-4 text-2xl w-52 rounded-lg p-5 bg-gray-500 text-white">
        <RiAdminFill />
        <p>ADMIN</p>
      </div>
    </div>
  );
};

export default SummaryCard;
