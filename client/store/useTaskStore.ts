import { create } from "zustand";

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

export interface Task {
  _id: string;
  skillId: { _id: string; name: string; category: string } | string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  questions: Question[];
  maxScore: number;
  timeLimit: number;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  submitTask: (taskId: string, answers: any[]) => Promise<any>;
  getTaskBySkill: (skillId: string) => Promise<Task | null>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      set({ tasks: data });
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      set({ isLoading: false });
    }
  },
  createTask: async (taskData) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (res.ok) {
        await get().fetchTasks();
      }
    } catch (error) {
      console.error("Failed to create task", error);
    }
  },
  deleteTask: async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) }));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  },
  submitTask: async (taskId, answers) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to submit task", error);
      throw error;
    }
  },
  getTaskBySkill: async (skillId) => {
    try {
      const res = await fetch(`/api/tasks/skill/${skillId}`);
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (error) {
      console.error("Failed to get task by skill", error);
      return null;
    }
  },
}));
