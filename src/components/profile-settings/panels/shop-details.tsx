import React from "react";
import { Upload, Input, TextArea, Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

export default function EditShopDetails({ onClose }: PanelProps) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Shop logo</label>
        <div className="border-2 border-dashed border-[#1e3a5f] rounded-xl h-28 flex flex-col items-center justify-center text-gray-500 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer gap-2">
          <Upload />
          <span className="text-xs">Click to upload</span>
        </div>
      </div>
      <Input label="Shop name" defaultValue="Sarah's Boutique" />
      <TextArea label="Bio" defaultValue="Handcrafted goods made with love ✦" />
      <div className="flex gap-3 mt-6">
        <Btn onClick={onClose}>Save changes</Btn>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      </div>
    </>
  );
}