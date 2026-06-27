"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  ArrowLeft,
  Camera,
  Star,
  User,
  MapPin,
  CreditCard,
  Store,
  Tag,
  Package,
  Globe,
  Share2,
  Bell,
  Lock,
  ShieldCheck,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";
import axios from "../../lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";



export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { clearUser } = useAuthStore();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);


  const [notifications, setNotifications] = useState({
    push: true,
    orders: true,
    twoFactor: false,
  });

  const previewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));
  };

  const save = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const Toggle = ({
    value,
    onClick,
  }: {
    value: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-11 h-6 rounded-full relative transition 
      ${value ? "bg-blue-500" : "bg-slate-600"}`}
    >
      <div
        className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full transition
        ${value ? "translate-x-5" : "translate-x-[3px]"}`}
      />
    </button>
  );

  const Row = ({
    icon,
    title,
    subtitle,
    danger,
    badge,
    children,
  }: any) => (
    <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700 last:border-none hover:bg-white/5 transition">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center 
        ${
          danger
            ? "bg-red-500/10 text-red-500"
            : "bg-blue-500/10 text-blue-500"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className={`${danger && "text-red-500"} text-sm`}>
          {title}
        </p>

        {subtitle && (
          <p className="text-xs text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {badge && (
        <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
          {badge}
        </span>
      )}

      {children ?? (
        <ChevronRight size={18} className="text-slate-500" />
      )}
    </div>
  );

  const Card = ({ children }: any) => (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      {children}
    </div>
  );

  const logoutHandler = async () => {
  try {
    await axios.post(
      "/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    clearUser();

    router.replace("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      <div className="w-full max-w-sm pb-10">
        
        <header className="flex items-center justify-between p-4 border-b border-slate-800">
          <button>
            <ArrowLeft className="text-slate-400" />
          </button>

          <h1 className="text-sm font-medium">
            Profile & Settings
          </h1>

          <button
            onClick={save}
            className={`text-sm font-medium ${
              saved
                ? "text-green-400"
                : "text-blue-500"
            }`}
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
        </header>


        <section className="flex flex-col items-center px-5 py-8">
          <div className="relative mb-4">

            <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden bg-slate-800 flex items-center justify-center text-3xl text-blue-500">
              {avatar ? (
                <img
                  src={avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              ) : (
                (
  user?.username
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase())

              )}
            </div>

            <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-900 flex items-center justify-center cursor-pointer">
              <Camera size={14} />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={previewAvatar}
              />
            </label>
          </div>


          <h2 className="text-xl font-medium">
            {user?.username}
          </h2>

          <p className="text-sm text-slate-500 mb-5">
            {user?.email}
          </p>


          <div className="grid grid-cols-3 w-full max-w-xs bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">

            {[
              ["128", "Products"],
              ["3.4k", "Orders"],
            ].map((s) => (
              <div
                key={s[1]}
                className="text-center py-4 border-r border-slate-700 last:border-none"
              >
                <p>{s[0]}</p>
                <p className="text-xs text-slate-500 uppercase">
                  {s[1]}
                </p>
              </div>
            ))}

            <div className="text-center py-4">
              <div className="flex justify-center items-center gap-1">
                4.9 <Star size={13} fill="orange" />
              </div>

              <p className="text-xs text-slate-500 uppercase">
                Rating
              </p>
            </div>

          </div>
        </section>


        <div className="px-4 space-y-5">

          <Section title="Account">
            <Card>
              <Row icon={<User size={17}/>} title="Personal info" subtitle="Name, email, phone"/>
              <Row icon={<MapPin size={17}/>} title="Address book" subtitle="3 saved addresses"/>
              <Row icon={<CreditCard size={17}/>} title="Payment methods" subtitle="2 cards on file"/>
            </Card>
          </Section>


          <Section title="Shop">
            <Card>
              <Row icon={<Store size={17}/>} title="Shop details" subtitle="Name, bio, logo"/>
              <Row icon={<Tag size={17}/>} title="Product catalogue" subtitle="128 active listings"/>
              <Row icon={<Package size={17}/>} title="Order management" subtitle="12 awaiting action" badge="12"/>
              <Row icon={<Globe size={17}/>} title="Shop URL" subtitle="snap.shop/sarahnielsen"/>
              <Row icon={<Share2 size={17}/>} title="Social links" subtitle="Instagram · TikTok"/>
            </Card>
          </Section>


          <Section title="Notifications">
            <Card>
              <Row icon={<Bell size={17}/>}
              title="Push notifications"
              subtitle="Order updates, promotions">
                <Toggle
                  value={notifications.push}
                  onClick={()=>setNotifications({
                    ...notifications,
                    push: !notifications.push
                  })}
                />
              </Row>

              <Row icon={<Package size={17}/>}
              title="Order alerts"
              subtitle="New orders & shipping">
                <Toggle
                  value={notifications.orders}
                  onClick={()=>setNotifications({
                    ...notifications,
                    orders: !notifications.orders
                  })}
                />
              </Row>
            </Card>
          </Section>


          <Section title="Security">
            <Card>
              <Row icon={<Lock size={17}/>}
              title="Change password"
              subtitle="Last changed 3 months ago"/>

              <Row icon={<ShieldCheck size={17}/>}
              title="Two-factor auth"
              subtitle="Extra login security">
                <Toggle
                  value={notifications.twoFactor}
                  onClick={()=>setNotifications({
                    ...notifications,
                    twoFactor: !notifications.twoFactor
                  })}
                />
              </Row>
            </Card>
          </Section>


          <Section title="Danger zone">
  <Card>
    <button
      onClick={logoutHandler}
      className="w-full flex items-center gap-3 px-4 py-4 border-b border-slate-700 hover:bg-white/5 transition"
    >
      <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
        <LogOut size={17} />
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm text-red-500">Sign out</p>
      </div>
    </button>

    <button
      
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition"
    >
      <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
        <Trash2 size={17} />
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm text-red-500">Delete account</p>
        <p className="text-xs text-slate-500">
          This cannot be undone
        </p>
      </div>
    </button>
  </Card>
</Section>

          <p className="text-center text-xs text-slate-500">
            SnapShop v1.0.0
          </p>

        </div>

      </div>
    </div>
  );
}


function Section({
  title,
  children,
}: any) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-2 ml-1">
        {title}
      </h3>
      {children}
    </div>
  );
}