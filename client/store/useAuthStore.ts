import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "worker" | "employer" | "admin";
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
    localStorage.setItem("user", JSON.stringify(userData));
  },
  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed", error);
    }
    set({ user: null });
    localStorage.removeItem("user");
  },
  checkAuth: async () => {
    try {
      // Ideally verify with backend, but for MVP check local + profile
      // Or better: call /api/users/profile to validate session
      const res = await fetch("/api/users/profile");
      if (res.ok) {
        const user = await res.json();
        set({ user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
        localStorage.removeItem("user");
      }
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));
