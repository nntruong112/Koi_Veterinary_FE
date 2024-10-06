import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Booking = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
        BOOKING FOR YOUR SERVICES.
      </h1>

      <section className="bg-[url(Koi_Veterinary_FE/src/assets/y2mate.com - CÁ CHÉP KOI ĐẸP NHẤT shorts cakoidep_1080p.gif)] min-h-svh flex justify-center items-center">
        <form className="w-[40vw] h-[60vh] bg-[#CCFFFF] bg-[url('./src/assets/LoginLogo.png')] border border-l-blue-300 rounded-lg flex flex-col gap-8 items-center">
          <h2 className="font-semibold text-4xl ">Booking</h2>

          <input
            type="text"
            name="Name"
            placeholder="Your Name"
            required
            className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none  "
          />

          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            required
            className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none "
          />

          <input
            type="tel"
            name="Phone"
            placeholder="Phone"
            required
            className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none  "
          />

          <select
            className="w-[500px] h-[40px] p-2 rounded-md bg-transparent border border-solid focus:outline-none "
            required
          >
            <option value="problem">Choose your problem</option>
            <option value="nam">Thân cá bị nấm</option>
            <option value="vi trung">Cá bị vi khuẩn làm ngẹt đường thở</option>
            <option value="ky sinh">Cá bị ký sinh trùng</option>
            <option value="ngu">Cá bị bênh ngủ</option>
          </select>
          <select
            name="Vet"
            className="w-[500px] h-[40px] p-2 rounded-md bg-transparent border border-solid focus:outline-none "
            id=""
          >
            <option value="">Vet.</option>
            <option value="">Vet.</option>
            <option value="">Vet.</option>
            <option value="">Vet.</option>
            <option value="">Vet.</option>
          </select>
          <div className="w-[500px] bg-blue-400 p-3 rounded-lg font-semibold hover:bg-blue-600 transition text-center">
            <button>Submit</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default Booking;
