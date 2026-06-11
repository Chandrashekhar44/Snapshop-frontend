"use client";

import { useRef, useEffect, useState } from "react";
import { Phone, Map, MoreVertical, Send } from "lucide-react";
import { Thread, Message } from "@/types/inbox";
import OrderCard from "./OrderCard";
import ProximityBanner from "./ProximityBanner";

interface ChatPanelProps {
  thread: Thread;
  onSend: (threadId: number, text: string) => void;
  onAcceptOrder: (threadId: number) => void;
}

const PROXIMITY_THRESHOLD_KM = 0.5;

export default function ChatPanel({ thread, onSend, onAcceptOrder }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isNearby = thread.distance <= PROXIMITY_THRESHOLD_KM;
  const lastMsg = thread.messages[thread.messages.length - 1];
  const showBanner =
    isNearby && lastMsg?.orderRequest != null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread.messages]);

  useEffect(() => {
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [thread.id]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(thread.id, text);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-xs font-medium text-sky-800">
            {thread.initials}
          </div>
          {thread.online && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{thread.name}</h3>
          <p className="text-xs text-gray-400">
            <span className="text-sky-500">{thread.distanceLabel} away</span>
            {" · "}
            {thread.online ? (
              <span className="text-emerald-500">Online</span>
            ) : (
              <span>Offline</span>
            )}
          </p>
        </div>

        <div className="flex gap-1.5">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
            aria-label="Call buyer"
          >
            <Phone size={15} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
            aria-label="View on map"
          >
            <Map size={15} />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
            aria-label="More options"
          >
            <MoreVertical size={15} />
          </button>
        </div>
      </div>

      {showBanner && (
        <ProximityBanner buyerName={thread.name} distance={thread.distanceLabel} />
      )}

      <div className="flex flex-1 flex-col overflow-y-auto bg-sky-50/40 px-4 py-4">
        {thread.messages.length === 0 || thread == null  ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="max-w-sm rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Send size={22} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Start a conversation</h3>
              <p className="mt-2 text-sm text-gray-500">
                Messages from {thread.name} will appear here. Send a message to begin
                chatting.
              </p>
            </div>
          </div>
        ) : (
          thread.messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              initials={thread.initials}
              onAcceptOrder={() => onAcceptOrder(thread.id)}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-2.5 border-t border-gray-100 bg-white px-4 py-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-sky-300 focus:bg-white"
          style={{ maxHeight: "120px" }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  initials,
  onAcceptOrder,
}: {
  message: Message;
  initials: string;
  onAcceptOrder: () => void;
}) {
  const currUserId = Number(localStorage.getItem("userId"));
  console.log("currentIdn",currUserId);
  console.log("Sender",message.senderId)
  const isSender = Number(message.senderId) === currUserId;
  console.log("issender",isSender)
  console.log("message",message)

  return (
    <div
      className={`mb-2 flex items-end gap-2 ${isSender ? "justify-end" : "justify-start"}`}
    >
      {isSender && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[10px] font-medium text-sky-700">
          {initials}
        </div>
      )}
      <div className={`max-w-[68%]`}>
        <div
          className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
            isSender
              ?"rounded-br-sm bg-blue-600 text-white"
              :"rounded-bl-sm bg-white text-gray-800 shadow-sm ring-1 ring-gray-100"
          }`}
        >
          {message.text}
        </div>
        {message.orderRequest && (
          <OrderCard order={message.orderRequest} onAccept={onAcceptOrder} />
        )}
        <p
          className={`mt-1 text-[10px] text-gray-400 ${
            isSender ? "text-right" : "text-left"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}
