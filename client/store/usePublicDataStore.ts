import { create } from "zustand";

// Helper to ensure correct API URL format
const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.endsWith("/api") ? url : `${url}/api`;
};

const API_URL = getApiUrl();

interface Job {
  _id: string;
  title: string;
  companyName?: string;
  employerId: {
    _id: string;
    name: string;
    companyName?: string;
    bio?: string;
    location?: string;
  };
  location: string;
  type: string;
  salaryRange?: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

interface UserSkill {
  _id: string;
  skillId: { _id: string; name: string; category: string };
  score: number;
  verified: boolean;
}

interface Review {
  _id: string;
  employerId: { _id: string; name: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface Talent {
  _id: string;
  name: string;
  headline: string;
  bio: string;
  location: string;
  skills?: UserSkill[]; // Populated in single view
  reviews?: Review[]; // Populated in single view
}

interface PublicDataStore {
  jobs: Job[];
  talents: Talent[];
  currentJob: Job | null;
  currentTalent: Talent | null;
  isLoading: boolean;
  error: string | null;
  fetchJobs: (filters?: any) => Promise<void>;
  fetchTalents: (filters?: any) => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  fetchTalentById: (id: string) => Promise<void>;
}

export const usePublicDataStore = create<PublicDataStore>((set) => ({
  jobs: [],
  talents: [],
  currentJob: null,
  currentTalent: null,
  isLoading: false,
  error: null,

  fetchJobs: async (filters?: any) => {
    set({ isLoading: true, error: null });
    try {
      // Clean filters to remove undefined/null/empty values
      const cleanFilters: any = {};
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            cleanFilters[key] = value;
          }
        });
      }
      const query = new URLSearchParams(cleanFilters).toString();
      const res = await fetch(`${API_URL}/jobs?${query}`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      set({ jobs: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  fetchJobById: async (id: string) => {
    set({ isLoading: true, error: null, currentJob: null });
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch job");
      const data = await res.json();
      set({ currentJob: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  fetchTalents: async (filters?: any) => {
    set({ isLoading: true, error: null });
    try {
      // Clean filters to remove undefined/null/empty values
      const cleanFilters: any = {};
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            cleanFilters[key] = value;
          }
        });
      }
      const query = new URLSearchParams(cleanFilters).toString();
      const res = await fetch(`${API_URL}/users/talents?${query}`);
      if (!res.ok) throw new Error("Failed to fetch Talents");
      const data = await res.json();
      set({ talents: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  fetchTalentById: async (id: string) => {
    set({ isLoading: true, error: null, currentTalent: null });
    try {
      const res = await fetch(`${API_URL}/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch talent");
      const data = await res.json();
      set({ currentTalent: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
}));
