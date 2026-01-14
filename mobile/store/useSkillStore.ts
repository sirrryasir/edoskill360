import { create } from 'zustand';
import api from '@/config/api';

interface Skill {
  _id: string;
  name: string;
  category: string;
}

interface UserSkill {
  _id: string;
  skillId: Skill;
  userId: string;
  verified: boolean;
  score: number;
  evidence: string;
}

interface SkillState {
  availableSkills: Skill[];
  userSkills: UserSkill[];
  isLoading: boolean;
  fetchSkills: () => Promise<void>;
  fetchUserSkills: () => Promise<void>;
  addSkill: (skillId: string) => Promise<void>;
}

export const useSkillStore = create<SkillState>((set, get) => ({
  availableSkills: [],
  userSkills: [],
  isLoading: false,

  fetchSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/skills');
      set({ availableSkills: res.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching skills:', error);
      set({ isLoading: false });
    }
  },

  fetchUserSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/skills/user'); // Assuming this endpoint exists based on client store
      set({ userSkills: res.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching user skills:', error);
      set({ isLoading: false });
    }
  },

  addSkill: async (skillId: string) => {
    try {
      const res = await api.post('/skills/assign', { skillId });
      // Optimistic update or refetch
      const newUserSkill = res.data;
      set((state) => ({
        userSkills: [...state.userSkills, newUserSkill],
      }));
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  },
}));
