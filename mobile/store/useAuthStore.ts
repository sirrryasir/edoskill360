import { create } from "zustand";
import api from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "talent" | "employer" | "admin" | "agent";
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
  login: async (userData) => {
    set({ user: userData });
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    }
    set({ user: null });
    await AsyncStorage.removeItem("user");
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      // First check local storage for fast load
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }

      // Then verify with server
      const res = await api.get("/users/profile");
      if (res.data) {
        set({ user: res.data, isLoading: false });
        await AsyncStorage.setItem("user", JSON.stringify(res.data));
      } else {
        set({ user: null, isLoading: false });
        await AsyncStorage.removeItem("user");
      }
    } catch (error) {
      console.log("Check auth error:", error);
      // If server is unreachable but we have stored user, maybe keep them logged in?
      // For now, let's trust the storage if the network fails, or logout if it's a 401
      // Ideally we check error.response.status
      set({ isLoading: false });
    }
  },
}));