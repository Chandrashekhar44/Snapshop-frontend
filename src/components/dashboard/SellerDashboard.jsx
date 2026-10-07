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
    setPendingStats(response.data);

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
    <div>
            
      <div className="flex items-start justify-between mb-5">

  <div>
    <h1 className="text-xl font-medium text-slate-900 flex items-center gap-2">
      Welcome back, {(user.username || "User").split(" ")[0]}

      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-800">
        <Store className="w-3 h-3" /> Seller
      </span>

    </h1>

    <p className="text-sm text-slate-500 mt-0.5">
      Your shop performance & order queue
    </p>

  </div>


  <div className="flex items-center gap-3">
{checkingNotification ? (
  <div>
    Checking...
  </div>

) : notificationsEnabled ? (

  <div
    className="
      flex items-center gap-2
      px-4 py-2
      rounded-lg
      bg-green-50
      border border-green-200
      text-green-700
      text-sm font-medium
    "
  >
    ✅ Notifications Enabled
  </div>

) : (

  <button
    onClick={enableNotification}
    className="
      flex items-center gap-2
      px-4 py-2
      rounded-lg
      border border-teal-200
      bg-teal-50
      text-teal-700
      text-sm font-medium
      hover:bg-teal-100
    "
  >
    🔔 Enable Notifications
  </button>

)}


    <button
      onClick={handlerPush}
      className="
      flex items-center gap-1.5
      px-4 py-2
      rounded-lg
      bg-teal-700
      text-white
      text-sm font-medium
      hover:bg-teal-800
      transition-colors
      "
    >
      <Plus className="w-4 h-4" />
      Add listing
    </button>

  </div>

</div>

      <div className="grid grid-cols-4 gap-3 mb-5">
       <StatCard label="Total revenue" value={`₹${stats.totalRevenue}`}  deltaType="up" icon={Coins}color="teal"/>
       <StatCard label="Active listings" value={stats.activeListings}  deltaType="neutral" icon={Package} color="blue"/>
       <StatCard label="New orders" value={stats.newOrders}  deltaType="down" icon={Clock} color="amber"/>
       <StatCard label="Completed Orders" value={stats.completedOrders}   deltaType="up" icon={Star} color="purple"/>
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-3 mb-5">

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-900">Orders to fulfil</p>
            <button className="text-xs text-teal-700 hover:underline">View all</button>
          </div>
          {pendingStats.map((o) => (
  <div
    key={o.id}
    className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0"
  >
    <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-lg flex-shrink-0">
      📦
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-slate-900 truncate">
        {o.name}
      </p>

      <p className="text-[11px] text-slate-500">
        Buyer: {o.buyerName} · Order #{o.id}
      </p>

      <p className="text-[11px] text-slate-400">
        Quantity: {o.quantity} ·{" "}
        {new Date(o.createdAt).toLocaleDateString()}
      </p>
    </div>

    <div className="text-right flex-shrink-0">
      <p className="text-xs font-medium text-slate-900">
        ₹{o.price?.toLocaleString("en-IN") ?? "N/A"}
      </p>

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
         {completedOrders.length === 0 ? (
  <div className="flex items-center justify-center py-8">
    <p className="text-sm text-slate-500">
      No completed orders
    </p>
  </div>
) : (
  completedOrders.map((o) => (
    <div
      key={o.id}
      className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0"
    >
      <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center text-base flex-shrink-0">
        📦
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-900 truncate">
          {o.name}
        </p>

        <p className="text-[11px] text-slate-500">
          Buyer: {o.Buyer.User.username}
        </p>

        <p className="text-[11px] text-slate-400">
          Order #{o.id} · Qty: {o.quantity}
        </p>

        <p className="text-[11px] text-slate-400">
          {new Date(o.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-xs font-medium text-teal-700">
          ₹{o.price?.toLocaleString("en-IN") ?? "N/A"}
        </p>

        <p className="text-[10px] text-green-600 font-medium">
          {o.status}
        </p>
      </div>
    </div>
  ))
)}
        </div>
      </div>

     
    </div>
  );
}
