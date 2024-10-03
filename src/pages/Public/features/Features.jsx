import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { MdOutlineSupportAgent } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { IoAccessibility, IoChatbubbles } from "react-icons/io5";
import { FaPiggyBank } from "react-icons/fa";

const Features = () => {
  return (
    <>
      <Navbar />

      {/* ------------- SECTION 1 ------------ */}
      <section className="text-center py-8 bg-[#f1faff]">
        <h1 className="text-5xl font-bold mt-0 mb-16 text-[#071e55]">
          Amazing Features
        </h1>

        <div className="grid grid-cols-3 grid-rows-2 gap-20">
          <div className="flex flex-1 justify-center items-center gap-4">
            <MdOutlineSupportAgent className="text-6xl text-green-600" />
            <p className="text-3xl">Support 24/7</p>
          </div>

          <div className="flex flex-1 justify-center items-center gap-4">
            <PiUsersThreeFill className="text-6xl text-blue-600" />
            <p className="text-3xl">User Friendly</p>
          </div>

          <div className="flex flex-1 justify-center items-center gap-4">
            <IoIosNotifications className="text-6xl text-red-600" />
            <p className="text-3xl">Notifications</p>
          </div>

          <div className="flex flex-1 justify-center items-center gap-4">
            <IoAccessibility className="text-6xl text-blue-600" />
            <p className="text-3xl">Accessibility</p>
          </div>

          <div className="flex flex-1 justify-center items-center gap-4">
            <FaPiggyBank className="text-6xl text-red-600" />
            <p className="text-3xl">Cost Control</p>
          </div>

          <div className="flex flex-1 justify-center items-center gap-4">
            <IoChatbubbles className="text-6xl text-green-600" />
            <p className="text-3xl">Chat With Us</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Features;
