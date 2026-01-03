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

interface Worker {
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
  freelancers: Worker[];
  currentJob: Job | null;
  currentFreelancer: Worker | null;
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  fetchFreelancers: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  fetchFreelancerById: (id: string) => Promise<void>;
}

export const usePublicDataStore = create<PublicDataStore>((set) => ({
  jobs: [],
  freelancers: [],
  currentJob: null,
  currentFreelancer: null,
  isLoading: false,
  error: null,

  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/jobs`);
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

  fetchFreelancers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/users/workers`);
      if (!res.ok) throw new Error("Failed to fetch freelancers");
      const data = await res.json();
      set({ freelancers: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  fetchFreelancerById: async (id: string) => {
    set({ isLoading: true, error: null, currentFreelancer: null });
    try {
      const res = await fetch(`${API_URL}/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch freelancer");
      const data = await res.json();
      set({ currentFreelancer: data, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
}));
