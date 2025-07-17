"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext<any>(null);

export const SocketProvider = ({ userId, children }: any) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_API
      ? process.env.NEXT_PUBLIC_BASE_API.replace("/api/v1", "")
      : "http://localhost:5000";

    const socketIo = io(baseURL, {
      query: { userId },
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
