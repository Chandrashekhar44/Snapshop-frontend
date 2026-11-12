"use client"
import { Coins, Package, Clock, Star, Store, Plus } from "lucide-react";
import StatCard from "./StatCard";
import StatusPill from "./StatusPill";
import { useRouter } from "next/navigation";
import { registerDeviceToken } from "@/lib/registerDeviceToken";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNotificationStore } from "@/store/notification.store";
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
const {
 notificationsEnabled,
 setNotificationsEnabled,
 checked,
 setChecked
}=useNotificationStore();
const [stats, setStats] = useState({
  totalRevenue: 0,
  activeListings: 0,
  
  newOrders: 0,
 
 completedOrders:0
}); 

const [pendingStats,setPendingStats] = useState([]);
const [completedOrders, setCompletedOrders] = useState([]);

const checkingNotification = !checked;

const router = useRouter();
const handlerPush = ()=>{
    router.push("/sellerListingDashboard")

  }
useEffect(() => {

 if(checked) return;


const checkNotificationStatus = async()=>{

try {

if(Notification.permission !== "granted"){
 setNotificationsEnabled(false);
 return;
}


const response = await axios.get(
"/api/notifications/status",
{
 withCredentials:true
}
);


setNotificationsEnabled(
 response.data.enabled
);


}
catch(error){

console.error(error);

setNotificationsEnabled(false);

}
finally{

setChecked(true);

}


};


checkNotificationStatus();


},[
 checked
]);

const enableNotification = async () => {
  try {

    const success = await registerDeviceToken();

    if(success){

      setNotificationsEnabled(true);

      setChecked(true);

    }

  } catch(error){

    console.error(
      "Enable notification failed",
      error
    );

  }


  
};

const fetchSellerDashboardStats = async () => {
  try {
    const response = await axios.get(
      "/api/products/stats",
      {
        withCredentials: true,
      }
    );

    console.log("response",response)
    console.log(response.data)

    setStats(response.data);
    setPendingStats(response.data.activeOrders)

  } catch (error) {
    console.error("Failed to fetch seller dashboard stats:", error);
  }
};


useEffect(() => {
  fetchSellerDashboardStats();
}, []);


const fulfillOrders = async()=>{

  try{

    const response = await axios.get("/api/products/pendingOrder-stats",{
      withCredentials:true,
    })
    console.log("mnop",response.data)

  }catch (error) {
    console.log(error);
  }

}



const getCompletedOrders = async () => {
  try {
    const response = await axios.get(
      "/api/products/completedOrders",
      {
        withCredentials: true,
      }
    );

    console.log("Completed orders:", response.data);

    setCompletedOrders(response.data);
  } catch (error) {
    console.log("Error fetching completed orders:", error);
  }
};

useEffect(()=>{
  fulfillOrders();
  getCompletedOrders();

},[])



  return (
  <div className="mx-auto w-full max-w-6xl">
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="flex flex-wrap items-center gap-2.5 text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {(user.username || "User").split(" ")[0]}
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-100">
            <Store className="h-3 w-3" /> Seller
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your shop performance &amp; order queue</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {checkingNotification ? (
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-500">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-teal-600" />
            Checking…
          </div>
        ) : notificationsEnabled ? (
          <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
            <span aria-hidden="true">✅</span> Notifications enabled
          </div>
        ) : (
          <button
            onClick={enableNotification}
            className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/20"
          >
            <span aria-hidden="true">🔔</span> Enable notifications
          </button>
        )}

        <button
          onClick={handlerPush}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-800 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-700/30"
        >
          <Plus className="h-4 w-4" />
          Add listing
        </button>
      </div>
    </div>

    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard label="Total revenue"    value={`₹${stats.totalRevenue}`} deltaType="up"      icon={Coins}   color="teal"   />
      <StatCard label="Active listings"  value={stats.activeListings}     deltaType="neutral" icon={Package} color="blue"   />
      <StatCard label="New orders"       value={stats.newOrders}          deltaType="down"    icon={Clock}   color="amber"  />
      <StatCard label="Completed orders" value={stats.completedOrders}    deltaType="up"      icon={Star}    color="purple" />
    </div>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">Orders to fulfil</p>
          <button className="rounded-lg px-2.5 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-50">
            View all
          </button>
        </div>

        {pendingStats.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
            <span className="text-3xl" aria-hidden="true">🎉</span>
            <p className="text-sm font-semibold text-slate-800">You're all caught up</p>
            <p className="text-xs text-slate-500">New orders will show up here.</p>
          </div>
        ) : (
          <div className="-mx-2">
            {pendingStats.map((o) => (
              <div
                key={o.id}
                className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-xl">
                  📦
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{o.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    Buyer: {o.buyerName} · Order #{o.id}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    Quantity: {o.quantity} · {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-slate-900">
                    ₹{o.price?.toLocaleString("en-IN") ?? "N/A"}
                  </p>
                  <StatusPill status={o.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base font-semibold text-slate-900">Top-selling stamps</p>
          <button className="rounded-lg px-2.5 py-1 text-xs font-semibold text-teal-700 transition hover:bg-teal-50">
            All listings
          </button>
        </div>

        {completedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1 py-10 text-center">
            <span className="text-3xl" aria-hidden="true">🛒</span>
            <p className="text-sm font-semibold text-slate-800">No completed orders yet</p>
            <p className="text-xs text-slate-500">Finished orders will appear here.</p>
          </div>
        ) : (
          <div className="-mx-2">
            {completedOrders.map((o) => (
              <div
                key={o.id}
                className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-xl">
                  📦
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{o.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    Buyer: {o.Buyer?.User?.username ?? "Unknown Buyer"}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    Order #{o.id} · Qty: {o.quantity} · {new Date(o.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-teal-700">
                    ₹{o.price?.toLocaleString("en-IN") ?? "N/A"}
                  </p>
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700 ring-1 ring-inset ring-green-100">
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}
