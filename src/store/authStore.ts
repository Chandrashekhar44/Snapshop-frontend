import { create } from "zustand";

type User = {
  id: number;
  username: string;
  email: string;
  role: "BUYER" | "SELLER";
};

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) =>
    set({ user }),

  clearUser: () =>
    set({ user: null }),
}));