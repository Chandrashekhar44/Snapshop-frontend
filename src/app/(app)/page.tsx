"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SnapShopLanding() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const router = useRouter();
  useEffect(() => {
  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [menuOpen]);


  

  

  const categories = [
    "Electronics","Fashion","Home & Garden","Sports","Books","Beauty","Toys","Automotive",
  ];

  const inputBase =
    "w-full rounded-2xl px-4 py-3 text-sm outline-none text-[#050F2C] bg-[#F4EFE6]";

  return (
    <div
      className="bg-white text-[#050F2C] overflow-x-hidden"
      style={{ fontFamily: "system-ui,sans-serif" }}
    >
    <nav
  className="fixed top-0 left-0 right-0 z-50 border-b border-[#E4EAFF]"
  style={{ background: "rgba(255,255,255,0.92)" }}
>
  <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">

    <span className="text-[22px] font-black tracking-[-0.04em] text-[#050F2C]">
      snap<span className="text-[#003B8E]">shop</span>
    </span>

    <div className="hidden md:flex gap-8 text-sm font-semibold">
      {["Features", "How It Works", "Categories", "Notify"].map((l) => {
        const id = l.toLowerCase().replace(/ /g, "-");

        return (
          <button
            key={l}
            onClick={() => {
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-[#6B7A99] hover:text-[#0057FF]"
          >
            {l}
          </button>
        );
      })}
    </div>

    <div className="flex items-center gap-3">

      <button
        onClick={() => router.push("/sign-in")}
        className="text-sm font-extrabold px-[22px] py-[10px] rounded-full text-white transition-transform"
        style={{
          background: "#003B8E",
          boxShadow: "0 4px 18px rgba(0,87,255,0.35)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Log In
      </button>

      {menuOpen && (
  <div className="fixed inset-0 z-[60]  ">


    <div
  className="fixed inset-0 z-[60] bg-black/60 "
      onClick={() => setMenuOpen(false)}
    />

    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[85%] max-w-[340px] bg-white rounded-2xl shadow-2xl p-6 z-[70]">

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setMenuOpen(false)}
          className="text-xl font-bold text-[#050F2C]"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-5 text-center font-semibold text-[#26282b]">

        {["Features", "How It Works", "Categories", "Notify"].map((l) => {
          const id = l.toLowerCase().replace(/ /g, "-");

          return (
            <button
              key={l}
              onClick={() => {
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });

                setMenuOpen(false);
              }}
              className="hover:text-[#0057FF] text-lg transition"
            >
              {l}
            </button>
          );
        })}

        

      </div>
    </div>
  </div>
)}


      <button
  className="md:hidden text-[#050F2C] text-2xl"
  onClick={() => setMenuOpen((prev) => !prev)}
>
  ☰
</button>


    </div>
  </div>

</nav>



      <section
        id ="features"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ paddingTop: 80 }}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: -120, right: -180, width: 620, height: 620,
            background: "linear-gradient(135deg,#0057FF 0%,#3B82F6 100%)",
            opacity: 0.08,
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: -80, left: -120, width: 400, height: 400,
            background: "linear-gradient(135deg,#FF3D6B,#FF8FAB)",
            opacity: 0.07,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.12,
            backgroundImage: "radial-gradient(circle, #0057FF 1.2px, transparent 1.2px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full mb-9"
            style={{
              background: "#EEF3FF",
              border: "1.5px solid #C7D7FF",
              padding: "6px 16px",
            }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: "#0057FF", animation: "ping 1.5s ease-in-out infinite" }}
            />
            <span className="text-[12px] font-extrabold text-[#003B8E] tracking-[0.08em] uppercase">
              Now Live · Buy &amp; Sell Instantly
            </span>
          </div>

          <div className="flex items-center justify-center relative select-none">
            <div className="relative z-[3]">
              <h1
                className="m-0 leading-none tracking-[-0.04em] text-[#050F2C]"
                style={{
                  fontSize: "clamp(70px,15vw,175px)",
                  fontWeight: 900,
                  fontFamily: "'Georgia',serif",
                }}
              >
                Snap
                <span className="text-[#003B8E] relative inline-block">
                  Shop
                  <svg
                    className="absolute left-0 w-full"
                    style={{ bottom: -4 }}
                    viewBox="0 0 320 14"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 10 Q80 2 160 10 Q240 18 316 10"
                      stroke="#000000"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>
          </div>

          <p className="mt-7 text-xl text-[#6B7A99] font-medium max-w-[440px]">
            The marketplace that moves as fast as you do.{" "}
            <strong className="text-[#003B8E]">Snap it. List it. Sell it.</strong>
          </p>

          <div className="mt-9 flex gap-4 flex-wrap justify-center">
            <button
              className="rounded-full font-extrabold text-base border-none cursor-pointer text-white transition-transform"
              style={{
                padding: "15px 36px",
                background: "#003B8E",
                boxShadow: "0 6px 28px rgba(0,87,255,0.35)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={()=>{
              router.push('/sellOrBuy')
              
            }}
            >
              🛍️ Choose here to Buy or Sell
            </button>
            
          </div>

          <div
            className="mt-12 flex items-center gap-[6px] text-[#6B7A99] text-[13px]"
            style={{ animation: "floatHand 2.5s ease-in-out infinite" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Scroll to explore
          </div>
        </div>
      </section>

     

      <section
        id="how-it-works"
        className="relative overflow-hidden"
        style={{ padding: "96px 24px", background: "#050F2C" }}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: -100, right: -100, width: 400, height: 400,
            background: "radial-gradient(circle,rgba(0,87,255,0.25),transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: -80, left: -80, width: 300, height: 300,
            background: "radial-gradient(circle,rgba(255,61,107,0.2),transparent 70%)",
          }}
        />
        <div className="max-w-[1100px] mx-auto relative">
          <div className="text-center mb-[60px]">
            <h2
              className="font-black text-white m-0"
              style={{ fontSize: 44, letterSpacing: "-0.03em" }}
            >
              How SnapShop Works
            </h2>
            <p className="mt-[10px] text-[17px]" style={{ color: "rgba(255,255,255,0.5)" }}>
              Three snaps and you're done.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "📸", title: "Snap a Photo", desc: "List any item in seconds. Our AI auto-fills details so you barely have to type.", color: "#0057FF" },
              { step: "02", icon: "🤝", title: "Match & Connect", desc: "We instantly match buyers and sellers in your area and across India.", color: "#FF3D6B" },
              { step: "03", icon: "💸", title: "Get Paid Instantly", desc: "Secure payments, buyer protection, and same-day transfers to your account.", color: "#0057FF" },
            ].map(({ step, icon, title, desc, color }) => (
              <div
                key={step}
                className="transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 24,
                  padding: 32,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = `${color}66`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  className="font-black leading-none select-none mb-3"
                  style={{ fontSize: 72, color: `${color}25` }}
                >
                  {step}
                </div>
                <div className="text-[36px] mb-3">{icon}</div>
                <div className="font-extrabold text-white mb-2" style={{ fontSize: 19 }}>{title}</div>
                <p className="text-sm m-0" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" style={{ padding: "96px 24px", background: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-[52px]">
            <h2
              className="font-black text-[#050F2C] m-0"
              style={{ fontSize: 44, letterSpacing: "-0.03em" }}
            >
              Shop by Category
            </h2>
            <p className="mt-[10px] text-[17px] text-[#6B7A99]">
              Everything you need, one marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📱", label: "Electronics", count: "2.4M+" },
              { icon: "👗", label: "Fashion", count: "5.1M+" },
              { icon: "🛋️", label: "Home & Garden", count: "1.8M+" },
              { icon: "⚽", label: "Sports", count: "900K+" },
              { icon: "📚", label: "Books", count: "3.2M+" },
              { icon: "💄", label: "Beauty", count: "1.1M+" },
              { icon: "🧸", label: "Toys", count: "780K+" },
              { icon: "🚗", label: "Automotive", count: "450K+" },
            ].map(({ icon, label, count }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-[10px] cursor-pointer transition-all duration-200"
                style={{
                  background: "#F4F7FF",
                  border: "2px solid #E4EAFF",
                  borderRadius: 20,
                  padding: "28px 16px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#0057FF";
                  el.style.background = "#EEF3FF";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 8px 28px rgba(0,87,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#E4EAFF";
                  el.style.background = "#F4F7FF";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 38 }}>{icon}</div>
                <div className="text-center">
                  <div className="font-extrabold text-[#050F2C]" style={{ fontSize: 14 }}>{label}</div>
                  <div
                    className="font-bold text-[#0057FF]"
                    style={{ fontSize: 12, marginTop: 2 }}
                  >
                    {count} items
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
       
        style={{
          padding: "80px 24px",
          background: "linear-gradient(135deg,#003B8E 0%,#003BB5 60%,#FF3D6B 100%)",
        }}
      >
          <div className="max-w-[1000px] mx-auto text-center text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            { value: "5M+", label: "Happy Users" },
            { value: "₹200Cr+", label: "Transactions" },
            { value: "4.9★", label: "App Rating" },
            { value: "0%", label: "Listing Fees" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-black" style={{ fontSize: 48 }}>{value}</div>
              <div className="font-semibold" style={{ marginTop: 4, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
       id ="notify"
       style={{ padding: "96px 24px", background: "#F4F7FF", textAlign: "center" }}>
        <h2
          className="font-black text-[#050F2C] m-0"
          style={{ fontSize: 44, letterSpacing: "-0.03em" }}
        >
          Get early access 🎉
        </h2>
        <p className="text-[#6B7A99]" style={{ marginTop: 12, fontSize: 17 }}>
          Be the first to know when we launch in your city. No spam, just good deals.
        </p>
        <div
          className="flex gap-3 mx-auto"
          style={{ marginTop: 32, maxWidth: 440 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className={inputBase + " flex-1"}
            style={{ border: "2px solid #E4EAFF" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#0057FF")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
          />
          <button
            className="font-extrabold border-none cursor-pointer text-white whitespace-nowrap transition-transform"
            style={{
              padding: "12px 28px",
              borderRadius: 14,
              fontSize: 15,
              background: "#0057FF",
              boxShadow: "0 4px 18px rgba(0,87,255,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Notify Me
          </button>
        </div>
      </section>

      <footer style={{ background: "#050F2C", padding: "64px 24px", color: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div
            className="mb-12"
            style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48 }}
          >
            <div>
              <div
                className="font-black text-white"
                style={{ fontSize: 22, letterSpacing: "-0.04em", marginBottom: 10 }}
              >
                snap<span className="text-[#0057FF]">shop</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                India's fastest growing marketplace for buying and selling everything.
              </p>
              <div className="flex gap-[10px] mt-4">
                {["𝕏","in","f","▶"].map((ic, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center font-extrabold cursor-pointer transition-all duration-150"
                    style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: "rgba(0,87,255,0.15)",
                      fontSize: 12, color: "rgba(255,255,255,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = "#0057FF";
                      el.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.background = "rgba(0,87,255,0.15)";
                      el.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {ic}
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Marketplace", links: ["Browse All","Featured Deals","New Arrivals","Flash Sales"] },
              { title: "Sellers",     links: ["Start Selling","Seller Dashboard","Pricing","Seller Stories"] },
              { title: "Support",     links: ["Help Center","Trust & Safety","Contact Us","Privacy Policy"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="font-extrabold text-white" style={{ fontSize: 13, marginBottom: 14 }}>
                  {title}
                </div>
                {links.map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="block no-underline transition-colors duration-150"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#60A5FA")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div
            className="flex justify-between items-center"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 24,
              fontSize: 12,
            }}
          >
            <span>© 2025 SnapShop Technologies Pvt. Ltd. All rights reserved.</span>
            <span>
              Made with <span className="text-[#FF3D6B]">♥</span> in India 🇮🇳
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes floatHand {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes ping {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #B0BCDB; }
      `}</style>
    </div>
  );
}
