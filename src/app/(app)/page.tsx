"use client";

import { useState } from "react";


export default function SnapShopLanding() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const categories = ["Electronics","Fashion","Home & Garden","Sports","Books","Beauty","Toys","Automotive"];

  const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%",
    borderRadius: 14,
    padding: "12px 16px",
    fontSize: 14,
    outline: "none",
    background: "#fff",
    border: "2px solid #E4EAFF",
    color: "#050F2C",
    ...extra,
  });

  return (
    <div style={{ background: "#fff", color: "#050F2C", fontFamily: "system-ui,sans-serif", overflowX: "hidden" }}>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E4EAFF",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "#050F2C" }}>
            snap<span style={{ color: "#0057FF" }}>shop</span>
          </span>
          <div style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 600, color: "#6B7A99" }}>
            {["Features","How It Works","Categories"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
                style={{ textDecoration: "none", color: "#6B7A99" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0057FF")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6B7A99")}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button style={{ fontSize: 14, fontWeight: 700, background: "none", border: "none", color: "#6B7A99", cursor: "pointer" }}>Log In</button>
            <button style={{
              fontSize: 14, fontWeight: 800, padding: "10px 22px", borderRadius: 999, border: "none", cursor: "pointer",
              background: "#0057FF", color: "#fff", boxShadow: "0 4px 18px rgba(0,87,255,0.35)",
              transition: "transform .15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 80, position: "relative", overflow: "hidden" }}>

        {/* Big blue circle decoration */}
        <div style={{
          position: "absolute", top: -120, right: -180, width: 620, height: 620,
          borderRadius: "50%", background: "linear-gradient(135deg,#0057FF 0%,#3B82F6 100%)",
          opacity: 0.08, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -120, width: 400, height: 400,
          borderRadius: "50%", background: "linear-gradient(135deg,#FF3D6B,#FF8FAB)",
          opacity: 0.07, pointerEvents: "none",
        }} />

        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12,
          backgroundImage: "radial-gradient(circle, #0057FF 1.2px, transparent 1.2px)",
          backgroundSize: "36px 36px",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#EEF3FF", border: "1.5px solid #C7D7FF",
            borderRadius: 999, padding: "6px 16px", marginBottom: 36,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0057FF", display: "inline-block", animation: "ping 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: "#0057FF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Now Live · Buy &amp; Sell Instantly
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", userSelect: "none" }}>

           

            <div style={{ position: "relative", zIndex: 3 }}>
              <h1 style={{
                fontSize: "clamp(70px,15vw,175px)",
                fontWeight: 900,
                fontFamily: "'Georgia',serif",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "#050F2C",
                margin: 0,
              }}>
                Snap
                <span style={{ color: "#0057FF", position: "relative", display: "inline-block" }}>
                  Shop
                  <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }} viewBox="0 0 320 14" fill="none" preserveAspectRatio="none">
                    <path d="M4 10 Q80 2 160 10 Q240 18 316 10" stroke="#FF3D6B" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
            </div>

           
          </div>

          <p style={{ marginTop: 28, fontSize: 20, color: "#6B7A99", fontWeight: 500, maxWidth: 440 }}>
            The marketplace that moves as fast as you do.{" "}
            <strong style={{ color: "#0057FF" }}>Snap it. List it. Sell it.</strong>
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{
              padding: "15px 36px", borderRadius: 999, fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer",
              background: "#0057FF", color: "#fff", boxShadow: "0 6px 28px rgba(0,87,255,0.35)", transition: "transform .15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
              🛍️ Start Buying
            </button>
            <button style={{
              padding: "15px 36px", borderRadius: 999, fontWeight: 800, fontSize: 16, cursor: "pointer",
              background: "#fff", border: "2.5px solid #FF3D6B", color: "#FF3D6B", transition: "transform .15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
              💰 Start Selling
            </button>
          </div>

          <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 6, color: "#6B7A99", fontSize: 13, animation: "floatHand 2.5s ease-in-out infinite" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Scroll to explore
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: "96px 24px", background: "#F4F7FF" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: "#050F2C", letterSpacing: "-0.03em", margin: 0 }}>What do you want to do?</h2>
            <p style={{ marginTop: 10, fontSize: 17, color: "#6B7A99" }}>Choose your path — SnapShop handles the rest.</p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", padding: 6, borderRadius: 20, background: "#fff", boxShadow: "0 2px 16px rgba(0,87,255,0.1)", gap: 4 }}>
              {(["buy","sell"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setSubmitted(false); }}
                  style={{
                    padding: "11px 40px", borderRadius: 14, fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer",
                    transition: "all .2s",
                    background: mode === m ? (m === "buy" ? "#0057FF" : "#FF3D6B") : "transparent",
                    color: mode === m ? "#fff" : "#6B7A99",
                    boxShadow: mode === m ? `0 4px 18px ${m==="buy"?"rgba(0,87,255,0.35)":"rgba(255,61,107,0.35)"}` : "none",
                    transform: mode === m ? "scale(1.04)" : "scale(1)",
                  }}>
                  {m === "buy" ? "🛍️ Buy" : "💰 Sell"}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            background: "#fff", borderRadius: 28, overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,87,255,0.1)", border: "1.5px solid #E4EAFF",
          }}>
            <div style={{ height: 5, background: mode === "buy" ? "linear-gradient(90deg,#0057FF,#60A5FA)" : "linear-gradient(90deg,#FF3D6B,#FF8FAB)" }} />
            <div style={{ padding: "40px 48px" }}>

              {mode === "buy" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🛍️</div>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#050F2C" }}>Find your next deal</div>
                      <div style={{ fontSize: 13, color: "#6B7A99", marginTop: 2 }}>Millions of items. Unbeatable prices.</div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Search Products</label>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. iPhone 14, Nike Air Max…" style={inp()}
                          onFocus={e => (e.currentTarget.style.borderColor = "#0057FF")}
                          onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} style={inp({ appearance: "none" } as React.CSSProperties)}>
                          <option value="">All Categories</option>
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      {[["Min Price (₹)","0"],["Max Price (₹)","99,999"]].map(([lbl,ph]) => (
                        <div key={lbl}>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lbl}</label>
                          <input type="number" placeholder={ph} style={inp()}
                            onFocus={e => (e.currentTarget.style.borderColor = "#0057FF")}
                            onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                        </div>
                      ))}
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Condition</label>
                        <select style={inp({ appearance: "none" } as React.CSSProperties)}>
                          {["Any","New","Like New","Good","Fair"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inp()}
                        onFocus={e => (e.currentTarget.style.borderColor = "#0057FF")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                    </div>
                    <button type="submit" style={{
                      padding: "16px", borderRadius: 16, fontWeight: 900, fontSize: 16, border: "none", cursor: "pointer",
                      background: "#0057FF", color: "#fff", boxShadow: "0 6px 24px rgba(0,87,255,0.35)", transition: "transform .15s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                      {submitted ? "✅ We'll notify you!" : "🔍 Search Deals"}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: "#FFF0F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>💰</div>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 900, color: "#050F2C" }}>List &amp; earn instantly</div>
                      <div style={{ fontSize: 13, color: "#6B7A99", marginTop: 2 }}>Turn your clutter into cash. Zero fees to list.</div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Name</label>
                        <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="What are you selling?" style={inp()}
                          onFocus={e => (e.currentTarget.style.borderColor = "#FF3D6B")}
                          onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} style={inp({ appearance: "none" } as React.CSSProperties)}>
                          <option value="">Select category</option>
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Price (₹)</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Set your price" style={inp()}
                          onFocus={e => (e.currentTarget.style.borderColor = "#FF3D6B")}
                          onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Condition</label>
                        <select style={inp({ appearance: "none" } as React.CSSProperties)}>
                          {["New","Like New","Good","Fair"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</label>
                      <textarea placeholder="Describe your item — condition, specs, why you're selling…" rows={3}
                        style={{ ...inp(), resize: "none" }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#FF3D6B")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#6B7A99", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inp()}
                        onFocus={e => (e.currentTarget.style.borderColor = "#FF3D6B")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
                    </div>
                    <button type="submit" style={{
                      padding: "16px", borderRadius: 16, fontWeight: 900, fontSize: 16, border: "none", cursor: "pointer",
                      background: "#FF3D6B", color: "#fff", boxShadow: "0 6px 24px rgba(255,61,107,0.35)", transition: "transform .15s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                      {submitted ? "✅ Listing Created!" : "🚀 List My Item — Free"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{ padding: "96px 24px", background: "#050F2C", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,87,255,0.25),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,61,107,0.2),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: 0 }}>How SnapShop Works</h2>
            <p style={{ marginTop: 10, fontSize: 17, color: "rgba(255,255,255,0.5)" }}>Three snaps and you're done.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { step: "01", icon: "📸", title: "Snap a Photo", desc: "List any item in seconds. Our AI auto-fills details so you barely have to type.", color: "#0057FF" },
              { step: "02", icon: "🤝", title: "Match & Connect", desc: "We instantly match buyers and sellers in your area and across India.", color: "#FF3D6B" },
              { step: "03", icon: "💸", title: "Get Paid Instantly", desc: "Secure payments, buyer protection, and same-day transfers to your account.", color: "#0057FF" },
            ].map(({ step, icon, title, desc, color }) => (
              <div key={step} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24, padding: 32, transition: "transform .2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${color}66`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <div style={{ fontSize: 72, fontWeight: 900, color: `${color}25`, lineHeight: 1, marginBottom: 12, userSelect: "none" }}>{step}</div>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" style={{ padding: "96px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, color: "#050F2C", letterSpacing: "-0.03em", margin: 0 }}>Shop by Category</h2>
            <p style={{ marginTop: 10, fontSize: 17, color: "#6B7A99" }}>Everything you need, one marketplace.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
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
              <div key={label} style={{
                background: "#F4F7FF", border: "2px solid #E4EAFF",
                borderRadius: 20, padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                cursor: "pointer", transition: "all .2s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor="#0057FF"; el.style.background="#EEF3FF"; el.style.transform="translateY(-4px)"; el.style.boxShadow="0 8px 28px rgba(0,87,255,0.15)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor="#E4EAFF"; el.style.background="#F4F7FF"; el.style.transform="translateY(0)"; el.style.boxShadow="none"; }}>
                <div style={{ fontSize: 38 }}>{icon}</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#050F2C" }}>{label}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0057FF", marginTop: 2 }}>{count} items</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#0057FF 0%,#003BB5 60%,#FF3D6B 100%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center", color: "#fff" }}>
          {[
            { value: "5M+", label: "Happy Users" },
            { value: "₹200Cr+", label: "Transactions" },
            { value: "4.9★", label: "App Rating" },
            { value: "0%", label: "Listing Fees" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: 48, fontWeight: 900 }}>{value}</div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "96px 24px", background: "#F4F7FF", textAlign: "center" }}>
        <h2 style={{ fontSize: 44, fontWeight: 900, color: "#050F2C", letterSpacing: "-0.03em", margin: 0 }}>Get early access 🎉</h2>
        <p style={{ marginTop: 12, fontSize: 17, color: "#6B7A99" }}>Be the first to know when we launch in your city. No spam, just good deals.</p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, maxWidth: 440, margin: "32px auto 0" }}>
          <input type="email" placeholder="Enter your email" style={{ ...inp(), flex: 1 }}
            onFocus={e => (e.currentTarget.style.borderColor = "#0057FF")}
            onBlur={e => (e.currentTarget.style.borderColor = "#E4EAFF")} />
          <button style={{
            padding: "12px 28px", borderRadius: 14, fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer",
            background: "#0057FF", color: "#fff", whiteSpace: "nowrap", boxShadow: "0 4px 18px rgba(0,87,255,0.35)", transition: "transform .15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
            Notify Me
          </button>
        </div>
      </section>

      <footer style={{ background: "#050F2C", padding: "64px 24px", color: "rgba(255,255,255,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", marginBottom: 10 }}>
                snap<span style={{ color: "#0057FF" }}>shop</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>India's fastest growing marketplace for buying and selling everything.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                {["𝕏","in","f","▶"].map((ic,i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: 10, background: "rgba(0,87,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800,
                    color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all .15s",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background="#0057FF"; el.style.color="#fff"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background="rgba(0,87,255,0.15)"; el.style.color="rgba(255,255,255,0.5)"; }}>
                    {ic}
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Marketplace", links: ["Browse All","Featured Deals","New Arrivals","Flash Sales"] },
              { title: "Sellers", links: ["Start Selling","Seller Dashboard","Pricing","Seller Stories"] },
              { title: "Support", links: ["Help Center","Trust & Safety","Contact Us","Privacy Policy"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", marginBottom: 14 }}>{title}</div>
                {links.map(l => (
                  <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 8, transition: "color .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#60A5FA")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
            <span>© 2025 SnapShop Technologies Pvt. Ltd. All rights reserved.</span>
            <span>Made with <span style={{ color: "#FF3D6B" }}>♥</span> in India 🇮🇳</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes floatHand {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes ping {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.4); }
        }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #B0BCDB; }
      `}</style>
    </div>
  );
}
