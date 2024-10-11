// import React, { useEffect, useRef, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { useSelector } from "react-redux";
// import Navbar from "../../../components/Navbar";

// const Pricing = () => {
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const username = useSelector((state) => state.users.data?.result?.username);
//   const token = useSelector((state) => state.auth.data?.token);

//   const stompClientRef = useRef(null);
//   console.log(token);

//   useEffect(() => {
//     // Tạo một Client STOMP mới
//     const stompClient = new Client({
//       webSocketFactory: () => {
//         const socket = new SockJS("http://localhost:8080/websocket");
//         socket.onopen = () => {
//           socket.send(JSON.stringify({ Authorization: `Bearer ${token}` })); // Gửi token cùng kết nối
//         };
//         return socket;
//       },
//       debug: (str) => {
//         console.log(str);
//       }, // Thêm debug để xem thông tin kết nối
//       connectHeaders: {
//         Authorization: `Bearer ${token}`, // Gửi token trong headers
//       },
//       onConnect: () => {
//         console.log("Connected to WebSocket");

//         // Đánh dấu kết nối thành công
//         stompClientRef.current.connected = true;

//         // Đăng ký nhận tin nhắn từ topic
//         stompClient.subscribe("/topic/public", (message) => {
//           if (message.body) {
//             setMessages((prevMessages) => [
//               ...prevMessages,
//               JSON.parse(message.body),
//             ]);
//           }
//         });

//         // Thêm người dùng
//         stompClient.publish({
//           destination: "/app/chat.addUser",
//           body: JSON.stringify({ sender: username }),
//         });
//       },
//       onStompError: (frame) => {
//         console.error("Broker error: " + frame.headers["message"]);
//       },
//     });

//     // Kích hoạt client STOMP
//     stompClient.activate();
//     stompClientRef.current = stompClient; // Lưu stompClient vào ref

//     return () => {
//       if (stompClientRef.current) {
//         stompClientRef.current.deactivate(); // Ngắt kết nối khi component bị gỡ bỏ
//       }
//     };
//   }, [username]);

//   const sendMessage = () => {
//     if (
//       messageText &&
//       stompClientRef.current &&
//       stompClientRef.current.connected
//     ) {
//       const message = {
//         sender: username,
//         messageText: messageText,
//       };

//       // Log thông tin để xác nhận kết nối
//       console.log("Sending message:", message);

//       stompClientRef.current.publish({
//         destination: "/app/chat.sendMessage",
//         body: JSON.stringify(message),
//       });
//       setMessageText("");
//     } else {
//       console.error(
//         "STOMP connection not established or stompClientRef is null"
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto">
//         <div className="flex-grow overflow-auto mb-4">
//           {messages.map((msg, index) => (
//             <div key={index} className="p-2 my-1 rounded bg-gray-100">
//               <strong>{msg.sender}: </strong>
//               {msg.messageText}
//             </div>
//           ))}
//         </div>
//         <div className="flex">
//           <input
//             type="text"
//             className="flex-grow border border-gray-300 rounded p-2 mr-2"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             placeholder="Nhập tin nhắn..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white rounded px-4 py-2"
//           >
//             Gửi
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Pricing;

import React, { useState } from "react";

const Pricing = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Avatar button to open the sidebar */}
      <button onClick={toggleSidebar} className="p-2">
        <img
          src="/path-to-avatar.jpg"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {/* Sidebar component */}
      <div
        className={`fixed top-0 right-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform transform bg-white dark:bg-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleSidebar}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 start-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <span className="ms-3">Dashboard</span>
            </li>
            <li>
              <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </li>
            <li>
              <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </li>
            <li>
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </li>
            <li>
              <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
            </li>
            <li>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </li>
            <li>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
