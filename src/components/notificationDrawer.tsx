"use client";

import { useEffect, useState } from "react";
import {
  X,
  CheckCheck,
  Bell,
  MessageCircle,
  ShoppingBag,
  UserPlus,
} from "lucide-react";
import axios from "../lib/axios";

type Notification = {
  id: string;
  type:  "ORDER" | "REQUEST";
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
  entityId?: string | null;
  entityType?: string | null;
  actionUrl?: string | null;
};

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({
  open,
  onClose,
}: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    if (!open) return;

    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:4000/api/notifications"
        );

        console.log(
          "NOTIFICATION RESPONSE:",
          response.data
        );

        const data =
          response.data?.data?.notifications;

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );

        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  const markAllAsRead = async () => {
    try {
      await axios.patch(
        "http://localhost:4000/api/notifications/read-all"
      );

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark notifications as read:",
        error
      );
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/notifications/${id}/read`
      );

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  const handleAcceptRequest = async (id: string) => {
  try {
    await axios.patch(
      `http://localhost:4000/api/notifications/${id}/accept`
    );

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              isRead: true,
            }
          : notification
      )
    );
  } catch (error) {
    console.error(
      "Failed to accept request:",
      error
    );
  }
};

const handleDeclineRequest = async (id: string) => {
  try {
    await axios.patch(
      `http://localhost:4000 /api/notifications/${id}/decline`
    );

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              isRead: true,
            }
          : notification
      )
    );
  } catch (error) {
    console.error(
      "Failed to decline request:",
      error
    );
  }
};

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-gray-800 dark:bg-gray-950 sm:w-[420px] md:w-[440px] lg:max-w-md ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>

              {unreadCount > 0 && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {unreadCount} new
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Stay updated with your latest activity
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notifications"
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 dark:border-gray-800">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Recent notifications
          </span>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <CheckCheck size={15} />
              Mark all as read
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex h-full min-h-[400px] items-center justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading notifications...
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <EmptyNotifications />
          ) : (
            <div>
              {notifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onAccept={handleAcceptRequest}
                    onDecline={handleDeclineRequest}
                  />
                )
              )}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <button className="w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            View all notifications
          </button>
        </div>
      </aside>
    </>
  );
}

function NotificationItem({
  notification,
  onRead,
  onAccept,
  onDecline,
}: {
  notification: Notification;
  onRead: (id: string) => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  const isRequest = notification.type === "REQUEST";

  const getIcon = () => {
    switch (notification.type) {
      case "ORDER":
        return <ShoppingBag size={18} />;

      case "REQUEST":
        return <UserPlus size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  const getIconStyle = () => {
    switch (notification.type) {
      case "ORDER":
        return "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400";

      case "REQUEST":
        return "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";

      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400";
    }
  };

  const time = new Date(
    notification.createdAt
  ).toLocaleString();

  return (
    <div
      className={`flex gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800 ${
        !notification.isRead
          ? "bg-blue-50/50 dark:bg-blue-500/[0.04]"
          : ""
      }`}
      onClick={() => {
        if (!notification.isRead) {
          onRead(notification.id);
        }
      }}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyle()}`}
      >
        {getIcon()}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {notification.title}
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {notification.description}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          {time}
        </p>


        {isRequest && (
          <div className="mt-3 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAccept(notification.id);
              }}
              className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
            >
              Accept
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDecline(notification.id);
              }}
              className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
            >
              Decline
            </button>
          </div>
        )}
      </div>

      {!notification.isRead && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
      )}
    </div>
  );
}
function EmptyNotifications() {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Bell
          className="text-gray-400"
          size={24}
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
        No notifications
      </h3>

      <p className="mt-1 max-w-xs text-sm text-gray-500 dark:text-gray-400">
        You're all caught up. New notifications
        will appear here.
      </p>
    </div>
  );
}