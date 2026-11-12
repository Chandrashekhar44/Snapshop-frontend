import { Package, CheckCircle, Clock, XCircle, ShoppingBag } from "lucide-react";
import StatCard from "./StatCard";
import StatusPill from "./StatusPill";
import { useRouter } from "next/navigation";

const RECENT_ORDERS = [
  { flag: "🇬🇧", name: "GB 1840 Penny Black replica set",         seller: "PhilatelicHouse", id: "#ORD-8821", price: "₹3,200",  status: "delivered" },
  { flag: "🇮🇳", name: "India 1948 Independence commemoratives",  seller: "StampVault",       id: "#ORD-8805", price: "₹1,750",  status: "transit"   },
  { flag: "🇺🇸", name: "US Inverted Jenny error stamp",           seller: "RareStamps.in",    id: "#ORD-8798", price: "₹12,500", status: "pending"   },
  { flag: "🇯🇵", name: "Japan 1964 Olympics souvenir sheet",      seller: "AsiaStamps",       id: "#ORD-8755", price: "₹4,400",  status: "delivered" },
  { flag: "🇩🇪", name: "Germany Weimar Republic block of 4",      seller: "EuroPhilatelist",  id: "#ORD-8771", price: "₹2,100",  status: "cancelled" },
];

const WISHLIST = [
  { flag: "🇿🇦", name: "SA 1933 Voortrekker set",              note: "In stock",  price: "₹5,800"  },
  { flag: "🇨🇳", name: "China 1968 Cultural Rev. block",       note: "Limited",   price: "₹9,200"  },
  { flag: "🇧🇷", name: "Brazil 1843 Bull's Eye pair",          note: "Rare",      price: "₹18,000" },
  { flag: "🇦🇺", name: "Australia 1913 kangaroo 5/- orange",  note: "In stock",  price: "₹11,600" },
];

const ACTIVITY = [
  { color: "bg-blue-500",   text: "Order #ORD-8805 shipped via Speed Post",      time: "Today, 10:24 AM"    },
  { color: "bg-green-600",  text: "You left a 5★ review for PhilatelicHouse",    time: "Yesterday, 3:11 PM" },
  { color: "bg-amber-500",  text: "Payment ₹12,500 confirmed for Inverted Jenny", time: "May 21, 9:02 AM"   },
  { color: "bg-red-600",    text: "Order #ORD-8771 cancelled — refund initiated", time: "May 19, 2:45 PM"   },
  { color: "bg-green-600",  text: "Japan Olympics sheet delivered successfully",  time: "May 17, 11:00 AM"   },
];



const SPENDING = [
  { label: "Classic / Vintage",  amount: "₹42,000", pct: 75, color: "bg-blue-500"   },
  { label: "Commemoratives",     amount: "₹18,500", pct: 33, color: "bg-teal-500"   },
  { label: "Error / Rare",       amount: "₹12,500", pct: 22, color: "bg-amber-500"  },
  { label: "First Day Covers",   amount: "₹7,200",  pct: 13, color: "bg-pink-500"   },
];

export default function BuyerDashboard({ user }) {
  const router = useRouter();

  const browseHandle = async()=>{
     router.push("/sellOrBuy")
  }

  const searchHandle = ()=>{
    router.push("/searchBar")

  }
  return (
  <div className="mx-auto w-full max-w-6xl">
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <h1 className="flex flex-wrap items-center gap-2.5 text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {(user.username || "User").split(" ")[0]}
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 ring-1 ring-inset ring-blue-100">
            <ShoppingBag className="h-3 w-3" /> Buyer
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your collection &amp; order summary</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={searchHandle}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-700/20"
        >
          <span aria-hidden="true">🔍</span> Search products
        </button>
        <button
          onClick={browseHandle}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-700/30"
        >
          <ShoppingBag className="h-4 w-4" /> Browse products
        </button>
      </div>
    </div>

    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard label="Total orders"         value="48" delta="6 this month"      deltaType="up"      icon={Package}     color="blue"  />
      <StatCard label="Delivered"            value="39" delta="81% success rate"  deltaType="up"      icon={CheckCircle} color="green" />
      <StatCard label="Pending / in transit" value="6"  delta="4 ship this week"  deltaType="neutral" icon={Clock}       color="amber" />
      <StatCard label="Cancelled"            value="3"  delta="1 refund pending"  deltaType="down"    icon={XCircle}     color="red"   />
    </div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">Recent orders</p>
          <button className="rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50">
            View all
          </button>
        </div>

        <div className="-mx-2">
          {RECENT_ORDERS.map((o) => (
            <div
              key={o.id}
              className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-xl">
                {o.flag}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{o.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {o.seller} · {o.id}
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col items-end gap-1">
                <p className="text-sm font-semibold text-slate-900">{o.price}</p>
                <StatusPill status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">Wishlist</p>
          <button className="rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50">
            Manage
          </button>
        </div>

        <div className="-mx-2">
          {WISHLIST.map((w) => (
            <div
              key={w.name}
              className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-pink-100 bg-pink-50 text-xl">
                {w.flag}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">{w.name}</p>
                <p className="truncate text-xs text-slate-500">{w.note}</p>
              </div>
              <p className="flex-shrink-0 text-sm font-semibold text-blue-700">{w.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}
