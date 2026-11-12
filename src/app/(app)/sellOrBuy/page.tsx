"use client"
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
export default function sellAndBuyForm(){

     const [mode, setMode] = useState<"BUYER" | "SELLER">("BUYER");
      const [email, setEmail] = useState("");
      const [search, setSearch] = useState("");
      const [productName, setProductName] = useState("");
      const [price, setPrice] = useState("");
      const [category, setCategory] = useState("");
      const [submitted, setSubmitted] = useState(false);
      const [loading,setLoading] = useState(false);
      const [images, setImages] = useState<File[]>([]);
      const [Error,setError] = useState("");
      const [uploading, setUploading] = useState(false);
      const [creatingProduct, setCreatingProduct] = useState(false);
      const [uploadedImages, setUploadedImages] = useState<string[]>([]);
      const router = useRouter();
      const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);

    if (newValue) {
      router.push("/searchBar");
    } else {
      router.back();
    }
  }

       
const userMode = async()=>{

const currUser = await axios.get("/api/auth/me",{
    withCredentials:true
  })
 

  setMode(currUser.data.data.role);

   
  

}
useEffect(()=>{
  userMode();
   
},[])



const photoupload = async () => {
  try {
    setUploading(true);
    console.log("clicked upload button")

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const res = await axios.post(
      "/api/products/uploadImage",
      formData,
      {
        withCredentials: true,
      }
    );

    console.log("final",res.data);
    setUploadedImages(res.data.imageUrls);

  } catch(error) {
    console.log(error);
  } finally {
    setUploading(false);
  }
};


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  

  try {

    if (mode === "BUYER") {

      console.log("Buyer searching:", search);

      router.push(`/productSearch?search=${search}`);

    } else {

      console.log("Seller adding product");

       setCreatingProduct(true);


      const data = {
        productName,
        price,
        category,
        images:uploadedImages
        
      };

      await axios.post(
        "/api/products/sell/adding-product",
        data,
        {
          withCredentials: true
        }
      );

      console.log("Product added successfully");
    }

  } catch(error) {
    console.log(error);
  }finally{
    setCreatingProduct(false);
    setSubmitted(true);
  }
};




const inputBase =
    "w-full rounded-2xl px-4 py-3 text-sm outline-none text-[#050F2C] bg-[#F4EFE6]";

  const categories = [
    "Electronics","Fashion","Home & Garden","Sports","Books","Beauty","Toys","Automotive",
  ];  
  
  
    return (
  <section id="features" className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <Label htmlFor="airplane-mode" className="cursor-pointer text-sm font-medium text-slate-700">
            Request Product
          </Label>
          <Switch id="airplane-mode" checked={enabled} onCheckedChange={handleToggle} />
        </div>
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 md:grid-cols-5">
        <div
          className={
            "flex flex-col justify-between p-8 text-white sm:p-10 md:col-span-2 " +
            (mode === "BUYER" ? "bg-[#003B8E]" : "bg-[#0B1B3F]")
          }
        >
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              {mode === "BUYER" ? "🛍️" : "💰"}
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              {mode === "BUYER" ? "Shop in Snap" : "Sell in Snap"}
            </h2>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-white/75">
              {mode === "BUYER"
                ? "Start searching. SnapShop handles the rest."
                : "Turn your clutter into cash. Zero fees to list."}
            </p>
          </div>

          <ul className="mt-10 space-y-3 text-sm text-white/90">
            {(mode === "BUYER"
              ? [
                  "Tell us what you want and your budget",
                  "We match you with sellers",
                  "Get notified by email",
                ]
              : [
                  "List in under a minute",
                  "Add photos to sell faster",
                  "Buyers reach you by email",
                ]
            ).map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span
                  className={
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold " +
                    (mode === "BUYER" ? "bg-white text-[#003B8E]" : "bg-[#FF3D6B] text-white")
                  }
                >
                  ✓
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 sm:p-10 md:col-span-3">
          {mode === "BUYER" ? (
            <>
              <h3 className="text-2xl font-extrabold text-slate-900">Find your deal</h3>
              <p className="mt-1 text-sm text-slate-500">Millions of items. Unbeatable prices.</p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 flex flex-col gap-5 [&_input]:h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:bg-slate-50 [&_input]:px-4 [&_input]:text-sm [&_input]:text-slate-900 [&_input]:outline-none [&_input]:transition [&_input:focus]:border-[#003B8E] [&_input:focus]:bg-white [&_input:focus]:ring-4 [&_input:focus]:ring-[#003B8E]/10 [&_select]:h-12 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-slate-200 [&_select]:bg-slate-50 [&_select]:px-4 [&_select]:text-sm [&_select]:text-slate-900 [&_select]:outline-none [&_select]:transition [&_select:focus]:border-[#003B8E] [&_select:focus]:bg-white [&_select:focus]:ring-4 [&_select:focus]:ring-[#003B8E]/10"
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Search products</label>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. iPhone 14, Nike Air Max…"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">All categories</option>
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Condition</label>
                    <select>
                      {["Any", "New", "Like New", "Good", "Fair"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Min price (₹)</label>
                    <input type="number" placeholder="0" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Max price (₹)</label>
                    <input type="number" placeholder="99,999" />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Your email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 h-12 w-full rounded-xl bg-[#003B8E] text-base font-bold text-white shadow-lg shadow-[#003B8E]/25 transition hover:bg-[#002f72] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#003B8E]/30"
                >
                  {submitted ? "We'll notify you!" : "Search deals"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-extrabold text-slate-900">List &amp; earn instantly</h3>
              <p className="mt-1 text-sm text-slate-500">Turn your clutter into cash. Zero fees to list.</p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 flex flex-col gap-5 [&_input]:h-12 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:bg-slate-50 [&_input]:px-4 [&_input]:text-sm [&_input]:text-slate-900 [&_input]:outline-none [&_input]:transition [&_input:focus]:border-[#FF3D6B] [&_input:focus]:bg-white [&_input:focus]:ring-4 [&_input:focus]:ring-[#FF3D6B]/15 [&_select]:h-12 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-slate-200 [&_select]:bg-slate-50 [&_select]:px-4 [&_select]:text-sm [&_select]:text-slate-900 [&_select]:outline-none [&_select]:transition [&_select:focus]:border-[#FF3D6B] [&_select:focus]:bg-white [&_select:focus]:ring-4 [&_select:focus]:ring-[#FF3D6B]/15 [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-slate-200 [&_textarea]:bg-slate-50 [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:text-slate-900 [&_textarea]:outline-none [&_textarea]:transition [&_textarea:focus]:border-[#FF3D6B] [&_textarea:focus]:bg-white [&_textarea:focus]:ring-4 [&_textarea:focus]:ring-[#FF3D6B]/15"
              >
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Product name</label>
                  <input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="What are you selling?"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Condition</label>
                    <select>
                      {["New", "Like New", "Good", "Fair"].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Your price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Set your price"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Description</label>
                  <textarea
                    placeholder="Describe your item: condition, specs, why you're selling…"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Your email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Photos</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setImages(Array.from(e.target.files));
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#FF3D6B] hover:bg-[#FF3D6B]/5 disabled:opacity-60"
                  >
                    <span className="text-2xl">{uploading ? "⏳" : "📸"}</span>
                    <span className="font-semibold text-slate-800">
                      {uploading ? "Uploading…" : "Select images"}
                    </span>
                    <span className="text-xs text-slate-500">PNG or JPG, add as many as you like</span>
                  </button>

                  {images.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#FF3D6B]/10 px-3 py-1 text-xs font-semibold text-[#E8325E]">
                        {images.length} {images.length === 1 ? "image" : "images"} selected
                      </span>
                      <button
                        type="button"
                        onClick={photoupload}
                        className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                      >
                        Upload photos
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-1 h-12 w-full rounded-xl bg-[#FF3D6B] text-base font-bold text-white shadow-lg shadow-[#FF3D6B]/30 transition hover:bg-[#e8325e] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF3D6B]/30"
                >
                  {creatingProduct ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Creating listing…
                    </span>
                  ) : submitted ? (
                    "Listing created!"
                  ) : (
                    "List my item"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  </section>
);
}
      