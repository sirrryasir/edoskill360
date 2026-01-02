import { create } from "zustand";

export interface Job {
  _id: string;
  employerId: string;
  title: string;
  description: string;
  requirements: string[];
  salaryRange: string;
  location: string;
  type: string;
  status: string;
}

interface JobState {
  jobs: Job[];
  myJobs: Job[]; // For employers
  isLoading: boolean;
  fetchJobs: () => Promise<void>;
  fetchMyJobs: () => Promise<void>;
  createJob: (jobData: any) => Promise<void>;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  myJobs: [],
  isLoading: false,
  fetchJobs: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      set({ jobs: data });
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMyJobs: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/jobs/my-jobs");
      if (res.ok) {
        const data = await res.json();
        set({ myJobs: data });
      }
    } catch (error) {
      console.error("Failed to fetch my jobs", error);
    } finally {
      set({ isLoading: false });
    }
  },
  createJob: async (jobData) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      if (res.ok) {
        await get().fetchMyJobs();
      }
    } catch (error) {
      console.error("Failed to create job", error);
    }
  },
}));
