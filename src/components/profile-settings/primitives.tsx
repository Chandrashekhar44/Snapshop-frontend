import React, { ComponentPropsWithoutRef } from "react";

export interface IconProps {
  d: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const ChevronRight: React.FC = () => <Icon d="M9 18l6-6-6-6" size={16} />;
export const X: React.FC = () => <Icon d="M18 6 6 18M6 6l12 12" size={18} />;
export const Trash: React.FC = () => <Icon d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" size={18} />;
export const Plus: React.FC = () => <Icon d="M12 5v14M5 12h14" size={18} />;
export const Upload: React.FC = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" size={18} />;
export const Eye: React.FC = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" size={18} />;
export const EyeOff: React.FC = () => <Icon d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" size={18} />;

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
}

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: string;
}

interface BtnProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "ghost" | "danger";
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">{label}</label>}
    <input
      className="w-full bg-[#0d1b2e] border border-[#1e3a5f] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] transition-colors placeholder-gray-600"
      {...props}
    />
  </div>
);

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">{label}</label>}
    <textarea
      rows={3}
      className="w-full bg-[#0d1b2e] border border-[#1e3a5f] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] transition-colors placeholder-gray-600 resize-none"
      {...props}
    />
  </div>
);

export const Btn: React.FC<BtnProps> = ({ children, variant = "primary", onClick, className = "", type = "button", ...props }) => {
  const base = "rounded-lg px-5 py-2.5 text-sm font-medium transition-all cursor-pointer";
  const styles = {
    primary: "bg-[#1a3a6b] hover:bg-[#1e4080] text-white border border-[#2563eb]",
    ghost: "bg-transparent hover:bg-[#0d1b2e] text-gray-300 border border-[#1e3a5f]",
    danger: "bg-[#3b0a0a] hover:bg-[#4c0f0f] text-red-400 border border-red-900",
  };
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};