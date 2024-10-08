import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";

const Pricing = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const username = useSelector((state) => state.users.data?.result?.username); // Lấy thông tin người dùng từ Redux store
  const token = useSelector((state) => state.auth.data.token); // Lấy token từ Redux
  const stompClientRef = useRef(null);
  console.log(token);

  useEffect(() => {
    // Tạo một Client STOMP mới
    const stompClient = new Client({
      webSocketFactory: () => {
        const socket = new SockJS("http://localhost:8080/websocket");
        socket.onopen = () => {
          socket.send(JSON.stringify({ Authorization: `Bearer ${token}` })); // Gửi token cùng kết nối
        };
        return socket;
      },
      debug: (str) => {
        console.log(str);
      }, // Thêm debug để xem thông tin kết nối
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Gửi token trong headers
      },
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Đánh dấu kết nối thành công
        stompClientRef.current.connected = true;

        // Đăng ký nhận tin nhắn từ topic
        stompClient.subscribe("/topic/public", (message) => {
          if (message.body) {
            setMessages((prevMessages) => [
              ...prevMessages,
              JSON.parse(message.body),
            ]);
          }
        });

        // Thêm người dùng
        stompClient.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ sender: username }),
        });
      },
      onStompError: (frame) => {
        console.error("Broker error: " + frame.headers["message"]);
      },
    });

    // Kích hoạt client STOMP
    stompClient.activate();
    stompClientRef.current = stompClient; // Lưu stompClient vào ref

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate(); // Ngắt kết nối khi component bị gỡ bỏ
      }
    };
  }, [username]);

  const sendMessage = () => {
    if (
      messageText &&
      stompClientRef.current &&
      stompClientRef.current.connected
    ) {
      const message = {
        sender: username,
        messageText: messageText,
      };

      // Log thông tin để xác nhận kết nối
      console.log("Sending message:", message);

      stompClientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(message),
      });
      setMessageText("");
    } else {
      console.error(
        "STOMP connection not established or stompClientRef is null"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="flex-grow overflow-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 my-1 rounded bg-gray-100">
              <strong>{msg.sender}: </strong>
              {msg.messageText}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded p-2 mr-2"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded px-4 py-2"
          >
            Gửi
          </button>
        </div>
      </div>
    </>
  );
};

export default Pricing;
