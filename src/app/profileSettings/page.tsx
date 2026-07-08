"use client";

import React, { useState, ReactNode, useEffect } from "react";
import Drawer from "../../components/profile-settings/drawer";
import { ChevronRight } from "../../components/profile-settings/primitives";

import EditPersonalInfo from "../../components/profile-settings/panels/personal-info";
import EditAddressBook from "../../components/profile-settings/panels/address-book";
import EditPaymentMethods from "../../components/profile-settings/panels/payment-methods";
import EditShopDetails from "../../components/profile-settings/panels/shop-details";
import EditShopURL from "../../components/profile-settings/panels/shop-url";
import EditSocialLinks from "../../components/profile-settings/panels/social-links";
import EditNotifications from "../../components/profile-settings/panels/notifications";
import { EditPassword, EditTwoFactor, EditOrderManagement } from "../../components/profile-settings/panels/security";
import DeleteAccount from "../../components/profile-settings/panels/delete-account";
import { useAuthStore } from "@/store/authStore";
import { Camera } from "lucide-react";
import {  ChangeEvent } from "react";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";

type PanelKeys =
  | "personalInfo"
  | "addressBook"
  | "paymentMethods"
  | "shopDetails"
  | "productCatalogue"
  | "orderManagement"
  | "shopURL"
  | "socialLinks"
  | "notifications"
  | "changePassword"
  | "twoFactor"
  | "deleteAccount";

interface PanelConfig {
  title: string;
  content: ReactNode;
}

export default function ProfileSettings() {
  const [active, setActive] = useState<PanelKeys | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
   const { clearUser } = useAuthStore();
  const router = useRouter();
  

type User = {
  id: string;
  username: string;
  email: string;
  role:string;
};

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");

      console.log("res:", res);
      console.log("res.data:", res.data);
      console.log("res.data.data:", res.data.data);

      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUser();
}, []);
  
  const previewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      setAvatar(URL.createObjectURL(file));
    };

  const open = (id: PanelKeys) => setActive(id);
  const close = () => setActive(null);

  const getInitials = (nameString: string) => {
    const parts = nameString.trim().split(" ");
    if (parts.length === 0 || !parts[0]) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const Section = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="mb-6">
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em] font-semibold mb-1.5 px-1">{title}</p>
      <div className="bg-[#0d1b2e] border border-[#1e3a5f] rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );

  const Row = ({ label, sub, id, danger }: { label: string; sub?: string; id: PanelKeys; danger?: boolean }) => (
    <button
      onClick={() => open(id)}
      className="w-full flex items-center justify-between px-4 py-3.5 border-b border-[#1e3a5f] last:border-0 hover:bg-[#111f33] transition-colors text-left group"
    >
      <div>
        <p className={`text-sm font-medium ${danger ? "text-red-400" : "text-white"}`}>{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      <span className={`transition-transform group-hover:translate-x-0.5 ${danger ? "text-red-600" : "text-gray-600"}`}>
        <ChevronRight />
      </span>
    </button>
  );

  const panels: Record<PanelKeys, PanelConfig> = {
    personalInfo: { title: "Personal info", content: <EditPersonalInfo onClose={close} /> },
    addressBook: { title: "Address book", content: <EditAddressBook onClose={close} /> },
    paymentMethods: { title: "Payment methods", content: <EditPaymentMethods onClose={close} /> },
    shopDetails: { title: "Shop details", content: <EditShopDetails onClose={close} /> },
    productCatalogue: { title: "Product catalogue", content: <div className="text-gray-400 text-sm">Manage your 128 active listings in the full catalogue view.</div> },
    orderManagement: { title: "Order management", content: <EditOrderManagement onClose={close} /> },
    shopURL: { title: "Shop URL", content: <EditShopURL onClose={close} /> },
    socialLinks: { title: "Social links", content: <EditSocialLinks onClose={close} /> },
    notifications: { title: "Notifications", content: <EditNotifications onClose={close} /> },
    changePassword: { title: "Change password", content: <EditPassword onClose={close} /> },
    twoFactor: { title: "Two-factor auth", content: <EditTwoFactor onClose={close} /> },
    deleteAccount: { title: "Delete account", content: <DeleteAccount onClose={close} /> },
  };

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
    <div className="min-h-screen bg-[#060e18] text-white font-sans">
      <div className="max-w-sm mx-auto px-4 pt-12 pb-24">
        
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative group cursor-pointer mb-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1e4080] via-[#2563eb] to-purple-600 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
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
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">{user?.username}</h2>
          <p className="text-xs text-gray-500 mt-1 font-mono bg-[#0d1b2e] border border-[#1e3a5f] px-2.5 py-0.5 rounded-full">
            {user?.email}
          </p>
        </div>

        <Section title="Account">
          <Row label="Personal info" sub="Name, email, phone" id="personalInfo" />
          <Row label="Address book" sub="3 saved addresses" id="addressBook" />
          <Row label="Payment methods" sub="2 cards on file" id="paymentMethods" />
        </Section>

        <Section title="Shop">
          <Row label="Shop details" sub="Name, bio, logo" id="shopDetails" />
          <Row label="Product catalogue" sub="128 active listings" id="productCatalogue" />
          <Row label="Order management" sub="12 awaiting action" id="orderManagement" />
          <Row label="Shop URL" sub="snap.shop/sarahnielsen" id="shopURL" />
          <Row label="Social links" sub="Instagram · TikTok" id="socialLinks" />
        </Section>

        <Section title="Notifications">
          <Row label="Push notifications" sub="Order updates, promotions" id="notifications" />
          <Row label="Order alerts" sub="New orders & shipping" id="notifications" />
        </Section>

        <Section title="Security">
          <Row label="Change password" sub="Last changed 3 months ago" id="changePassword" />
          <Row label="Two-factor auth" sub="Extra login security" id="twoFactor" />
        </Section>

        <Section title="Danger zone">
          <button
            onClick={() => open("deleteAccount")}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-red-950/20 transition-colors text-left group"
          >
            <div>
              <p className="text-sm font-medium text-red-400">Delete account</p>
              <p className="text-xs text-red-900 mt-0.5">This cannot be undone</p>
            </div>
            <span className="text-red-800 group-hover:translate-x-0.5 transition-transform"><ChevronRight /></span>
          </button>
        </Section>

        <Section title="Logout">
          <button onClick={logoutHandler} className="w-full  text-sm text-gray-500 hover:text-gray-300 transition-colors  py-2">
          Sign out
        </button>
        </Section>
      </div>

      {Object.entries(panels).map(([id, { title, content }]) => (
        <Drawer key={id} title={title} open={active === id} onClose={close}>
          {content}
        </Drawer>
      ))}
    </div>
  );
}