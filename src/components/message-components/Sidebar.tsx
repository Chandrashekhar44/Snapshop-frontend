"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import ThreadItem from "./ThreadItem";
import { cn } from "@/lib/utils";
import { Thread } from "@/types/inbox";

type FilterType = "all" | "nearby" | "new";

interface SidebarProps {
  threads: Thread[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onAddThread: (thread: Thread) => void;
}

interface SearchUser {
  id: number;
  username: string;
  email: string;
  role?: string;
}

const PROXIMITY_THRESHOLD_KM = 0.5;

export default function Sidebar({
  threads,
  activeId,
  onSelect,
  onAddThread,
}: SidebarProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:4000/api/messages/search?search=${encodeURIComponent(search)}`,
          { signal: controller.signal ,
            credentials:"include"
          }
        );

        if (!res.ok) throw new Error("Failed to fetch users");

        const json = await res.json();
        setSearchResults(json?.data?.users || []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchUsers, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

 
  const handleUserSelect = async (user: SearchUser) => {
    try {
      const token = localStorage.getItem("token");
      console.log("USERID",user)

      const existingThread = threads.find(
           (t) =>
             t.id === user.id 
            );
      console.log("EX",existingThread)

      if (existingThread) {
        onSelect(existingThread.id);
        setSearch("");
        setSearchResults([]);
        return;
      }

           const sellerId = localStorage.getItem("userId");
           const findRes = await fetch(`http://localhost:4000/api/messages/conversations/find?buyerId=${user.id}&sellerId=${sellerId}`,
     {
       credentials: "include",
     }
     );


      if (!findRes.ok) throw new Error("create conversation");

      const conversation = await findRes.json();
      const msgRes = await fetch(
              `http://localhost:4000/api/messages/conversation/${conversation.id}/messages`,
  {
    credentials: "include",
  }
);         

      if (!msgRes.ok) throw new Error("Failed to load messages");

      const messages = await msgRes.json();

      const newThread: Thread = {
        ...conversation,
        messages: messages || [],
        buyerId: user.id,
      };

      onAddThread(newThread);
      onSelect(newThread.id);

      setSearch("");
      setSearchResults([]);
    } catch (err: any) {
      console.error("handleUserSelect error:", err.message);
    }
  };

  const filteredThreads = threads.filter((thread) => {
     const matchesSearch =(thread.name ?? "").toLowerCase().includes(search.toLowerCase()) ||(thread.preview ?? "")
    .toLowerCase()
    .includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "nearby") return thread.distance <= PROXIMITY_THRESHOLD_KM;
    if (filter === "new") return thread.unread > 0;

    return true;
  });

  const tabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "nearby", label: "Nearby" },
    
    { key: "new", label: "New" },
  ];

  return (
    <aside className="flex w-72 min-w-72 flex-col border-r border-gray-100 bg-white">
      <div className="bg-blue-600 px-4 py-4">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} className="text-white" />
          <h2 className="text-sm font-semibold text-white">Snap Shop — Inbox</h2>
        </div>
        <p className="mt-0.5 text-[11px] text-blue-200">Seller dashboard</p>
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[11px] text-blue-100">0.5 km radius active</span>
        </div>
      </div>

      <div className="border-b border-gray-100 px-3 py-2.5">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users or messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-xs text-gray-900 placeholder-gray-400 outline-none transition focus:border-sky-300 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex gap-1.5 border-b border-gray-100 px-3 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "flex-1 rounded-full border py-1 text-[11px] font-medium transition-colors",
              filter === tab.key
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-200 text-gray-500 hover:border-sky-300 hover:text-sky-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {search.trim() ? (
          loading ? (
            <p className="px-4 py-4 text-xs text-gray-400">Searching...</p>
          ) : error ? (
            <p className="px-4 py-4 text-xs text-red-500">{error}</p>
          ) : searchResults.length === 0 ? (
            <p className="px-4 py-4 text-xs text-gray-400">No users found</p>
          ) : (
            searchResults.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className="w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50"
              >
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </button>
            ))
          )
        ) : filteredThreads.length === 0 ? (
          <p className="px-4 py-6 text-center text-xs text-gray-400">
            No conversations found
          </p>
        ) : (
          filteredThreads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              isActive={activeId === thread.id}
              onClick={() => onSelect(thread.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
