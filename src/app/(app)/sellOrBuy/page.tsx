"use client"
import { useState } from "react";
import { FormEvent } from "react";
import axios from "axios";
export default function sellAndBuyForm(){

     const [mode, setMode] = useState<"buy" | "sell">("buy");
      const [email, setEmail] = useState("");
      const [search, setSearch] = useState("");
      const [productName, setProductName] = useState("");
      const [price, setPrice] = useState("");
      const [category, setCategory] = useState("");
      const [submitted, setSubmitted] = useState(false);
      const [loading,setLoading] = useState(false);

     const BASE_URL = "http://localhost:5000/api";

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);

  try {
    const data =
      mode === "buy"
        ? { search, category, minPrice :0, maxPrice : 0, condition :'', email }
        : { productName, category, price, condition :'', description :'', email };

    const endpoint = mode === "buy" ? "/buy" : "/sell";

    const res = await axios.post(`${BASE_URL}${endpoint}`, data);

    console.log(res.data);
    setSubmitted(true);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || "Error");
    } else {
      alert("Unexpected error");
    }
  } finally {
    setLoading(false);
  }
};


const inputBase =
    "w-full rounded-2xl px-4 py-3 text-sm outline-none text-[#050F2C] bg-[#F4EFE6]";

  const categories = [
    "Electronics","Fashion","Home & Garden","Sports","Books","Beauty","Toys","Automotive",
  ];  
  
  

const handleClick = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/auth/login",
      {
        email: "test@gmail.com",
        password: "123456",
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};





    return (<section id="features" style={{ padding: "96px 24px", background: "#F4F7FF" }}>
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-black text-[#050F2C] m-0"
              style={{ fontSize: 44, letterSpacing: "-0.03em" }}
            >
              What do you want to do?
            </h2>
            <p className="mt-[10px] text-[17px] text-[#6B7A99]">
              Choose your path — SnapShop handles the rest.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div
              className="inline-flex gap-1"
              style={{
                padding: 6,
                borderRadius: 20,
                background: "#fff",
                boxShadow: "0 2px 16px rgba(0,87,255,0.1)",
              }}
            >
              {(["buy", "sell"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setSubmitted(false); }}
                  className="border-none cursor-pointer font-extrabold transition-all duration-200"
                  style={{
                    padding: "11px 40px",
                    borderRadius: 14,
                    fontSize: 15,
                    background: mode === m ? (m === "buy" ? "#003B8E" : "#FF3D6B") : "transparent",
                    color: mode === m ? "#fff" : "#6B7A99",
                    boxShadow:
                      mode === m
                        ? `0 4px 18px ${m === "buy" ? "rgba(0,87,255,0.35)" : "rgba(255,61,107,0.35)"}`
                        : "none",
                    transform: mode === m ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {m === "buy" ? "🛍️ Buy" : "💰 Sell"}
                </button>
              ))}
            </div>
          </div>

          <div
            className="bg-white overflow-hidden"
            style={{
              borderRadius: 28,
              boxShadow: "0 20px 60px rgba(0,87,255,0.1)",
              border: "1.5px solid #003B8E",
            }}
          >
            <div
              style={{
                height: 5,
                background:
                  mode === "buy"
                    ? "linear-gradient(90deg,#003B8E,#003B8E)"
                    : "linear-gradient(90deg,#FF3D6B,#003B8E)",
              }}
            />
            <div style={{ padding: "40px 48px" }}>

              {mode === "buy" ? (
                <>
                  <div className="flex items-center gap-[14px] mb-7">
                    <div
                      className="flex items-center justify-center text-[26px]"
                      style={{ width: 52, height: 52, borderRadius: 16, background: "#EEF3FF" }}
                    >
                      🛍️
                    </div>
                    <div>
                      <div className="text-[22px] font-black text-[#050F2C]">Find your next deal</div>
                      <div className="text-[13px] text-[#6B7A99] mt-[2px]">
                        Millions of items. Unbeatable prices.
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Search Products
                        </label>
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="e.g. iPhone 14, Nike Air Max…"
                          className={inputBase}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0057FF")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={inputBase + " appearance-none"}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0057FF")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        >
                          <option value="">All Categories</option>
                          {categories.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[["Min Price (₹)", "0"], ["Max Price (₹)", "99,999"]].map(([lbl, ph]) => (
                        <div key={lbl}>
                          <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                            {lbl}
                          </label>
                          <input
                            type="number"
                            placeholder={ph}
                            className={inputBase}
                            style={{ border: "2px solid #E4EAFF" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "#0057FF")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Condition
                        </label>
                        <select
                          className={inputBase + " appearance-none"}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#0057FF")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        >
                          {["Any","New","Like New","Good","Fair"].map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputBase}
                        style={{ border: "2px solid #E4EAFF" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#0057FF")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full font-black text-base border-none cursor-pointer text-white transition-transform"
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        background: "#0057FF",
                        boxShadow: "0 6px 24px rgba(0,87,255,0.35)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      onClick={()=>{
                        
                      }}
                    >
                      {submitted ? "✅ We'll notify you!" : "🔍 Search Deals"}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-[14px] mb-7">
                    <div
                      className="flex items-center justify-center text-[26px]"
                      style={{ width: 52, height: 52, borderRadius: 16, background: "#FFF0F3" }}
                    >
                      💰
                    </div>
                    <div>
                      <div className="text-[22px] font-black text-[#050F2C]">List &amp; earn instantly</div>
                      <div className="text-[13px] text-[#6B7A99] mt-[2px]">
                        Turn your clutter into cash. Zero fees to list.
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Product Name
                        </label>
                        <input
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="What are you selling?"
                          className={inputBase}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF3D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={inputBase + " appearance-none"}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF3D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        >
                          <option value="">Select category</option>
                          {categories.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Your Price (₹)
                        </label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="Set your price"
                          className={inputBase}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF3D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          Condition
                        </label>
                        <select
                          className={inputBase + " appearance-none"}
                          style={{ border: "2px solid #E4EAFF" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#FF3D6B")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                        >
                          {["New","Like New","Good","Fair"].map((o) => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe your item — condition, specs, why you're selling…"
                        rows={3}
                        className={inputBase + " resize-none"}
                        style={{ border: "2px solid #E4EAFF" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF3D6B")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputBase}
                        style={{ border: "2px solid #E4EAFF" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#FF3D6B")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E4EAFF")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full font-black text-base border-none cursor-pointer text-white transition-transform"
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        background: "#FF3D6B",
                        boxShadow: "0 6px 24px rgba(255,61,107,0.35)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {submitted ? "Listing Created!" : "List My Item — Free"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>)
}
      