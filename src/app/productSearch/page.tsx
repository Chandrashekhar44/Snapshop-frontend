"use client";
import { useSearchParams } from "next/navigation";
import axios from "../../lib/axios";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string; 
};

type SortMode = "none" | "low-high" | "high-low";

const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const IconArrowUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const IconArrowDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const IconBox = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 8 12 3 3 8l9 5 9-5Z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>
);


const placeholder = (label: string) =>
  `https://placehold.co/112x112/101c3f/ffffff?text=${encodeURIComponent(label)}`;

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);


export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortMode, setSortMode] = useState<SortMode>("none");
 const [products, setProducts] = useState<Product[]>([]);
 const router = useRouter()

const searchParam = useSearchParams();

const search = searchParam.get("search") || "";

useEffect(() => {

  const fetchProducts = async () => {
    try {

      const response = await axios.post(
        "http://localhost:5002/api/products/buy/product-search",
        {
          search,
          category:"",
          minPrice:0,
          maxPrice:0,
          condition:""
        },
        {
          withCredentials:true
        }
      );

      console.log("response:", response.data);

      setProducts(response.data.data);

    } catch(error) {
      console.log(error);
    }
  };


  if(search){
    fetchProducts();
  }

}, [search]);

  const [maxPrice, setMaxPrice] = useState<number>(
    Math.max(...products.map((p) => p.price), 10000)
  );

  const priceCeiling = useMemo(
    () => Math.max(...products.map((p) => p.price), 100),
    [products]
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesPrice = p.price <= maxPrice;
      return matchesQuery && matchesCategory && matchesPrice;
    });

    if (sortMode === "low-high") list = [...list].sort((a, b) => a.price - b.price);
    if (sortMode === "high-low") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [products, query, activeCategory, maxPrice, sortMode]);

  return (
    <div className="w-full h-screen  mx-auto bg-black text-white rounded-1.5xl border border-white/10 overflow-hidden overscroll-none">
      <div className="px-5 pt-5 pb-4 border-b border-white/10 bg-[#0a1128]">
        <h2 className="text-lg font-medium tracking-tight mb-3">Products</h2>
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#101c3f] border border-white/10 rounded-lg pl-9 pr-9 py-2.5 text-sm placeholder-white/40 outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
            >
              <IconX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 py-3 border-b border-white/10 bg-[#0a1128]/60">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/70 border-white/15 hover:border-white/35 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="shrink-0 w-px h-5 bg-white/15 mx-1" />

          <button
            onClick={() => setSortMode(sortMode === "low-high" ? "none" : "low-high")}
            className={`shrink-0 whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              sortMode === "low-high"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/70 border-white/15 hover:border-white/35 hover:text-white"
            }`}
          >
            <IconArrowUp className="w-3.5 h-3.5" />
            Price: Low to High
          </button>

          <button
            onClick={() => setSortMode(sortMode === "high-low" ? "none" : "high-low")}
            className={`shrink-0 whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
              sortMode === "high-low"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/70 border-white/15 hover:border-white/35 hover:text-white"
            }`}
          >
            <IconArrowDown className="w-3.5 h-3.5" />
            Price: High to Low
          </button>

          <span className="shrink-0 w-px h-5 bg-white/15 mx-1" />

          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/15 bg-transparent">
            <span className="text-white/50">Up to</span>
            <span className="text-white font-medium tabular-nums w-16">
              {formatPrice(maxPrice)}
            </span>
            <input
              type="range"
              min={0}
              max={priceCeiling}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-white"
            />
          </div>
        </div>
      </div>
      <div className="max-h-[580px] overflow-y-auto divide-y divide-white/8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 px-6 text-center">
            <div className="w-11 h-11 rounded-full bg-[#101c3f] flex items-center justify-center mb-1">
              <IconBox className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-sm font-medium text-white">No products found</p>
            <p className="text-xs text-white/40 max-w-[220px]">
              Try a different search term or adjust the filters above.
            </p>
          </div>
        ) : (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
  {filtered.length === 0 ? (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <p className="text-white">No products found</p>
    </div>
  ) : (
    filtered.map((product) => (
      <div
        key={product.id}
        className="
          bg-[#101c3f]
          rounded-2xl
          overflow-hidden
          border border-white/10
          hover:border-white/30
          transition-all
          duration-300
          hover:-translate-y-1
          cursor-pointer
        "
      >

        <div className="w-full aspect-square bg-[#0a1128]">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 text-xl">
              {product.name.slice(0,2).toUpperCase()}
            </div>
          )}
        </div>


        <div className="p-4">

          <h3 className="
            text-white
            font-semibold
            text-base
            truncate
          ">
            {product.name}
          </h3>


          <p className="
            text-white/50
            text-sm
            mt-1
          ">
            {product.category}
          </p>


          <div className="
            flex
            justify-between
            items-center
            mt-4
          ">
            <span className="
              text-white
              font-bold
              text-lg
            ">
              {formatPrice(product.price)}
            </span>


            <button
            onClick={() => router.push(`/product/${product.id}`)}
              className="
                px-3
                py-1.5
                rounded-lg
                text-xs
                bg-white
                text-black
                font-semibold
                hover:scale-105
                transition
              "
            >
              View
            </button>

          </div>

        </div>

      </div>
    ))
  )}
</div>
        )}
      </div>
     <div className="fixed bottom-0 left-0 w-full px-5 py-2.5 border-t border-white/10 bg-[#0a1128] text-xs text-white/40">
           {filtered.length} {filtered.length === 1 ? "product" : "products"}
     </div>
    </div>
  );
}
