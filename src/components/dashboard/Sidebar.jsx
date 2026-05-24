"use client";

import { useState } from "react";
import {
  LayoutDashboard, ShoppingBag, Search, Clock, TruckIcon,
  CheckCircle, XCircle, Image, Heart, Star, User, Wallet,
  Settings, BarChart2, Package, Plus, Edit, Coins, CreditCard, Store,
} from "lucide-react";

const BUYER_NAV = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Browse stamps", icon: ShoppingBag },
      { label: "Search & filter", icon: Search },
    ],
  },
  {
    section: "My orders",
    items: [
      { label: "Pending", icon: Clock },
      { label: "In transit", icon: TruckIcon },
      { label: "Delivered", icon: CheckCircle },
      { label: "Cancelled", icon: XCircle },
    ],
  },
  {
    section: "Collection",
    items: [
      { label: "My collection", icon: Image },
      { label: "Wishlist", icon: Heart },
      { label: "Reviews given", icon: Star },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Profile", icon: User },
      { label: "Payments", icon: Wallet },
      { label: "Settings", icon: Settings },
    ],
  },
];

const SELLER_NAV = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    section: "Listings",
    items: [
      { label: "My listings", icon: Package },
      { label: "Add stamp", icon: Plus },
      { label: "Draft listings", icon: Edit },
    ],
  },
  {
    section: "Orders",
    items: [
      { label: "New orders", icon: Clock },
      { label: "Dispatched", icon: TruckIcon },
      { label: "Completed", icon: CheckCircle },
      { label: "Cancelled", icon: XCircle },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Earnings", icon: Coins },
      { label: "Payouts", icon: CreditCard },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Shop profile", icon: Store },
      { label: "Reviews", icon: Star },
      { label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar({ role }) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navGroups = role === "seller" ? SELLER_NAV : BUYER_NAV;

  return (
    <aside className="w-48 bg-slate-950 border-r border-slate-800 py-4 flex-shrink-0">
      {navGroups.map((group) => (
        <div key={group.section}>
          <p className="px-4 pt-4 pb-1 text-[10px] font-medium tracking-widest uppercase text-slate-600">
            {group.section}
          </p>
          {group.items.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveItem(label)}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-[13px] text-left transition-all border-l-[3px] ${
                activeItem === label
                  ? role === "seller"
                    ? "bg-teal-950 text-teal-300 border-teal-500"
                    : "bg-blue-950 text-blue-300 border-blue-500"
                  : "text-slate-400 border-transparent hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}
