import React, { useState, useContext } from "react";
// import { vets } from "../../../assets/assets";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";
import { assets } from "../../../assets/assets";
const Team = () => {
  const navigate = useNavigate();
  const { vets } = useContext(AppContext);

  return (
    <>
      <RolesNavbar />

      <div className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
        OUR VET
        <p>The resolver for your problem</p>
      </div>
      <div className="w-full grid grid-cols-5 gap-4 pt-5 gap-y-6 px-10 sm:px-0 mb-5">
        {vets.slice(0, 10).map((item, index) => (
          <div
            className="border border-[#C9D8FF] rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img
              className="hover:bg-primary/20"
              src={item.image || assets.DefaultAvatar}
              alt=""
            />
            <div className="p-4">
              <p className=" text-[#262626] text-lg text-center font-medium">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
          <img src={assets.Vet2} alt="" onClick={() => navigate("/info")} />
          <p className="text-[#262626] text-lg text-center font-medium">
            Dr. Johnny Sins
          </p>
        </div> */}

      <Footer />
    </>
  );
};
export default Team;
