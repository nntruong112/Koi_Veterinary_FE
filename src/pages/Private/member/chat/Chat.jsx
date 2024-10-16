import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import RolesNavbar from "../../../../components/rolesNavbar/RolesNavbar";
import { path } from "../../../../utils/constant";
import { assets } from "../../../../assets/assets";
import { IoChatbubbleEllipses } from "react-icons/io5";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const userInfo = useSelector((state) => state.users.data?.result);
  const senderId = userInfo?.userId;
  const token = useSelector((state) => state.auth.data?.token);
  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const stompClient = new Client({
        webSocketFactory: () => new WebSocket("ws://localhost:8080/websocket"),
        connectHeaders: { Authorization: `Bearer ${token}` },

        onConnect: () => {
          console.log("Connected to WebSocket");

          stompClient.subscribe("/topic/public", (message) => {
            if (message.body) {
              const parsedMessage = JSON.parse(message.body);
              console.log("Received message:", parsedMessage);
              setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            }
          });

          stompClient.publish({
            destination: "/app/chat.addUser",
            body: JSON.stringify({ senderId: senderId }),
          });
        },

        onDisconnect: () => {
          console.log("Disconnected from WebSocket");
        },

        onStompError: (frame) => {
          console.error("Broker error: " + frame.headers["message"]);
        },
      });

      stompClient.activate();
      stompClientRef.current = stompClient;
    };

    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log("WebSocket connection closed");
      }
    };
  }, [senderId, token]);

  const sendMessage = () => {
    if (messageText && stompClientRef.current?.connected) {
      const message = {
        sender: userInfo,
        messageText,
        appointmentId: "",
        timestamp: new Date().toISOString(),
      };

      stompClientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(message),
      });
      setMessageText("");
    } else {
      console.error("STOMP connection not established or message is empty");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <RolesNavbar />
      <div className="flex justify-center items-center rounded-lg bg-gray-200 max-w-full min-h-screen">
        <div className="flex items-center gap-6 w-[80%]">
          <form className="flex flex-col gap-2 bg-white px-3 w-1/3 min-h-[90vh] z-10 rounded-xl">
            <div className="flex items-center gap-2 mt-3 ml-2 mb-3">
              <IoChatbubbleEllipses className="text-5xl text-primary" />
              <p className="text-3xl font-semibold">Chat With Us</p>
            </div>
            <hr />
            <div className="flex items-center gap-5 hover:bg-gray-100 w-full p-3 rounded-xl">
              <img
                src={assets.DefaultAvatar}
                className="w-16 h-16 rounded-full"
              />
              <p>NAME</p>
            </div>
          </form>

          <form className="p-1 w-2/3 min-h-[90vh] bg-white rounded-xl flex flex-col">
            <div className="flex items-center gap-5 hover:bg-gray-100 w-52 p-3 rounded-xl mb-1">
              <img
                src={assets.DefaultAvatar}
                className="w-12 h-12 rounded-full"
              />
              <p>NAME</p>
            </div>

            <hr />

            <div className="flex-1 overflow-y-auto px-3 mt-3 max-h-[68vh] flex flex-col gap-2">
              {messages.length === 0 && (
                <p className="text-gray-500 text-center">No messages</p>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-lg max-w-xs ${
                    msg.sender.userId === senderId
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 text-black self-start"
                  }`}
                  style={{
                    alignSelf:
                      msg.sender.userId === senderId
                        ? "flex-end"
                        : "flex-start",
                    overflowWrap: "break-word", // Đảm bảo từ không bị tràn
                    wordBreak: "break-word", // Đảm bảo từ dài sẽ xuống dòng
                    whiteSpace: "pre-wrap", // Giữ định dạng xuống dòng cho văn bản
                    maxWidth: "70%", // Giới hạn chiều rộng tối đa
                  }}
                >
                  <span className="block">{msg.messageText}</span>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border rounded-lg p-2"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button
                type="button"
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
