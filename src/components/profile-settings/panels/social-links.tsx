import React from "react";
import { Input, Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

export default function EditSocialLinks({ onClose }: PanelProps) {
  return (
    <>
      <Input label="Instagram" defaultValue="@sarahnielsen" placeholder="@username" />
      <Input label="TikTok" defaultValue="@sarahnielsen" placeholder="@username" />
      <Input label="Pinterest" placeholder="@username" />
      <Input label="YouTube" placeholder="Channel URL" />
      <div className="flex gap-3 mt-6">
        <Btn onClick={onClose}>Save links</Btn>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      </div>
    </>
  );
}