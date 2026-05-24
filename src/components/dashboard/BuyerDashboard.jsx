import { Package, CheckCircle, Clock, XCircle, ShoppingBag } from "lucide-react";
import StatCard from "./StatCard";
import StatusPill from "./StatusPill";

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

const COLLECTION = [
  { emoji: "🌍", count: "34",    label: "Countries"     },
  { emoji: "📮", count: "218",   label: "Total stamps"  },
  { emoji: "⭐", count: "12",    label: "Rare"           },
  { emoji: "📦", count: "5",     label: "Sets complete" },
  { emoji: "🏷️", count: "₹1.2L", label: "Est. value"   },
  { emoji: "📅", count: "1840",  label: "Oldest"        },
];

const SPENDING = [
  { label: "Classic / Vintage",  amount: "₹42,000", pct: 75, color: "bg-blue-500"   },
  { label: "Commemoratives",     amount: "₹18,500", pct: 33, color: "bg-teal-500"   },
  { label: "Error / Rare",       amount: "₹12,500", pct: 22, color: "bg-amber-500"  },
  { label: "First Day Covers",   amount: "₹7,200",  pct: 13, color: "bg-pink-500"   },
];

export default function BuyerDashboard({ user }) {
  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-medium text-slate-900 flex items-center gap-2">
            Welcome back, {user.name.split(" ")[0]}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
              <ShoppingBag className="w-3 h-3" /> Buyer
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Your collection & order summary</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors">
          <ShoppingBag className="w-4 h-4" /> Browse stamps
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatCard label="Total orders"        value="48" delta="6 this month"        deltaType="up"      icon={Package}      color="blue"  />
        <StatCard label="Delivered"           value="39" delta="81% success rate"    deltaType="up"      icon={CheckCircle}  color="green" />
        <StatCard label="Pending / in transit" value="6" delta="4 ship this week"   deltaType="neutral" icon={Clock}        color="amber" />
        <StatCard label="Cancelled"            value="3" delta="1 refund pending"   deltaType="down"    icon={XCircle}      color="red"   />
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-3 mb-5">

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-900">Recent orders</p>
            <button className="text-xs text-blue-700 hover:underline">View all</button>
          </div>
          {RECENT_ORDERS.map((o) => (
            <div key={o.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-lg flex-shrink-0">
                {o.flag}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">{o.name}</p>
                <p className="text-[11px] text-slate-500">{o.seller} · {o.id}</p>
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
            <p className="text-sm font-medium text-slate-900">Wishlist</p>
            <button className="text-xs text-blue-700 hover:underline">Manage</button>
          </div>
          {WISHLIST.map((w) => (
            <div key={w.name} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center text-base flex-shrink-0">
                {w.flag}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">{w.name}</p>
                <p className="text-[11px] text-slate-500">{w.note}</p>
              </div>
              <p className="text-xs font-medium text-blue-700 flex-shrink-0">{w.price}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
