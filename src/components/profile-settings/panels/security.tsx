import React, { useState } from "react";
import { Eye, EyeOff, Btn } from "../primitives";
import axios from "../../../lib/axios";

interface PanelProps {
  onClose: () => void;
}

type PwKeys = "cur" | "n" | "c";

interface PasswordState {
  cur: string;
  n: string;
  c: string;
}
interface PwInputProps {
  label: string;
  k: PwKeys;
  value: string;
  show: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
  error?: boolean;
  errorMessage?: string;
}
import { useRef } from "react";

const PwInput: React.FC<PwInputProps> = ({
  label,
  value,
  show,
  onChange,
  onToggle,
  error = false,
  errorMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    onToggle();

    requestAnimationFrame(() => {
      input.focus();
      if (start !== null && end !== null) {
        input.setSelectionRange(start, end);
      }
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">
        {label}
      </label>

      <div
        className={`flex items-center bg-[#0d1b2e] rounded-lg overflow-hidden transition-colors border ${
          error
            ? "border-red-500"
            : "border-[#1e3a5f] focus-within:border-[#2563eb]"
        }`}
      >
        <input
          ref={inputRef}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none"
        />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleToggle}
          className="px-3 text-gray-500 hover:text-white transition-colors"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
export const EditPassword: React.FC<PanelProps> = ({ onClose }) => {
  const [passwords, setPasswords] = useState<PasswordState>({
    cur: "",
    n: "",
    c: "",
  });

  const [show, setShow] = useState<Record<PwKeys, boolean>>({
    cur: false,
    n: false,
    c: false,
  });

  const handleChange = (key: PwKeys, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleShow = (key: PwKeys) => {
    setShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const editHandler = async () => {
    if (!passwords.cur || !passwords.n || !passwords.c) {
      alert("Please fill all fields.");
      return;
    }

    if (passwords.n !== passwords.c) {
      alert("New passwords do not match.");
      return;
    }

    try {
      await axios.patch("/api/auth/change-password", {
        currentPassword: passwords.cur,
        newPassword: passwords.n,
      });

      alert("Password updated successfully.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update password.");
    }
  };

  const passwordsMatch =
  passwords.c === "" || passwords.n === passwords.c;

 

  return (
    <>
      <PwInput
  label="Current Password"
  k="cur"
  value={passwords.cur}
  show={show.cur}
  onChange={(value) => handleChange("cur", value)}
  onToggle={() => toggleShow("cur")}
/>

 <PwInput
  label="New Password"
  k="n"
  value={passwords.n}
  show={show.n}
  onChange={(value) => handleChange("n", value)}
  onToggle={() => toggleShow("n")}
/>



<PwInput
  label="Confirm New Password"
  k="c"
  value={passwords.c}
  show={show.c}
  onChange={(value) => handleChange("c", value)}
  onToggle={() => toggleShow("c")}
  error={!passwordsMatch}
  errorMessage="Passwords do not match."
/>

      <p className="text-xs text-gray-500 mb-6">
        Minimum 8 characters with at least one number and one special symbol.
      </p>

      <div className="flex gap-3">
        <Btn onClick={editHandler}>Update Password</Btn>

        <Btn variant="ghost" onClick={onClose}>
          Cancel
        </Btn>
      </div>
    </>
  );
};

export const EditTwoFactor: React.FC<PanelProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0);
  const [method, setMethod] = useState<"app" | "sms">("app");
  const [code, setCode] = useState<string>("");
  
  return (
    <>
      {step === 0 && (
        <>
          <p className="text-sm text-gray-300 mb-5">Choose how you'd like to receive your verification codes.</p>
          {(["app", "sms"] as const).map(m => (
            <div key={m} onClick={() => setMethod(m)}
              className={`flex items-center gap-3 p-3 rounded-xl border mb-3 cursor-pointer transition-colors ${method === m ? "border-[#2563eb] bg-[#0d1b2e]" : "border-[#1e3a5f] hover:border-[#2563eb]/40"}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === m ? "border-[#2563eb]" : "border-gray-600"}`}>
                {method === m && <div className="w-2 h-2 rounded-full bg-[#2563eb]" />}
              </div>
              <div>
                <p className="text-sm text-white font-medium">{m === "app" ? "Authenticator app" : "SMS to phone"}</p>
                <p className="text-xs text-gray-500">{m === "app" ? "Google Authenticator, Authy, etc." : "We'll text a code to your number"}</p>
              </div>
            </div>
          ))}
          <Btn className="mt-4 w-full" onClick={() => setStep(1)}>Continue</Btn>
        </>
      )}
      {step === 1 && (
        <>
          <p className="text-sm text-gray-300 mb-5">{method === "app" ? "Scan the QR code with your authenticator app, then enter the 6-digit code below." : "We sent a 6-digit code to your phone. Enter it below."}</p>
          {method === "app" && (
            <div className="bg-white rounded-xl p-4 flex items-center justify-center mb-5 w-32 h-32 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
                <rect x="0" y="0" width="40" height="40" rx="4" fill="#081422" />
                <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
                <rect x="60" y="0" width="40" height="40" rx="4" fill="#081422" />
                <rect x="70" y="10" width="20" height="20" rx="2" fill="white" />
                <rect x="0" y="60" width="40" height="40" rx="4" fill="#081422" />
                <rect x="10" y="70" width="20" height="20" rx="2" fill="white" />
                <rect x="50" y="50" width="10" height="10" fill="#081422" />
                <rect x="65" y="50" width="10" height="10" fill="#081422" />
                <rect x="80" y="50" width="15" height="10" fill="#081422" />
                <rect x="50" y="65" width="15" height="10" fill="#081422" />
                <rect x="75" y="65" width="20" height="10" fill="#081422" />
                <rect x="50" y="80" width="10" height="15" fill="#081422" />
                <rect x="70" y="80" width="25" height="15" fill="#081422" />
              </svg>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">6-digit code</label>
            <input maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full bg-[#0d1b2e] border border-[#1e3a5f] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] transition-colors tracking-[0.4em] text-center placeholder-gray-600" />
          </div>
          <div className="flex gap-3">
            <Btn onClick={onClose} className={code.length < 6 ? "opacity-40 pointer-events-none" : ""}>Enable 2FA</Btn>
            <Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn>
          </div>
        </>
      )}
    </>
  );
};

export const EditOrderManagement: React.FC<PanelProps> = ({ onClose }) => {
  const orders = [
    { id: "#4821", customer: "Jordan L.", item: "Linen tote bag", status: "awaiting shipment" },
    { id: "#4820", customer: "Priya M.", item: "Ceramic mug set", status: "payment pending" },
    { id: "#4819", customer: "Tom K.", item: "Knit throw blanket", status: "awaiting shipment" },
  ];
  return (
    <>
      <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Awaiting action</p>
      {orders.map(o => (
        <div key={o.id} className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-xl p-3 mb-3">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm text-white font-medium">{o.id}</span>
            <span className="text-xs bg-[#1a3a6b] text-blue-300 px-2 py-0.5 rounded-full border border-[#2563eb]/30">{o.status}</span>
          </div>
          <p className="text-xs text-gray-400">{o.customer} · {o.item}</p>
          <div className="flex gap-2 mt-2">
            <button className="text-xs text-[#2563eb] hover:text-blue-300 transition-colors">Mark shipped</button>
            <span className="text-gray-600">·</span>
            <button className="text-xs text-gray-400 hover:text-white transition-colors">View details</button>
          </div>
        </div>
      ))}
      <Btn variant="ghost" onClick={onClose} className="mt-2">Close</Btn>
    </>
  );
};