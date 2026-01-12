import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "worker" | "employer" | "admin" | "agent";
  verificationStage?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  login: (userData) => {
    set({ user: userData });
  },
  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed", error);
    }
    set({ user: null });
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/users/profile");
      if (res.ok) {
        const user = await res.json();
        set({ user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));
