import React, { useState } from "react";
import { Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

interface NotificationPrefs {
  orderUpdates: boolean;
  promotions: boolean;
  newOrders: boolean;
  shipping: boolean;
}

export default function EditNotifications({ onClose }: PanelProps) {
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    orderUpdates: true,
    promotions: true,
    newOrders: true,
    shipping: false,
  });

  const toggle = (k: keyof NotificationPrefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const Row = ({ label, desc, k }: { label: string; desc: string; k: keyof NotificationPrefs }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#1e3a5f] last:border-0">
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => toggle(k)}
        className={`relative w-11 h-6 rounded-full transition-colors ${prefs[k] ? "bg-[#1a3a6b] border border-[#2563eb]" : "bg-[#0d1b2e] border border-[#1e3a5f]"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform bg-white ${prefs[k] ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );

  return (
    <>
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-medium">Push notifications</p>
      <div className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-xl px-4 mb-5">
        <Row label="Order updates" desc="Status changes on your purchases" k="orderUpdates" />
        <Row label="Promotions" desc="Deals and offers from your shops" k="promotions" />
      </div>
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-medium">Order alerts</p>
      <div className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-xl px-4 mb-5">
        <Row label="New orders" desc="When a customer places an order" k="newOrders" />
        <Row label="Shipping updates" desc="Tracking and delivery notifications" k="shipping" />
      </div>
      <Btn onClick={onClose}>Save preferences</Btn>
    </>
  );
}