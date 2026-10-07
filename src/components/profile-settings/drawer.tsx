import React, { ReactNode } from "react";
import { X } from "./primitives";

interface DrawerProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Drawer({ title, open, onClose, children }: DrawerProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-[#081422] border-l border-[#1e3a5f] z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e3a5f]">
          <span className="text-white font-semibold text-base">{title}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </>
  );
}