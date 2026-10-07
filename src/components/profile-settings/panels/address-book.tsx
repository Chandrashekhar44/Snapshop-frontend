import React, { useState } from "react";
import { Trash, Plus, Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

interface Address {
  id: number;
  label: string;
  line: string;
}

export default function EditAddressBook({ onClose }: PanelProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, label: "Home", line: "123 Maple St, Brooklyn, NY 11201" },
    { id: 2, label: "Work", line: "450 Fifth Ave, New York, NY 10018" },
    { id: 3, label: "Mom's", line: "87 Oak Lane, Austin, TX 73301" },
  ]);

  return (
    <>
      {addresses.map((a) => (
        <div key={a.id} className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-lg p-3 mb-3 flex justify-between items-start">
          <div>
            <p className="text-xs text-[#2563eb] font-medium mb-0.5">{a.label}</p>
            <p className="text-sm text-gray-200">{a.line}</p>
          </div>
          <button 
            onClick={() => setAddresses(addresses.filter(x => x.id !== a.id))} 
            className="text-gray-500 hover:text-red-400 ml-3 mt-0.5 transition-colors"
          >
            <Trash />
          </button>
        </div>
      ))}
      <button className="flex items-center gap-2 text-sm text-[#2563eb] hover:text-blue-300 mt-2 transition-colors">
        <Plus /> Add new address
      </button>
      <div className="flex gap-3 mt-6">
        <Btn onClick={onClose}>Save changes</Btn>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      </div>
    </>
  );
}