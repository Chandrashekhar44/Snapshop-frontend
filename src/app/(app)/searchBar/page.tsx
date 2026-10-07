"use client"
import { getToken } from "firebase/messaging";
import axios from "../../../lib/axios";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { getFirebaseMessaging } from "@/firebase/firebase";
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  images:string;
  distance_meters?: number;
  relevance?: number;
};


const TRENDING = ["shoes", "headphones", "coffee", "jacket", "backpack", "yoga"];

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-slate-700 font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function formatDistance(meters?: number) {
  if (meters == null) return null;
  if (meters < 1000) return `${Math.round(meters)} m away`;
  return `${(meters / 1000).toFixed(1)} km away`;
}


type Particle = {
  angle: number;
  dist: number;
  traveled: number;
  size: number;
  maxSize: number;
  life: number;
  drift: number;
  alphaPeak: number;
};

type SmokeCallbacks = { onCovered: () => void; onDone: () => void };
export type SmokeHandle = { trigger: (origin: { x: number; y: number }, cb: SmokeCallbacks) => void };

const COVER_MS = 750;
const HOLD_MS = 120;
const DISSOLVE_MS = 950;
const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Fitness",
  "Books",
  "Toys & Games",
  "Jewellery",
  "Automotive",
  "Grocery",
  "Mobiles",
  "Computers",
  "Furniture",
  "Collectibles",
];

const SmokeCanvas = forwardRef<SmokeHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const particles = useRef<Particle[]>([]);
  const origin = useRef({ x: 0, y: 0 });
  const callbacks = useRef<SmokeCallbacks | null>(null);
  const startTime = useRef(0);
  const coveredFired = useRef(false);
  const rafId = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    trigger(pt, cb) {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        cb.onCovered();
        cb.onDone();
        return;
      }
      origin.current = pt;
      callbacks.current = cb;
      coveredFired.current = false;
      particles.current = [];
      startTime.current = performance.now();
      setVisible(true);
    },
  }));

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDist =
      Math.hypot(
        Math.max(origin.current.x, vw - origin.current.x),
        Math.max(origin.current.y, vh - origin.current.y)
      ) * 1.1;

    function loop(now: number) {
      const elapsed = now - startTime.current;
      ctx.clearRect(0, 0, vw, vh);

      if (elapsed < COVER_MS) {
        for (let i = 0; i < 6; i++) {
          const angle = Math.random() * Math.PI * 2;
          particles.current.push({
            angle,
            dist: maxDist * (0.55 + Math.random() * 0.55),
            traveled: 0,
            size: 18 + Math.random() * 30,
            maxSize: 110 + Math.random() * 170,
            life: 0,
            drift: (Math.random() - 0.5) * 1.4,
            alphaPeak: 0.28 + Math.random() * 0.24,
          });
        }
      }

      for (const p of particles.current) {
        p.life += 16;
        const progress = Math.min(p.traveled / p.dist, 1);
        const speed = (p.dist / COVER_MS) * 16 * (1 - progress * 0.35);
        p.traveled += speed;
        p.angle += p.drift * 0.012 + Math.sin(p.life * 0.002) * 0.01;

        const x = origin.current.x + Math.cos(p.angle) * p.traveled;
        const y = origin.current.y + Math.sin(p.angle) * p.traveled;
        const size = Math.min(p.size + p.life * 0.09, p.maxSize);

        let alpha: number;
        if (elapsed < COVER_MS) {
          alpha = Math.min(p.life / 260, 1) * p.alphaPeak;
        } else {
          const t = (elapsed - COVER_MS - HOLD_MS) / DISSOLVE_MS;
          alpha = Math.max(0, 1 - t) * p.alphaPeak;
        }

        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, `hsla(0, 0%, 55%, ${alpha})`);
        grad.addColorStop(1, `hsla(0, 0%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!coveredFired.current && elapsed >= COVER_MS) {
        coveredFired.current = true;
        callbacks.current?.onCovered();
      }

      if (elapsed >= COVER_MS + HOLD_MS + DISSOLVE_MS + 150) {
        callbacks.current?.onDone();
        window.removeEventListener("resize", resize);
        setVisible(false);
        return;
      }
      rafId.current = requestAnimationFrame(loop);
    }

    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ filter: "blur(7px) saturate(105%)" }}
    />
  );
});
SmokeCanvas.displayName = "SmokeCanvas";

export default function LandingSearchPreview() {
  const [view, setView] = useState<"landing" | "search">("landing");
  const smokeRef = useRef<SmokeHandle>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);

  function goTo(target: "landing" | "search", el: HTMLElement | null) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    smokeRef.current?.trigger(origin, {
      onCovered: () => setView(target),
      onDone: () => {},
    });
  }

  const [query, setQuery] = useState("");
  const [category,setCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"relevance" | "distance" | "price-asc" | "price-desc">("relevance");
  const [history, setHistory] = useState<string[]>([]); 

  const [rawResults, setRawResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function performSearch(term: string) {
  if (!term.trim()) {
    setRawResults([]);
    setHasSearched(false);
    return;
  }

  try {
    setLoading(true);

    const response = await axios.get(
      "/api/products/request-order",
      {
        params: {
          query: term,
          category: category,
        },
        withCredentials: true,
      }
    );


 console.log("SEARCH RESPONSE:", response.data);

const products = Array.isArray(response.data)
  ? response.data
  : response.data.results || [];

console.log("P", products);

setRawResults(products);
    console.log("rawresults",rawResults)
    setHasSearched(true);


  } catch (error) {

    console.error(
      "SEARCH ERROR:",
      error
    );

    setRawResults([]);
    setHasSearched(true);


  } finally {

    setLoading(false);

  }
}

 

  function runSearch(term: string) {
    setIsOpen(false);
    setHistory((prev) => [term, ...prev.filter((t) => t !== term)].slice(0, 6));
    performSearch(term);
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  const searchHandler = async () => {

  try {

    console.log("button clicked");


    const res = await axios.get(
      "/api/products/request-order",
      {
        params:{
          query,
          category
        },
        withCredentials:true
      }
    );


    console.log(
      "SEARCH RESULT:",
      res.data
    );


    const products = Array.isArray(res.data)
      ? res.data
      : res.data.products ||
        res.data.data ||
        [];


    setRawResults(products);
    setHasSearched(true);


  } catch(error){

    console.error(
      "Search failed:",
      error
    );

    setRawResults([]);

  }

};
  const categories = useMemo(
    () => Array.from(new Set(rawResults.map((p) => p.category))).sort(),
    [rawResults]
  );

  const results = useMemo(() => {

  let list: Product[] = Array.isArray(rawResults)
    ? rawResults
    : [];


  if(selectedCategories.size > 0){

    list = list.filter(
      (p)=>selectedCategories.has(p.category)
    );

  }


  const sorted = [...list];


  if(sortBy === "price-asc"){

    sorted.sort(
      (a,b)=>a.price-b.price
    );

  }


  if(sortBy === "price-desc"){

    sorted.sort(
      (a,b)=>b.price-a.price
    );

  }


  if(sortBy === "distance"){

    sorted.sort(
      (a,b)=>
        (a.distance_meters ?? Infinity) -
        (b.distance_meters ?? Infinity)
    );

  }


  if(sortBy === "relevance"){

    sorted.sort(
      (a,b)=>
        (b.relevance ?? 0) -
        (a.relevance ?? 0)
    );

  }


  return sorted;


},[
  rawResults,
  selectedCategories,
  sortBy
]);

  function clearSearch() {
    setQuery("");
    setIsOpen(false);
    setRawResults([]);
    setHasSearched(false);
    setSelectedCategories(new Set());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      runSearch(query.trim());
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  const showBrowsePrompt = !hasSearched && !loading;






 return (
  <div className="relative min-h-screen overflow-hidden bg-white">

    {view === "landing" && (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">

        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight mb-3">
          Welcome
        </h1>

        <p className="text-slate-500 mb-10 text-center max-w-sm">
          Everything you need, one search away.
        </p>


        <button
          ref={searchBtnRef}
          onClick={() => goTo("search", searchBtnRef.current)}
          className="
            flex items-center gap-2
            rounded-full
            bg-slate-800
            px-6
            py-3
            text-white
            font-medium
            hover:bg-slate-900
            active:scale-95
            transition-all
          "
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
            />
          </svg>

          Search

        </button>

      </div>
    )}



    {view === "search" && (

      <div className="min-h-screen text-slate-900 px-6 py-30">


        <button
          ref={backBtnRef}
          onClick={() => goTo("landing", backBtnRef.current)}
          className="
            absolute
            top-6
            left-6
            flex
            items-center
            gap-2
            rounded-full
            bg-slate-900
            px-4
            py-2
            text-sm
            text-white
            font-medium
            hover:bg-slate-800
            active:scale-95
            transition-all
          "
        >

          ← Back

        </button>



        <div className="max-w-5xl mx-auto flex gap-3">



          <div className="relative flex-1">

            <input
              type="text"
              value={query}
              onChange={(e)=>{
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={()=>setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              autoFocus
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4
                py-3
                pr-10
                outline-none
                focus:border-slate-500
                focus:ring-1
                focus:ring-slate-300
              "
            />


            {query && (

              <button
                onClick={clearSearch}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              >
                ✕
              </button>

            )}



            {isOpen && !query.trim() &&
            (history.length > 0 || TRENDING.length > 0) && (

              <div
                className="
                  absolute
                  z-20
                  mt-2
                  w-full
                  rounded-lg
                  border
                  bg-white
                  shadow-lg
                  p-4
                "
              >


                {history.length > 0 && (

                  <div>

                    <p className="text-xs text-slate-400 uppercase mb-2">
                      Recent
                    </p>


                    <div className="flex flex-wrap gap-2">

                      {history.map(term=>(

                        <button
                          key={term}
                          onMouseDown={(e)=>e.preventDefault()}
                          onClick={()=>runSearch(term)}
                          className="
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            bg-slate-100
                          "
                        >
                          {term}
                        </button>

                      ))}

                    </div>

                  </div>

                )}



                <div className="mt-4">

                  <p className="text-xs text-slate-400 uppercase mb-2">
                    Trending
                  </p>


                  <div className="flex flex-wrap gap-2">

                    {TRENDING.map(term=>(

                      <button
                        key={term}
                        onMouseDown={(e)=>e.preventDefault()}
                        onClick={()=>runSearch(term)}
                        className="
                          px-3
                          py-1.5
                          rounded-full
                          text-xs
                          bg-slate-100
                        "
                      >
                        {term}
                      </button>

                    ))}

                  </div>


                </div>


              </div>

            )}


          </div>






          <div className="relative w-56">

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
              "
            >

              {CATEGORIES.map(item=>(

                <option key={item}>
                  {item}
                </option>

              ))}

            </select>


          </div>





          {/* SEARCH BUTTON */}

          <button
            onClick={()=>query.trim() && runSearch(query)}
            disabled={!query.trim()}
            className="
              rounded-lg
              bg-slate-800
              px-6
              text-white
              font-medium
              disabled:opacity-40
            "
          >

            Search

          </button>



        </div>





        {showBrowsePrompt ? (

          <p className="text-center text-slate-400 text-sm mt-16">
            Search for a product to start browsing.
          </p>


        ) : (


          <div
            className="
              w-full
              max-w-4xl
              mx-auto
              mt-6
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
            "
          >


            {loading && Array.from({length:6}).map((_,i)=>(

              <div
                key={i}
                className="
                  rounded-lg
                  border
                  p-4
                  animate-pulse
                "
              >

                <div className="h-32 bg-slate-100 rounded mb-3"/>

                <div className="h-4 bg-slate-100 rounded"/>

              </div>

            ))}





            {!loading && results.map((p)=>(

              <div
                key={p.id}
                className="
                  rounded-lg
                  border
                  p-4
                  hover:border-slate-400
                "
              >


                <div className="h-40 bg-slate-100 rounded mb-3 overflow-hidden">

                  {p.images && (

                    <img
                      src={p.images}
                      alt={p.name}
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  )}

                </div>



                <p className="text-xs text-slate-400 uppercase">
                  {p.category}
                </p>


                <h3 className="font-medium mt-1">
                  {highlight(p.name,query)}
                </h3>



                <div className="flex justify-between mt-2 text-sm">

                  <span>
                    ${p.price}
                  </span>


                  {formatDistance(p.distance_meters) && (

                    <span className="text-slate-400">
                      {formatDistance(p.distance_meters)}
                    </span>

                  )}

                </div>


              </div>

            ))}



            {!loading &&
             hasSearched &&
             results.length===0 && (

              <p className="col-span-full text-center text-slate-400">
                No products matched. Try another term.
              </p>

            )}


          </div>


        )}


      </div>

    )}


    <SmokeCanvas ref={smokeRef}/>


  </div>
);
}