"use client";

import { io, Socket } from "socket.io-client";

export const socket: Socket = io(
  process.env.NEXT_PUBLIC_API_URL!,
  {
    autoConnect: false,
    withCredentials: true,
    transports: ["polling", "websocket"],
  }
);

export const connectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }

  socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.log("Socket connection error:", err.message);
});