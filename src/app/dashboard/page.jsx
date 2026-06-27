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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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