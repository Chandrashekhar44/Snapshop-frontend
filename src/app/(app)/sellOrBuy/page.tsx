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

const currUser = await axios.get("http://localhost:5001/api/auth/me",{
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
      "http://localhost:5002/api/products/uploadImage",
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
        "http://localhost:4000/api/products/sell/adding-product",
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
  
  
    return (<section id="features" style={{ padding: "60px 24px", background: "#F4F7FF" }}>
      <div className="max-w-full mx-auto flex justify-end px-6">
  <div className="flex items-center space-x-2">
    <Switch id="airplane-mode"  checked={enabled}
        onCheckedChange={handleToggle} />
    <Label htmlFor="airplane-mode">Request Product</Label>
  </div>
</div>
        <div className="max-w-[860px] mx-auto relative">
           
          <div className="text-center mb-12">

              
            <h2
              className="font-black text-[#050F2C] m-0"
              style={{ fontSize: 44, letterSpacing: "-0.03em" }}
            >
              {mode === "BUYER" ?"Shop  in  Snap" : "Sell in Snap"}
            </h2>
            <p className="mt-[10px] text-[17px] text-[#6B7A99]">
              {mode === "BUYER" ?"Start searching - SnapShop handles rest" : "Sell in Snap"}
            </p>
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
                  mode === "BUYER"
                    ? "linear-gradient(90deg,#003B8E,#003B8E)"
                    : "linear-gradient(90deg,#FF3D6B,#003B8E)",
              }}
            />
            <div style={{ padding: "40px 48px" }}>

              {mode === "BUYER" ? (
                <>
                  <div className="flex items-center gap-[14px] mb-7">
                    <div
                      className="flex items-center justify-center text-[26px]"
                      style={{ width: 52, height: 52, borderRadius: 16, background: "#EEF3FF" }}
                    >
                      🛍️
                    </div>
                    <div>
                      <div className="text-[22px] font-black text-[#050F2C]">Find your deal</div>
                      <div className="text-[13px] text-[#6B7A99] mt-[2px]">
                        Millions of items. Unbeatable prices.
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-[#6B7A99] mb-[6px] uppercase tracking-[0.05em]">
                          {Error}
                        </label>
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
                      className="w-full bg-black font-black text-base border-none cursor-pointer text-white transition-transform"
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        boxShadow: "0 6px 24px rgba(0,87,255,0.35)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      
                    >
                      {submitted ? " We'll notify you!" : " Search Deals"}
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
  className="group relative flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-70"
  style={{
    background: "linear-gradient(135deg,#0057FF,#7C3AED)",
    boxShadow: "0 8px 25px rgba(0,87,255,0.35)",
  }}
>
  {uploading ? (
    <>
      <span className="animate-spin">⏳</span>
      Uploading...
    </>
  ) : (
    <>
      📸 Select Images
    </>
  )}
</button>
{images.length > 0 && (
  <p className="mt-2 text-sm text-gray-600">
    {images.length} images selected
  </p>
)}
<button
  type="button"
  onClick={photoupload}
  className="mt-3 w-full py-3 rounded-xl bg-green-600 text-white font-bold"
>
  Upload Product
</button>

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
                      {creatingProduct ? (
  <>
    <span className="animate-spin">⏳</span>
    Creating Listing...
  </>
) : submitted ? (
  "Listing Created!"
) : (
  "List my Item"
)}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>)
}
      