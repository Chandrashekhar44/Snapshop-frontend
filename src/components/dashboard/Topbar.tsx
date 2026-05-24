"use client";

import {
  ShoppingBag,
  Store,
  Bell,
  MessageCircle,
  MailCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  initials: string;
};

type TopbarProps = {
  user: User;
  activeRole: "buyer" | "seller";
  onRoleChange: (role: "buyer" | "seller") => void;
};

export default function Topbar({
  user,
  activeRole,
  onRoleChange,
}: TopbarProps) {
  const router = useRouter();

  const messagingHandle = () => {
    console.log("clicked")
    router.push("/inbox")
  };

  return (
    <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
          <MailCheck className="w-5 h-5 text-white" />
        </div>
        <span className="text-slate-100 font-medium text-[17px] tracking-wide">
          Stamp<span className="text-blue-400">Shop</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onRoleChange("buyer")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
            activeRole === "buyer"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500"
          }`}
        >
          <ShoppingBag className="w-3 h-3" />
          Buyer view
        </button>

        <button
          onClick={() => onRoleChange("seller")}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
            activeRole === "seller"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500"
          }`}
        >
          <Store className="w-3 h-3" />
          Seller view
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
        </button>

        <button
          className="text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Messages"
          onClick={messagingHandle}
        >
          <MessageCircle className="w-5 h-5" />
        </button>

        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
          {user.initials}
        </div>
      </div>
    </header>
  );
}