"use client";

import { useEffect } from "react";
import {
  connectSocket,
  disconnectSocket,
} from "../../src/lib/socket";

export default function NotificationSocketProvider() {
  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return null;
}