import { Coins, Package, Clock, Star, Store, Plus } from "lucide-react";
import StatCard from "./StatCard";
import StatusPill from "./StatusPill";

const ORDERS_TO_FULFIL = [
  { flag: "🇬🇧", name: "GB King George V 1d red — 3 pcs",   buyer: "Ravi M.",    id: "#ORD-9041", price: "₹4,500",  status: "new"       },
  { flag: "🇮🇳", name: "India 1974 UPU centenary block",     buyer: "Sneha T.",   id: "#ORD-9038", price: "₹1,200",  status: "dispatched" },
  { flag: "🇺🇸", name: "US 1918 Airmail C1 — mint",         buyer: "Farhan K.",  id: "#ORD-9031", price: "₹8,800",  status: "new"       },
  { flag: "🇫🇷", name: "France 1849 Ceres 20c blue",        buyer: "Priya S.",   id: "#ORD-9024", price: "₹6,300",  status: "completed" },
  { flag: "🇯🇵", name: "Japan 1871 Dragon 48 mon — used",   buyer: "Amit D.",    id: "#ORD-9019", price: "₹11,000", status: "new"       },
];

const TOP_SELLERS = [
  { flag: "🇮🇳", name: "India Gandhi series 1948",       sold: 24, revenue: "₹28,800" },
  { flag: "🇬🇧", name: "GB Penny Red imperf block",      sold: 17, revenue: "₹22,100" },
  { flag: "🇺🇸", name: "US Columbian exposition 1893",   sold: 11, revenue: "₹14,300" },
  { flag: "🇩🇪", name: "Germany 1933 Hitler overprint",  sold:  9, revenue: "₹9,900"  },
];

const ACTIVITY = [
  { color: "bg-teal-500",   text: "New order #ORD-9041 received from Ravi M.",   time: "Today, 11:02 AM"    },
  { color: "bg-blue-500",   text: "Payout of ₹18,400 credited to bank",          time: "Today, 9:00 AM"     },
  { color: "bg-violet-500", text: "Sneha T. left a 5★ review on your shop",      time: "Yesterday, 6:14 PM" },
  { color: "bg-amber-500",  text: "Listing India Gandhi 1948 views up 40%",   time: "May 21, 3:30 PM"    },
  { color: "bg-red-600",    text: "Order #ORD-9002 cancelled by buyer",          time: "May 20, 1:15 PM"    },
];

const SHOP_STATS = [
  { emoji: "🏪", count: "64",   label: "Listings"    },
  { emoji: "📦", count: "312",  label: "Orders sold" },
  { emoji: "⭐", count: "4.8",  label: "Rating"      },
  { emoji: "👁️", count: "18K",  label: "Shop views"  },
  { emoji: "💰", count: "₹2.4L", label: "Revenue"   },
  { emoji: "🔄", count: "94%",  label: "Fulfilment"  },
];

const REVENUE = [
  { label: "Classic / Vintage",  amount: "₹96,000", pct: 80, color: "bg-teal-500"   },
  { label: "Commemoratives",     amount: "₹54,000", pct: 45, color: "bg-blue-500"   },
  { label: "Error / Rare",       amount: "₹52,000", pct: 43, color: "bg-violet-500" },
  { label: "First Day Covers",   amount: "₹38,000", pct: 32, color: "bg-amber-500"  },
];

export default function SellerDashboard({ user }) {
  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-slate-900 flex items-center gap-2">
            Welcome back, {user.name.split(" ")[0]}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-800">
              <Store className="w-3 h-3" /> Seller
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Your shop performance & order queue</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 text-white text-sm font-medium hover:bg-teal-800 transition-colors">
          <Plus className="w-4 h-4" /> Add listing
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Total revenue"   value="₹2.4L" delta="+18% this month"      deltaType="up"      icon={Coins}   color="teal"   />
        <StatCard label="Active listings" value="64"    delta="4 drafts pending"      deltaType="neutral" icon={Package} color="blue"   />
        <StatCard label="New orders"      value="11"    delta="3 need dispatch"        deltaType="down"    icon={Clock}   color="amber"  />
        <StatCard label="Seller rating"   value="4.8"   delta="142 reviews"           deltaType="up"      icon={Star}    color="purple" />
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-3 mb-5">

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-900">Orders to fulfil</p>
            <button className="text-xs text-teal-700 hover:underline">View all</button>
          </div>
          {ORDERS_TO_FULFIL.map((o) => (
            <div key={o.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-lg flex-shrink-0">
                {o.flag}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">{o.name}</p>
                <p className="text-[11px] text-slate-500">Buyer: {o.buyer} · {o.id}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-medium text-slate-900">{o.price}</p>
                <StatusPill status={o.status} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-900">Top-selling stamps</p>
            <button className="text-xs text-teal-700 hover:underline">All listings</button>
          </div>
          {TOP_SELLERS.map((s) => (
            <div key={s.name} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-base flex-shrink-0">
                {s.flag}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">{s.name}</p>
                <p className="text-[11px] text-slate-500">Sold {s.sold} times</p>
              </div>
              <p className="text-xs font-medium text-teal-700 flex-shrink-0">{s.revenue}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-900 mb-3">Recent activity</p>
          {ACTIVITY.map((a, i) => (
            <div key={i} className="flex gap-2.5 py-2 border-b border-slate-100 last:border-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${a.color}`} />
              <div>
                <p className="text-xs text-slate-800 leading-snug">{a.text}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-900 mb-3">Shop overview</p>
          <div className="grid grid-cols-3 gap-2">
            {SHOP_STATS.map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-center">
                <div className="text-xl">{s.emoji}</div>
                <p className="text-sm font-medium text-slate-900 mt-1">{s.count}</p>
                <p className="text-[10px] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-900 mb-3">Revenue by category</p>
          {REVENUE.map((r) => (
            <div key={r.label} className="mb-2.5">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>{r.label}</span><span>{r.amount}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
          <div className="border-t border-slate-100 mt-3 pt-3">
            <div className="flex justify-between text-xs font-medium text-slate-900">
              <span>Total revenue</span><span>₹2,40,000</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>Pending payout</span><span>₹18,400</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
