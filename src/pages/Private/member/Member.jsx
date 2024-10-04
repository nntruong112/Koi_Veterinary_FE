import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../../../components/Private/member/leftbar/Leftbar";
import Navbar from "../../../components/Navbar";

const Member = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row gap-5">
        <LeftBar />
        <main className="w-full px-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Member;
