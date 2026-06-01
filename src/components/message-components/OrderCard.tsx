"use client";

import { useState } from "react";
import { Receipt, Check } from "lucide-react";
import { OrderRequest } from "@/types/inbox";

interface OrderCardProps {
  order: OrderRequest;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function OrderCard({
  order,
  onAccept,
  onDecline,
}: OrderCardProps) {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">(
    "pending"
  );

  const handleAccept = () => {
    setStatus("accepted");
    onAccept?.();
  };

  const handleDecline = () => {
    setStatus("declined");
    onDecline?.();
  };

  return (
    <div className="mt-2 min-w-[200px] rounded-xl border border-sky-200 bg-white p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Receipt size={11} className="text-sky-600" aria-hidden="true" />
        <span className="text-[11px] font-medium uppercase tracking-wide text-sky-600">
          Order request
        </span>
      </div>

      <div className="space-y-1">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs text-gray-700">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between border-t border-gray-100 pt-2 text-xs font-semibold text-sky-900">
        <span>Total</span>
        <span>₹{order.total}</span>
      </div>

      {status === "pending" && (
        <div className="mt-2.5 flex gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-50"
          >
            Decline
          </button>
        </div>
      )}

      {status === "accepted" && (
        <div className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-1.5 text-xs font-medium text-emerald-700">
          <Check size={13} />
          Order accepted
        </div>
      )}

      {status === "declined" && (
        <div className="mt-2.5 flex items-center justify-center rounded-lg bg-red-50 py-1.5 text-xs font-medium text-red-500">
          Order declined
        </div>
      )}
    </div>
  );
}
