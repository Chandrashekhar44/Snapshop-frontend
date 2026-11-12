"use client";

import { useEffect } from "react";
import Topbar from "@/components/dashboard/Topbar";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import SellerDashboard from "@/components/dashboard/SellerDashboard";
import axios from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");

        setUser(response.data.data);

        console.log("Logged in user:", response.data.data);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, setUser]);

  if (!user) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#003B8E] border-r-[#FF3D6B]" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">🛍️</div>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-slate-900">SnapShop</p>
        <p className="mt-1 flex items-center justify-center gap-1 text-sm text-slate-500">
          Loading your account
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="inline-block h-1 w-1 animate-bounce rounded-full bg-slate-400"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Topbar
        user={user}
        activeRole={user.role}
        onRoleChange={() => {}}
      />

      <div className="flex flex-1">
        <main className="flex-1 bg-slate-100 p-6 overflow-x-hidden">
          {user.role === "BUYER" ? (
            <BuyerDashboard user={user} />
          ) : (
            <SellerDashboard user={user} />
          )}
        </main>
      </div>
    </div>
  );
}