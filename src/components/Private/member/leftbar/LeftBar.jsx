import React from "react";

const LeftBar = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 h-screen p-6 bg-gray-100">
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setCurrentView("add")}
              className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                currentView === "add"
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              }`}
            >
              Add Fish
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentView("view")}
              className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                currentView === "view"
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              }`}
            >
              View All Fish
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftBar;
