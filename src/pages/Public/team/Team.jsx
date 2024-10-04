import React, { useState } from "react";
import { assets } from "../../../assets/assets";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
const Team = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
        OUR VET
        <p>The resolver for your problem</p>
      </div>
      <div className="w-full py-2 grid grid-cols-5 gap-4 gap-y-6 overflow-hidden cursor-pointer group pb-10">
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet1} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Team;
