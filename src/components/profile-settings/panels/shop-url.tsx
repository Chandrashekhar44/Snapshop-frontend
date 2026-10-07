import React, { useState } from "react";
import { Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

export default function EditShopURL({ onClose }: PanelProps) {
  const [slug, setSlug] = useState<string>("sarahnielsen");

  return (
    <>
      <p className="text-sm text-gray-400 mb-4">Your shop URL is public and affects how customers find you.</p>
      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">Shop URL</label>
      <div className="flex items-center bg-[#0d1b2e] border border-[#1e3a5f] rounded-lg overflow-hidden focus-within:border-[#2563eb] transition-colors mb-4">
        <span className="px-3 text-gray-500 text-sm border-r border-[#1e3a5f] h-10 flex items-center">snap.shop/</span>
        <input
          value={slug}
          onChange={e => setSlug(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none"
        />
      </div>
      <p className="text-xs text-gray-500 mb-6">Preview: <span className="text-[#2563eb]">snap.shop/{slug}</span></p>
      <div className="flex gap-3">
        <Btn onClick={onClose}>Save URL</Btn>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      </div>
    </>
  );
}