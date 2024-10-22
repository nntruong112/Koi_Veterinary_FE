import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../../../components/Private/member/leftbar/Leftbar";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Member = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <LeftBar />
        <main className="w-full bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Member;
