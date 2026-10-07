import { create } from "zustand";
import { Thread } from "@/types/inbox";

interface MessageStore {
  threads: Thread[];

  activeConversationId: number | null;

  setThreads: (
    threads:
      | Thread[]
      | ((prev: Thread[]) => Thread[])
  ) => void;

  setActiveConversationId: (
    id: number
  ) => void;

  clearActiveConversation: () => void;
}

export const useMessageStore =
  create<MessageStore>((set) => ({
    threads: [],

    activeConversationId: null,

    setThreads: (threads) =>
      set((state) => ({
        threads:
          typeof threads === "function"
            ? threads(state.threads)
            : threads,
      })),

    setActiveConversationId: (id) =>
      set({
        activeConversationId: id,
      }),

    clearActiveConversation: () =>
      set({
        activeConversationId: null,
      }),
  }));