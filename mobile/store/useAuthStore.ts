import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Fiiro gaar ah: Bedel IP-kan markaad emulator isticmaalayso (e.g. 10.0.2.2 for Android)
const API_URL = 'http://localhost:5000/api'; 

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        try {
          // Halkan waxaan ku xiri doonaa backend-ka
          // const response = await axios.post(`${API_URL}/auth/login`, { email, password });
          // set({ user: response.data.user, token: response.data.token });
          
          // Mock login for now
          set({ 
            user: { id: '1', name: 'Yaxye Ali', email, role: 'worker' },
            token: 'mock-token-123'
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
