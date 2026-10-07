"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";

interface ProximityBannerProps {
  buyerName: string;
  distance: string;
}

export default function ProximityBanner({
  buyerName,
  distance,
}: ProximityBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mx-3 mt-3 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2.5">
      <Bell
        size={18}
        className="mt-0.5 shrink-0 animate-bounce text-sky-600"
        aria-hidden="true"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-sky-900">
          New order request from nearby buyer
        </p>
        <p className="mt-0.5 text-xs text-sky-600">
          {buyerName} is {distance} away and wants to place an order
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 text-sky-400 hover:text-sky-600 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
