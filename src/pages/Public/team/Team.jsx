import React, { useState } from "react";
import { assets } from "../../../assets/assets";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Team = () => {
  return (
    <>
      <Navbar />
      <div className="w-full grid grid-cols-5 gap-4 gap-y-6 overflow-hidden cursor-pointer group">
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.koihealth} alt="" />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. James
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Team;
