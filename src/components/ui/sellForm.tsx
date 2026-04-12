import { FormEvent } from "react";

type Props = {
  productName: string;
  setProductName: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  categories: string[];
  price: string;
  setPrice: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  submitted: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputBase: string;
};

export default function SellForm({
  productName,
  setProductName,
  category,
  setCategory,
  categories,
  price,
  setPrice,
  email,
  setEmail,
  submitted,
  handleSubmit,
  inputBase,
}: Props) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-[14px] mb-7">
        <div
          className="flex items-center justify-center text-[26px]"
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "#FFF0F3",
          }}
        >
          💰
        </div>
        <div>
          <div className="text-[22px] font-black text-[#050F2C]">
            List & earn instantly
          </div>
          <div className="text-[13px] text-[#6B7A99] mt-[2px]">
            Turn your clutter into cash. Zero fees to list.
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Product Name</label>
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="What are you selling?"
              className={inputBase}
            />
          </div>

          <div>
            <label className="label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputBase + " appearance-none"}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Your Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Set your price"
              className={inputBase}
            />
          </div>

          <div>
            <label className="label">Condition</label>
            <select className={inputBase + " appearance-none"}>
              {["New", "Like New", "Good", "Fair"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            placeholder="Describe your item — condition, specs, why you're selling…"
            rows={3}
            className={inputBase + " resize-none"}
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputBase}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full font-black text-base text-white transition-transform"
          style={{
            padding: 16,
            borderRadius: 16,
            background: "#FF3D6B",
            boxShadow: "0 6px 24px rgba(255,61,107,0.35)",
          }}
        >
          {submitted ? "✅ Listing Created!" : "🚀 List My Item — Free"}
        </button>
      </form>
    </>
  );
}
