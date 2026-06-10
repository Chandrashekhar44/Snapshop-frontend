"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import SellerDashboard from "@/components/dashboard/SellerDashboard";


const MOCK_USER = {
  name: "Alex Patel",
  initials: "AP",
  role: "buyer", 
};

export default function DashboardPage() {
  

  const [role, setRole] = useState(MOCK_USER.role);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Topbar user={{ ...MOCK_USER, role }} activeRole={role} onRoleChange={setRole} />
      <div className="flex flex-1">
        <main className="flex-1 bg-slate-100 p-6 overflow-x-hidden">
          {role === "buyer" ? (
            <BuyerDashboard user={MOCK_USER} />
          ) : (
            <SellerDashboard user={MOCK_USER} />
          )}
        </main>
      </div>
    </div>
  );
}
