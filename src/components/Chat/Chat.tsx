"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Smile } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

interface Message {
  senderId: string;
  text: string;
  timestamp: string;
}

interface User {
  _id: string;
  name: string;
  isOnline: boolean;
  avatarUrl?: string;
  title?: string;
}

interface Props {
  currentUserId: string;
  receiverId: string;
  receiverName?: string;
  receiverImage?: string;
}

const teacherAutoReplies = [
  "Hi! How can I help you today?",
  "I'm here if you have any questions.",
  "Feel free to ask anything about the topic.",
  "I'll get back to you shortly.",
  "Thank you for your patience!",
  "Teacher is currently offline but will reply soon.",
];

export default function Chat({
  currentUserId,
  receiverId,
  receiverName = "Teacher",
  receiverImage = "",
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState<User | null>(null);
  const [autoReplyIndex, setAutoReplyIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`/api/users/${receiverId}`)
      .then((res) => res.json())
      .then((data) => {
        const updatedReceiver = {
          ...data,
          name: data.name || receiverName,
          avatarUrl: data.avatarUrl || receiverImage,
        };
        setReceiver(updatedReceiver);
      });
  }, [receiverId, receiverName, receiverImage]);

  // Show welcome message when chat loads or receiver changes
  useEffect(() => {
    setMessages([
      {
        senderId: receiverId,
        text: "Welcome! How can I assist you today?",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setAutoReplyIndex(1); // Start auto-replies from second message
  }, [receiverId]);

  // Optional: Clear messages when current user or receiver changes
  useEffect(() => {
    // Comment this out if you don't want to clear on currentUserId change
    // setMessages([]);
    // setAutoReplyIndex(0);
  }, [currentUserId, receiverId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const userMsg: Message = {
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    if (autoReplyIndex < teacherAutoReplies.length) {
      const autoReplyMsg: Message = {
        senderId: receiverId,
        text: teacherAutoReplies[autoReplyIndex],
        timestamp: new Date().toLocaleTimeString(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, autoReplyMsg]);
        setAutoReplyIndex((prev) => prev + 1);
      }, 1200);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex  max-w-6xl mx-auto my-10 h-[85vh] rounded-xl overflow-hidden shadow-lg border border-orange-200 bg-white">
      {/* Sidebar */}
      <div className="w-64 sm:w-72 bg-gradient-to-br from-yellow-300 to-orange-300 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto shadow-md">
            <Image
              src={
                receiver?.avatarUrl || receiverImage || "/default-avatar.png"
              }
              alt={receiverName || "Teacher"}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-center text-2xl text-orange-600 font-bold mt-4">
            {receiverName || "Teacher"}🟢
          </h2>
          <p className="text-center text-orange-600 text-lg  mt-1 ">
            {"Designation: Tour Teacher"}
          </p>
        </div>
        <div className="text-center text-sm font-medium">
          {receiver?.isOnline ? "🟢 Online" : "🔴 Offline"}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 bg-orange-100 border-b text-orange-600 font-semibold text-lg flex justify-between items-center">
          <span>Chat with {receiverName || "Teacher"} </span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-amber-50 space-y-5">
          {messages.map((msg, idx) => {
            const isCurrentUser = msg.senderId === currentUserId;
            return (
              <div
                key={idx}
                className={clsx("flex items-end gap-3", {
                  "justify-end": isCurrentUser,
                })}
              >
                {!isCurrentUser && (receiver?.avatarUrl || receiverImage) && (
                  <div className="w-8 h-8 rounded-full overflow-hidden relative shadow">
                    <Image
                      src={
                        receiver?.avatarUrl ||
                        receiverImage ||
                        "/default-avatar.png"
                      }
                      alt={receiver?.name || "Teacher"}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                )}
                <div
                  className={clsx(
                    "px-4 py-3 rounded-xl shadow-sm max-w-[70%] text-sm",
                    isCurrentUser
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-yellow-300 rounded-bl-none"
                  )}
                >
                  <p>{msg.text}</p>
                  <span className="block text-xs mt-1 text-orange-300">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center gap-3">
          <button
            type="button"
            className="text-orange-500 hover:text-orange-600"
            onClick={() => setNewMessage((prev) => prev + "😊")}
          >
            <Smile className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-orange-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-orange-200"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 shadow"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
