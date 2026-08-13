"use client";
import { useState } from "react";

// ── tiny icon helpers ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={16} />;
const X = () => <Icon d="M18 6 6 18M6 6l12 12" size={18} />;
const Check = () => <Icon d="M20 6 9 17l-5-5" size={18} />;
const Eye = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" size={18} />;
const EyeOff = () => <Icon d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" size={18} />;
const Upload = () => <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" size={18} />;
const Plus = () => <Icon d="M12 5v14M5 12h14" size={18} />;
const Trash = () => <Icon d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" size={18} />;

// ── reusable primitives ────────────────────────────────────────────────────────
const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">{label}</label>}
    <input
      className="w-full bg-[#0d1b2e] border border-[#1e3a5f] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] transition-colors placeholder-gray-600"
      {...props}
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">{label}</label>}
    <textarea
      rows={3}
      className="w-full bg-[#0d1b2e] border border-[#1e3a5f] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] transition-colors placeholder-gray-600 resize-none"
      {...props}
    />
  </div>
);

const Btn = ({ children, variant = "primary", onClick, className = "", type = "button" }) => {
  const base = "rounded-lg px-5 py-2.5 text-sm font-medium transition-all cursor-pointer";
  const styles = {
    primary: "bg-[#1a3a6b] hover:bg-[#1e4080] text-white border border-[#2563eb]",
    ghost: "bg-transparent hover:bg-[#0d1b2e] text-gray-300 border border-[#1e3a5f]",
    danger: "bg-[#3b0a0a] hover:bg-[#4c0f0f] text-red-400 border border-red-900",
  };
  return <button type={type} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>{children}</button>;
};

// ── Drawer shell ──────────────────────────────────────────────────────────────
const Drawer = ({ title, open, onClose, children }) => (
  <>
    {/* backdrop */}
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    />
    {/* panel */}
    <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-[#081422] border-l border-[#1e3a5f] z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e3a5f]">
        <span className="text-white font-semibold text-base">{title}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
    </div>
  </>
);

// ── individual edit panels ─────────────────────────────────────────────────────

function EditPersonalInfo({ onClose }) {
  return (
    <>
      <Input label="Full name" defaultValue="Sarah Nielsen" />
      <Input label="Email" type="email" defaultValue="sarah@example.com" />
      <Input label="Phone" type="tel" defaultValue="+1 555 000 1234" />
      <div className="flex gap-3 mt-6">
        <Btn onClick={onClose}>Save changes</Btn>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      </div>
    </>
  );
}

function EditAddressBook({ onClose }) {
  const [addresses, setAddresses] = useState([
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
          <button onClick={() => setAddresses(addresses.filter(x => x.id !== a.id))} className="text-gray-500 hover:text-red-400 ml-3 mt-0.5 transition-colors"><Trash /></button>
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

function EditPaymentMethods({ onClose }) {
  const [cards] = useState([
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
          <button className="text-gray-500 hover:text-red-400 transition-colors"><Trash /></button>
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

function EditShopDetails({ onClose }) {
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

function EditShopURL({ onClose }) {
  const [slug, setSlug] = useState("sarahnielsen");
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

function EditSocialLinks({ onClose }) {
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

function EditNotifications({ onClose }) {
  const [prefs, setPrefs] = useState({
    orderUpdates: true,
    promotions: true,
    newOrders: true,
    shipping: false,
  });
  const toggle = (k) => setPrefs(p => ({ ...p, [k]: !p[k] }));
  const Row = ({ label, desc, k }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#1e3a5f] last:border-0">
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => toggle(k)}
        className={`relative w-11 h-6 rounded-full transition-colors ${prefs[k] ? "bg-[#1a3a6b] border border-[#2563eb]" : "bg-[#0d1b2e] border border-[#1e3a5f]"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform bg-white ${prefs[k] ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
  return (
    <>
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-medium">Push notifications</p>
      <div className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-xl px-4 mb-5">
        <Row label="Order updates" desc="Status changes on your purchases" k="orderUpdates" />
        <Row label="Promotions" desc="Deals and offers from your shops" k="promotions" />
      </div>
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-widest font-medium">Order alerts</p>
      <div className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-xl px-4 mb-5">
        <Row label="New orders" desc="When a customer places an order" k="newOrders" />
        <Row label="Shipping updates" desc="Tracking and delivery notifications" k="shipping" />
      </div>
      <Btn onClick={onClose}>Save preferences</Btn>
    </>
  );
}

function EditPassword({ onClose }) {
  const [show, setShow] = useState({ cur: false, n: false, c: false });
  const PwInput = ({ label, k }) => (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-widest">{label}</label>
      <div className="flex items-center bg-[#0d1b2e] border border-[#1e3a5f] rounded-lg overflow-hidden focus-within:border-[#2563eb] transition-colors">
        <input type={show[k] ? "text" : "password"} placeholder="••••••••"
          className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none" />
        <button onClick={() => setShow(s => ({ ...s, [k]: !s[k] }))} className="px-3 text-gray-500 hover:text-white transition-colors">
          {show[k] ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
  return (
    <>
      <PwInput label="Current password" k="cur" />
      <PwInput label="New password" k="n" />
      <PwInput label="Confirm new password" k="c" />
      <p className="text-xs text-gray-500 mb-6">Minimum 8 characters with at least one number and symbol.</p>
      <div className="flex gap-3">
        <Btn onClick={onClose}>Update password</Btn>
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
      </div>
    </>
  );
}

function EditTwoFactor({ onClose }) {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("app");
  const [code, setCode] = useState("");
  return (
    <>
      {step === 0 && (
        <>
          <p className="text-sm text-gray-300 mb-5">Choose how you'd like to receive your verification codes.</p>
          {["app", "sms"].map(m => (
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
}

function EditOrderManagement({ onClose }) {
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
}

function DeleteAccount({ onClose }) {
  const reasons = [
    "I no longer need this account",
    "I'm switching to a different platform",
    "Privacy concerns",
    "Too many bugs or technical issues",
    "Other",
  ];
  const [selected, setSelected] = useState("");
  const [other, setOther] = useState("");
  const [confirm, setConfirm] = useState("");
  const [step, setStep] = useState(0);

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
          {selected === "Other" && (
            <TextArea placeholder="Tell us more…" value={other} onChange={e => setOther(e.target.value)} />
          )}
          <div className="flex gap-3 mt-4">
            <Btn variant="danger" onClick={() => selected && setStep(1)}
              className={!selected ? "opacity-40 pointer-events-none" : ""}>
              Continue
            </Btn>
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
            <Btn variant="danger" onClick={onClose}
              className={confirm !== "DELETE" ? "opacity-40 pointer-events-none" : ""}>
              Delete my account
            </Btn>
            <Btn variant="ghost" onClick={() => setStep(0)}>Back</Btn>
          </div>
        </>
      )}
    </>
  );
}

export default function ProfileSettings() {
  const [active, setActive] = useState(null);

  const open = (id) => setActive(id);
  const close = () => setActive(null);

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-semibold mb-1.5 px-1">{title}</p>
      <div className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );

  const Row = ({ label, sub, id, danger }) => (
    <button
      onClick={() => open(id)}
      className={`w-full flex items-center justify-between px-4 py-3.5 border-b border-[#1e3a5f] last:border-0 hover:bg-[#111f33] transition-colors text-left group`}
    >
      <div>
        <p className={`text-sm font-medium ${danger ? "text-red-400" : "text-white"}`}>{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      <span className={`transition-transform group-hover:translate-x-0.5 ${danger ? "text-red-600" : "text-gray-600"}`}>
        <ChevronRight />
      </span>
    </button>
  );

  const panels = {
    personalInfo: { title: "Personal info", content: <EditPersonalInfo onClose={close} /> },
    addressBook: { title: "Address book", content: <EditAddressBook onClose={close} /> },
    paymentMethods: { title: "Payment methods", content: <EditPaymentMethods onClose={close} /> },
    shopDetails: { title: "Shop details", content: <EditShopDetails onClose={close} /> },
    productCatalogue: { title: "Product catalogue", content: <div className="text-gray-400 text-sm">Manage your 128 active listings in the full catalogue view.</div> },
    orderManagement: { title: "Order management", content: <EditOrderManagement onClose={close} /> },
    shopURL: { title: "Shop URL", content: <EditShopURL onClose={close} /> },
    socialLinks: { title: "Social links", content: <EditSocialLinks onClose={close} /> },
    notifications: { title: "Notifications", content: <EditNotifications onClose={close} /> },
    changePassword: { title: "Change password", content: <EditPassword onClose={close} /> },
    twoFactor: { title: "Two-factor auth", content: <EditTwoFactor onClose={close} /> },
    deleteAccount: { title: "Delete account", content: <DeleteAccount onClose={close} /> },
  };

  return (
    <div className="min-h-screen bg-[#060e18] text-white font-sans">
      <div className="max-w-sm mx-auto px-4 pt-12 pb-24">
        {/* header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#1a3a6b] border border-[#2563eb] flex items-center justify-center text-sm font-semibold text-blue-200">SN</div>
          <div>
            <p className="text-white font-semibold">Sarah Nielsen</p>
            <p className="text-xs text-gray-400">snap.shop/sarahnielsen</p>
          </div>
        </div>

        <Section title="Account">
          <Row label="Personal info" sub="Name, email, phone" id="personalInfo" />
          <Row label="Address book" sub="3 saved addresses" id="addressBook" />
          <Row label="Payment methods" sub="2 cards on file" id="paymentMethods" />
        </Section>

        <Section title="Shop">
          <Row label="Shop details" sub="Name, bio, logo" id="shopDetails" />
          <Row label="Product catalogue" sub="128 active listings" id="productCatalogue" />
          <Row label="Order management" sub="12 awaiting action" id="orderManagement" />
          <Row label="Shop URL" sub="snap.shop/sarahnielsen" id="shopURL" />
          <Row label="Social links" sub="Instagram · TikTok" id="socialLinks" />
        </Section>

        <Section title="Notifications">
          <Row label="Push notifications" sub="Order updates, promotions" id="notifications" />
          <Row label="Order alerts" sub="New orders & shipping" id="notifications" />
        </Section>

        <Section title="Security">
          <Row label="Change password" sub="Last changed 3 months ago" id="changePassword" />
          <Row label="Two-factor auth" sub="Extra login security" id="twoFactor" />
        </Section>

        <Section title="Danger zone">
          <button
            onClick={() => open("deleteAccount")}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-red-950/20 transition-colors text-left group"
          >
            <div>
              <p className="text-sm font-medium text-red-400">Delete account</p>
              <p className="text-xs text-red-900 mt-0.5">This cannot be undone</p>
            </div>
            <span className="text-red-800 group-hover:translate-x-0.5 transition-transform"><ChevronRight /></span>
          </button>
        </Section>

        <button className="w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors mt-2 py-2">
          Sign out
        </button>
      </div>

      {/* drawers */}
      {Object.entries(panels).map(([id, { title, content }]) => (
        <Drawer key={id} title={title} open={active === id} onClose={close}>
          {content}
        </Drawer>
      ))}
    </div>
  );
}
