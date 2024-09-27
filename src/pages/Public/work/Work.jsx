import React from "react";
import { assets } from "../../../assets/assets";

const Work = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
        Một số bệnh thường gặp tại cá. <br /> Cách xử lý, khắc phục ra sao?
      </h2>

      <img src={assets.KoiPool} className="w-1/3" />
    </div>
  );
};

export default Work;
