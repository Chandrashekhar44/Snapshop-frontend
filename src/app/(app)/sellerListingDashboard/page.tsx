"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Package,
  ImageOff,
} from "lucide-react";
import axios from "../../../lib/axios";

const FONT_IMPORT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  .font-display {
    font-family: 'Fraunces', serif;
    font-feature-settings: 'ss01' 1;
  }

  .font-body {
    font-family: 'Inter', sans-serif;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
`;

type Listing = {
  id: number | string;
  name: string;
  price: number;
  category: string;
  createdAt: string;

  image?: string;
  imageUrl?: string;
  images?: string[];

  stock?: number;
  views?: number;
  status?: string;
};

function StampBadge({ status }: { status: string }) {
  const label = status.toUpperCase();

  return (
    <span
      className="font-mono inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.14em] whitespace-nowrap"
      style={{
        borderStyle: status === "Sold out" ? "dashed" : "solid",
        borderWidth: status === "Active" ? 1.5 : 1,
        borderColor: "rgba(10,10,10,0.55)",
        color:
          status === "Sold out"
            ? "rgba(10,10,10,0.45)"
            : "#0A0A0A",
        transform:
          status === "Active" ? "rotate(-1.5deg)" : "none",
      }}
    >
      {label}
    </span>
  );
}

function Thumb({
  title,
  image,
}: {
  title: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className="aspect-square w-full max-h-48 sm:max-h-52 shrink-0 bg-white flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="aspect-square w-full max-h-48 sm:max-h-52 shrink-0 bg-white flex items-center justify-center overflow-hidden p-5 sm:p-6"
      aria-label={`${title} placeholder image`}
    >
      <div
        className="w-full h-full rounded-sm opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #0A0A0A 0, #0A0A0A 1px, transparent 1px, transparent 8px)",
        }}
      />
    </div>
  );
}

export default function SellerListingsDashboard() {
  const [query, setQuery] = useState("");
  const [seedListing, setSeedListing] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const seedListings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4000/api/products/seedListings"
      );

      console.log("Listings:", res.data);

      setSeedListing(res.data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setSeedListing([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    seedListings();
  }, []);

 
  const listings = useMemo(() => {
    const search = query.toLowerCase().trim();

    if (!search) {
      return seedListing;
    }

    return seedListing.filter((l) => {
      return (
        l.name?.toLowerCase().includes(search) ||
        l.category?.toLowerCase().includes(search)
      );
    });
  }, [seedListing, query]);

  const totals = useMemo(() => {
    const active = seedListing.filter((l) => {
      if (!l.status) {
        return true;
      }

      return l.status.toLowerCase() === "active";
    }).length;

    const views = seedListing.reduce(
      (sum, l) => sum + (Number(l.views) || 0),
      0
    );

    return {
      total: seedListing.length,
      active,
      views,
    };
  }, [seedListing]);


  const getListingImage = (listing: Listing) => {
    if (listing.image) {
      return listing.image;
    }

    if (listing.imageUrl) {
      return listing.imageUrl;
    }

    if (
      listing.images &&
      Array.isArray(listing.images) &&
      listing.images.length > 0
    ) {
      return listing.images[0];
    }

    return undefined;
  };

  const formatDate = (date: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F3F0] text-[#0A0A0A] font-body">
      <style>{FONT_IMPORT_STYLE}</style>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">

        <header className="flex flex-col gap-6 border-b border-[#0A0A0A]/15 pb-6 sm:gap-8 sm:pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] text-[#0A0A0A]/50 mb-2">
              SELLER STUDIO — INVENTORY LEDGER
            </p>

            <h1 className="font-display italic text-3xl sm:text-4xl md:text-5xl leading-none">
              Found &amp; Form
            </h1>
          </div>

          <dl className="flex gap-4 sm:gap-8 font-mono overflow-x-auto">

            <div className="text-right shrink-0">
              <dt className="text-[10px] tracking-[0.14em] text-[#0A0A0A]/50">
                LISTINGS
              </dt>

              <dd className="text-xl sm:text-2xl">
                {String(totals.total).padStart(2, "0")}
              </dd>
            </div>

            <div className="text-right shrink-0 border-l border-[#0A0A0A]/15 pl-4 sm:pl-8">
              <dt className="text-[10px] tracking-[0.14em] text-[#0A0A0A]/50">
                ACTIVE
              </dt>

              <dd className="text-xl sm:text-2xl">
                {String(totals.active).padStart(2, "0")}
              </dd>
            </div>

            <div className="text-right shrink-0 border-l border-[#0A0A0A]/15 pl-4 sm:pl-8">
              <dt className="text-[10px] tracking-[0.14em] text-[#0A0A0A]/50">
                VIEWS
              </dt>

              <dd className="text-xl sm:text-2xl">
                {totals.views.toLocaleString()}
              </dd>
            </div>

          </dl>
        </header>

        <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2 border border-[#0A0A0A]/25 bg-white/40 px-3 py-2.5 w-full sm:max-w-sm">
            <Search
              className="size-4 text-[#0A0A0A]/50 shrink-0"
              strokeWidth={1.75}
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your listings"
              className="bg-transparent outline-none text-sm placeholder:text-[#0A0A0A]/40 w-full font-body"
            />
          </div>

          <button
            className="flex items-center justify-center gap-1.5 bg-[#0A0A0A] text-[#F4F3F0] px-4 py-2.5 text-xs font-mono tracking-wide hover:bg-[#0A0A0A]/85 transition-colors w-full sm:w-auto"
          >
            <Plus
              className="size-3.5"
              strokeWidth={2}
            />

            NEW LISTING
          </button>

        </div>

        <div className="mt-6 sm:mt-8">

          {loading ? (
            <div className="border border-dashed border-[#0A0A0A]/25 py-16 sm:py-20 text-center px-4">
              <p className="font-display italic text-xl">
                Loading listings...
              </p>

              <p className="font-mono text-xs text-[#0A0A0A]/50 mt-2">
                Fetching your inventory records.
              </p>
            </div>
          ) : listings.length === 0 ? (
            <div className="border border-dashed border-[#0A0A0A]/25 py-16 sm:py-20 text-center px-4">

              <ImageOff
                className="mx-auto mb-3 size-6 text-[#0A0A0A]/30"
                strokeWidth={1.5}
              />

              <p className="font-display italic text-xl">
                {query
                  ? "No listings match that search."
                  : "No listings found."}
              </p>

              <p className="font-mono text-xs text-[#0A0A0A]/50 mt-2">
                {query
                  ? "Try a different title or category."
                  : "Create your first listing to get started."}
              </p>

            </div>

          ) : (

            <div
              className="grid gap-5 sm:gap-6"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >

              {listings.map((l, i) => {

                const image = getListingImage(l);

                const stock =
                  typeof l.stock === "number"
                    ? l.stock
                    : undefined;

                const views =
                  typeof l.views === "number"
                    ? l.views
                    : 0;

                const status =
                  l.status ||
                  (stock === 0
                    ? "Sold out"
                    : "Active");

                return (
                  <div
                    key={l.id}
                    className="bg-[#F4F3F0] border border-[#0A0A0A]/15 flex flex-col group hover:border-[#0A0A0A]/40 transition-colors"
                  >

                    <div className="relative">

                      <Thumb
                        title={l.name}
                        image={image}
                      />

                      <span className="absolute top-3 left-3 font-mono text-[10px] bg-[#F4F3F0] border border-[#0A0A0A]/25 px-2 py-0.5 text-[#0A0A0A]/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="absolute top-3 right-3">
                        <StampBadge status={status} />
                      </span>
                      <button
                        className="absolute bottom-3 right-3 bg-[#F4F3F0] border border-[#0A0A0A]/25 p-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        aria-label="Listing actions"
                      >
                        <MoreVertical
                          className="size-4 text-[#0A0A0A]/60"
                          strokeWidth={1.75}
                        />
                      </button>

                    </div>

                    <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">

                      <div>
                        <p className="font-display text-lg sm:text-xl leading-snug">
                          {l.name}
                        </p>

                        <p className="font-mono text-[11px] text-[#0A0A0A]/45 mt-1">
                          {l.category}

                          {l.createdAt && (
                            <>
                              {" · "}
                              {formatDate(l.createdAt)}
                            </>
                          )}
                        </p>

                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#0A0A0A]/10 font-mono">

                        <span className="text-base sm:text-lg">
                          ₹{Number(l.price || 0).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-4 text-xs text-[#0A0A0A]/50">

                          {stock !== undefined && (
                            <span className="flex items-center gap-1.5">
                              <Package
                                className="size-3.5"
                                strokeWidth={1.75}
                              />

                              {stock === 0 ? "—" : stock}
                            </span>
                          )}


                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        <p className="font-mono text-[10px] text-[#0A0A0A]/35 tracking-[0.1em] mt-10 text-center">
          FOUND &amp; FORM — RECORDS SINCE 2019
        </p>

      </div>
    </div>
  );
}