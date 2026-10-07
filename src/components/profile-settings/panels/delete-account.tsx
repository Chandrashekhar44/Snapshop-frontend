import React, { useState } from "react";
import { TextArea, Input, Btn } from "../primitives";

interface PanelProps {
  onClose: () => void;
}

export default function DeleteAccount({ onClose }: PanelProps) {
  const reasons = ["I no longer need this account", "I'm switching to a different platform", "Privacy concerns", "Too many bugs or technical issues", "Other"];
  const [selected, setSelected] = useState<string>("");
  const [other, setOther] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  return (
    <>
      {step === 0 && (
        <>
          <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-4 mb-5">
            <p className="text-red-400 text-sm font-medium mb-1">This cannot be undone</p>
            <p className="text-red-300/70 text-xs">All your shop data, listings, and order history will be permanently deleted.</p>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Why are you leaving?</p>
          {reasons.map(r => (
            <div key={r} onClick={() => setSelected(r)}
              className={`flex items-center gap-3 p-3 rounded-xl border mb-2 cursor-pointer transition-colors ${selected === r ? "border-red-700 bg-red-950/30" : "border-[#1e3a5f] hover:border-red-900"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === r ? "border-red-500" : "border-gray-600"}`}>
                {selected === r && <div className="w-2 h-2 rounded-full bg-red-500" />}
              </div>
              <span className="text-sm text-gray-200">{r}</span>
            </div>
          ))}
          {selected === "Other" && <TextArea placeholder="Tell us more…" value={other} onChange={e => setOther(e.target.value)} />}
          <div className="flex gap-3 mt-4">
            <Btn variant="danger" onClick={() => selected && setStep(1)} className={!selected ? "opacity-40 pointer-events-none" : ""}>Continue</Btn>
            <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <div className="bg-red-950/40 border border-red-900/60 rounded-xl p-4 mb-5">
            <p className="text-red-400 text-sm font-medium">Final confirmation</p>
            <p className="text-red-300/70 text-xs mt-1">Type <strong className="text-red-400">DELETE</strong> to confirm you want to permanently delete your account.</p>
          </div>
          <Input label='Type "DELETE" to confirm' value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="DELETE" />
          <div className="flex gap-3 mt-2">
            <Btn variant="danger" onClick={onClose} className={confirm !== "DELETE" ? "opacity-40 pointer-events-none" : ""}>Delete my account</Btn>
            <Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn>
          </div>
        </>
      )}
    </>
  );
}