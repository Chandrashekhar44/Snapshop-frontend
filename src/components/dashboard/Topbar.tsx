"use client";

import { Thread } from "@/types/inbox";
import axios from "@/lib/axios";
import {
  Bell,
  MailCheck,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NotificationDrawer from "../notificationDrawer";

type User = {
  username: string;
};

type TopbarProps = {
  user: User;
  activeRole: "buyer" | "seller";
  onRoleChange: (role: "buyer" | "seller") => void;
};

export default function Topbar({
  user,
  activeRole,
  onRoleChange,
}: TopbarProps) {

  const router = useRouter();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [hasUnreadNotification, setHasUnreadNotification] =
    useState(false);


  useEffect(() => {

    const fetchThreads = async () => {
      try {

        const sellerId = localStorage.getItem("userId");

        const response = await axios.get(
          `/api/messages/seller/${sellerId}`
        );

        setThreads(response.data);

      } catch (error) {
        console.error(
          "Error fetching threads:",
          error
        );
      }
    };


    fetchThreads();

  }, []);



  const messageUnreadCount =
    threads.filter(
      (thread) => thread.unread > 0
    ).length;



  const messagingHandle = () => {
    router.push("/inbox");
  };



  const getInitials = (name: string) => {

    const names = name.trim().split(/\s+/);


    if (names.length === 1) {
      return names[0]
        .charAt(0)
        .toUpperCase();
    }


    return (
      names[0][0] +
      names[1][0]
    ).toUpperCase();

  };



  const profileHandler = () => {
    router.push("/profileSettings");
  };



  return (

    <header
      className="
      bg-slate-950 
      border-b 
      border-slate-800 
      px-6 
      py-3 
      flex 
      items-center 
      justify-between 
      flex-shrink-0
      "
    >


      <div className="flex items-center gap-3">

        <div
          className="
          w-9 
          h-9 
          rounded-lg 
          bg-blue-500 
          flex 
          items-center 
          justify-center
          "
        >
          <MailCheck
            className="w-5 h-5 text-white"
          />
        </div>


        <button
          onClick={() => router.push("/")}
          className="
          text-slate-100 
          font-medium 
          text-[17px] 
          tracking-wide 
          cursor-pointer
          "
        >
          Snap
          <span className="text-blue-400">
            Shop
          </span>
        </button>

      </div>




      <div className="flex items-center gap-4">


        {/* Notification Bell */}

        <button
          onClick={() => setNotificationOpen(true)}
          className="
          relative 
          text-slate-400 
          hover:text-slate-200 
          transition-colors
          "
          aria-label="Notifications"
        >

          <Bell className="w-5 h-5" />


          {hasUnreadNotification && (

            <span
              className="
              absolute 
              -top-0.5 
              -right-0.5 
              w-2 
              h-2 
              bg-red-500 
              rounded-full 
              border-2 
              border-slate-950
              "
            />

          )}

        </button>



        <NotificationDrawer

          open={notificationOpen}

          onClose={() =>
            setNotificationOpen(false)
          }

          onUnreadChange={
            setHasUnreadNotification
          }

        />





        <button
          className="
          relative 
          text-slate-400 
          hover:text-slate-200 
          transition-colors
          "
          aria-label="Messages"
          onClick={messagingHandle}
        >

          <MessageCircle
            className="w-5 h-5"
          />


          {messageUnreadCount > 0 && (

            <span
              className="
              absolute 
              -top-2 
              -right-2 
              min-w-[18px] 
              h-[18px] 
              px-1 
              flex 
              items-center 
              justify-center 
              text-[10px] 
              font-bold 
              text-white 
              bg-red-500 
              rounded-full
              "
            >

              {
                messageUnreadCount > 99
                  ? "99+"
                  : messageUnreadCount
              }

            </span>

          )}

        </button>


        <button
          onClick={profileHandler}
          className="
          w-10 
          h-10 
          bg-sky-500 
          hover:bg-sky-600 
          text-white 
          rounded-full 
          shadow-md 
          transition 
          flex 
          items-center 
          justify-center 
          font-semibold
          "
        >

          {getInitials(user.username)}

        </button>



      </div>


    </header>

  );
}