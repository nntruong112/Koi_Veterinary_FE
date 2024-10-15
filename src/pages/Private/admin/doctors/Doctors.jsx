import React from "react";
import { vets } from "../../../../assets/assets";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-5 gap-4 pt-5 gap-y-6 px-10 sm:px-0">
        {vets.slice(0, 10).map((item, index) => (
          <div
            onClick={() => Navigate("/info")}
            className="border border-[#C9D8FF] rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="hover:bg-blue-600" src={item.image} alt=" " />
            <div className="p-4">
              <p className=" text-[#262626] text-lg text-center font-medium">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
