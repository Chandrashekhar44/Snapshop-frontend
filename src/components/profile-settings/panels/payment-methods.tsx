import React, { useState } from "react";
import { Trash, Plus, Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

interface Card {
  id: number;
  brand: string;
  last4: string;
  exp: string;
}

export default function EditPaymentMethods({ onClose }: PanelProps) {
  const [cards] = useState<Card[]>([
    { id: 1, brand: "Visa", last4: "4242", exp: "09/27" },
    { id: 2, brand: "Mastercard", last4: "8891", exp: "02/26" },
  ]);

  return (
    <>
      {cards.map((c) => (
        <div key={c.id} className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-lg p-3 mb-3 flex justify-between items-center">
          <div>
            <p className="text-sm text-white font-medium">{c.brand} •••• {c.last4}</p>
            <p className="text-xs text-gray-400 mt-0.5">Expires {c.exp}</p>
          </div>
          <button className="text-gray-500 hover:text-red-400 transition-colors">
            <Trash />
          </button>
        </div>
      ))}
      <button className="flex items-center gap-2 text-sm text-[#2563eb] hover:text-blue-300 mt-2 transition-colors">
        <Plus /> Add new card
      </button>
      <div className="flex gap-3 mt-6">
        <Btn onClick={onClose}>Done</Btn>
      </div>
    </>
  );
}