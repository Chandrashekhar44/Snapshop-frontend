import { MapPin } from "lucide-react";
import { Thread } from "@/types/inbox";
import { cn } from "@/lib/utils";

interface ThreadItemProps {
  thread: Thread;
  isActive: boolean;
  onClick: () => void;
}

export default function ThreadItem({
  thread,
  isActive,
  onClick,
}: ThreadItemProps) {
  const hasUnread = thread.unread > 0;
  console.log("unread",hasUnread)

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 border-b border-gray-100 px-3.5 py-3 text-left transition-colors",
        isActive
          ? "bg-sky-100"
          : hasUnread
          ? "bg-blue-50 hover:bg-blue-100"
          : "hover:bg-sky-50"
      )}
    >
      <div className="relative shrink-0">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium",
            hasUnread
              ? "bg-blue-100 text-blue-800"
              : "bg-sky-100 text-sky-800"
          )}
        >
          {thread.initials}
        </div>

        {thread.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <span
            className={cn(
              "text-sm",
              hasUnread
                ? "font-bold text-gray-900"
                : "font-medium text-gray-700"
            )}
          >
            {thread.name}
          </span>

          <span
            className={cn(
              "ml-2 shrink-0 text-[10px]",
              hasUnread
                ? "font-semibold text-blue-600"
                : "text-gray-400"
            )}
          >
            {thread.time}
          </span>
        </div>

        <p
          className={cn(
            "mt-0.5 truncate text-xs",
            hasUnread
              ? "font-medium text-gray-900"
              : "text-gray-500"
          )}
        >
          {thread.preview}
        </p>

        <div className="mt-1 flex items-center justify-between">
          <span className="flex items-center gap-0.5 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] text-sky-600">
            <MapPin size={9} />
            {thread.distanceLabel}
          </span>

          {hasUnread && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-semibold text-white">
              {thread.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}