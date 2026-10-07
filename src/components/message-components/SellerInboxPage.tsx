"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Sidebar from "@/components/message-components/Sidebar";
import ChatPanel from "@/components/message-components/ChatPanel";
import { connectSocket, socket } from "@/lib/socket";
import { Thread, Message } from "@/types/inbox";

import { useMessageStore } from "@/store/messageStore";

export default function SellerInboxPage() {

 const {
  threads,
  setThreads,
  activeConversationId,
  clearActiveConversation
} = useMessageStore();


const [activeId, setActiveId] = useState<number | null>(null);

  const activeThread = threads.find((thread) => thread.id === activeId) || null;


   

  useEffect(() => {
   const fetchThreads = async () => {
  try {
    const sellerId = localStorage.getItem("userId");


    const res = await fetch(
      `https://snapshopo.onrender.com/api/messages/seller/${sellerId}`
    ,{
      credentials:'include'
    });

    console.log("Response status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch conversations");

    const json: Thread[] = await res.json();
    console.log(json)
    setThreads(json);
    
  } catch (error) {
    console.error("Error fetching threads:", error);
  }
   };

    fetchThreads();
  }, []);

  useEffect(() => {

  if (
    activeConversationId &&
    threads.length > 0
  ) {

    const thread = threads.find(
      (t) => t.id === activeConversationId
    );

    if (thread) {
      setActiveId(thread.id);

      clearActiveConversation();
    }
  }

}, [
  activeConversationId,
  threads
]);



  useEffect(() => {
  connectSocket();

  socket.on("connect", () => {
    console.log("Socket Connected");
  });

  socket.on(
    "receive_private_message",
    (message) => {
      console.log(
        "received",
        message
      );

      const currentUserId = Number(
        localStorage.getItem("userId")
      );

      setThreads((prev) =>
        prev.map((thread) => {
          if (
            thread.id !==
            message.conversationId
          ) {
            return thread;
          }

          return {
            ...thread,

            preview: message.text,

            time: "now",

            messages: [
              ...thread.messages,
              {
                id: message.id,
                text: message.text,
                senderId: message.senderId,


                time: new Date(
                  message.createdAt
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ],
          };
        })
      );
    }
  );

  socket.on(
    "receive_bid_message",
    (message) => {
      setThreads((prev) =>
        prev.map((thread) => {
          if (
            thread.id !==
            message.conversationId
          ) {
            return thread;
          }

          return {
            ...thread,
            messages: [
              ...thread.messages,
              message,
            ],
            preview: message.text,
            time: "now",
          };
        })
      );
    }
  );

  return () => {
    socket.off("connect");
    socket.off(
      "receive_private_message"
    );
    socket.off(
      "receive_bid_message"
    );
  };
}, []);

  const handleAddThread = (thread: Thread) => {
    setThreads((prev) => {
      const exists = prev.some((t) => t.id === thread.id);
      if (exists) return prev;
      return [thread, ...prev];
    });
  };

  const handleSelect = async(id: number) => {
  setActiveId(id);

  const thread = threads.find(
    (t) => t.id === id
  );

  if (!thread) return;

   const res = await fetch(
      `https://snapshopo.onrender.com/api/messages/conversation/${thread.id}/messages`
    ,{
      credentials:"include"
    });



  socket.emit(
    "join_conversation",
    {
      conversationId: thread.id,
    }
  );

  setThreads((prev) =>
    prev.map((t) =>
      t.id === id
        ? { ...t, unread: 0 }
        : t
    )
  );
};

  const handleSend = (
  threadId: number,
  text: string
) => {

  const thread =
    threads.find(
      (t) => t.id === threadId
    );
    

  if (!thread) return;
  console.log("message",thread)

  socket.emit(
    "send_private_message",
    {
      conversationId:
        thread.id,
      text,

    }
  );
};

  const handleAcceptOrder = (threadId: number) => {
    const thread = threads.find((t) => t.id === threadId);
    if (!thread?.id) return;

    socket.emit("select_seller", {
      orderId: thread.id,
      sellerId: 1,
    });

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

   const currentUserId = Number(
  localStorage.getItem("userId")
);

const confirmMsg: Message = {
  id: `${threadId}-accept-${Date.now()}`,
  senderId: currentUserId,
  text: "Order accepted! I'll pack it and arrive soon",
  time: now,
};

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [...t.messages, confirmMsg],
              preview: "Order accepted!",
              time: "now",
            }
          : t
      )
    );
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        threads={threads}
        activeId={activeId}
        onSelect={handleSelect}
        onAddThread={handleAddThread}
      />

      {activeThread != null ? (
        <ChatPanel
          thread={activeThread}
          onSend={handleSend}
          onAcceptOrder={handleAcceptOrder}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
      <MessageCircle size={40} className="text-sky-200" />
      <p className="text-sm">Select a conversation to start messaging</p>
    </div>
  );
}
