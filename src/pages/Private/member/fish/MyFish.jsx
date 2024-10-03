import React, { useState } from "react";
import AddFish from "../../../../components/Private/member/addFish/AddFish";
import ViewFish from "../../../../components/Private/member/viewFish/ViewFish";
import LeftBar from "../../../../components/Private/member/leftbar/Leftbar";
import { useNavigate } from "react-router-dom";
import { path } from "../../../../utils/constant";

const MyFish = () => {
  const [currentView, setCurrentView] = useState("add"); // Quản lý chế độ hiển thị
  const navigate = useNavigate();
  return (
    <div>
      {/* Banner header */}
      <header className="flex justify-center md:flex-row items-center text-center bg-primary p-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            My Fish Collection
          </h1>
          <p className="text-lg mt-2 text-white">Manage and view your fish</p>
        </div>

        {/* Nút ESC */}
        <button
          onClick={() => navigate(path.HOME)}
          className="absolute right-8 flex items-center justify-center text-white/80 w-10 h-10 rounded-full border border-white text-xl hover:bg-gray-300/20"
        >
          X
        </button>
      </header>

      <div className="min-h-screen flex">
        {/* Sidebar */}
        <LeftBar currentView={currentView} setCurrentView={setCurrentView} />

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-8">
            {currentView === "add" ? "Add New Fish" : "View All Fish"}
          </h1>
          {currentView === "add" ? <AddFish /> : <ViewFish />}
        </div>
      </div>
    </div>
  );
};

export default MyFish;
