import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto mt-8">
        <div className="flex-grow overflow-y-auto mb-4 h-64 bg-gray-100 p-4 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded-lg max-w-xs ${
                msg.sender.userId === senderId
                  ? "bg-blue-500 text-white self-end"
                  : "bg-white text-black self-start"
              }`}
            >
              <strong>
                {msg.sender.userId === senderId ? userInfo?.username : "Admin"}:
              </strong>
              <span className="block">{msg.messageText}</span>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-gray-500 text-center">No messages</p>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg p-2 mr-2"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-blue-600"
          >
            Gửi
          </button>
        </div>
      </div>
    </>
  );
};

export default Pricing;
