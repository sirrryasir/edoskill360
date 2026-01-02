import { create } from "zustand";

export interface Skill {
  _id: string;
  name: string;
  category: string;
}

export interface UserSkill {
  _id: string;
  userId: string;
  skillId: Skill;
  score: number;
  verified: boolean;
}

interface SkillState {
  availableSkills: Skill[];
  userSkills: UserSkill[];
  isLoading: boolean;
  fetchSkills: () => Promise<void>;
  fetchUserSkills: () => Promise<void>;
  addSkill: (skillId: string) => Promise<void>;
}

export const useSkillStore = create<SkillState>((set) => ({
  availableSkills: [],
  userSkills: [],
  isLoading: false,
  fetchSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      set({ availableSkills: data });
    } catch (error) {
      console.error("Failed to fetch skills", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchUserSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/skills/my-skills");
      if (res.ok) {
        const data = await res.json();
        set({ userSkills: data });
      }
    } catch (error) {
      console.error("Failed to fetch user skills", error);
    } finally {
      set({ isLoading: false });
    }
  },
  addSkill: async (skillId: string) => {
    try {
      const res = await fetch("/api/skills/my-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId }),
      });
      if (res.ok) {
        // Refresh user skills to show the new one
        await useSkillStore.getState().fetchUserSkills();
      }
    } catch (error) {
      console.error("Failed to add skill", error);
    }
  },
}));
