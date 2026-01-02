"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTaskStore } from "@/store/useTaskStore";
import { useSkillStore } from "@/store/useSkillStore";
import CreateTaskForm from "@/components/CreateTaskForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Box } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { tasks, fetchTasks, deleteTask } = useTaskStore();
  const { fetchSkills } = useSkillStore();

  useEffect(() => {
    fetchTasks();
    fetchSkills();
  }, [fetchTasks, fetchSkills]);

  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center p-8 bg-red-50 text-red-600 rounded-xl border border-red-200">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You must be an administrator to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage system tasks and content.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Create Task Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 rounded-2xl sticky top-24">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Box className="w-5 h-5 text-blue-600" />
              Create New Task
            </h2>
            <CreateTaskForm />
          </div>
        </div>

        {/* Existing Tasks List */}
        <div className="lg:col-span-2">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Task Management</h2>
              <Badge variant="outline">{tasks.length} Tasks</Badge>
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-slate-500">No tasks found.</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Create a new task to get started.
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:shadow-sm"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {typeof task.skillId === "object" &&
                          task.skillId?.name
                            ? task.skillId.name
                            : "Unknown Skill"}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span
                          className={`capitalize ${
                            task.difficulty === "hard"
                              ? "text-red-500"
                              : task.difficulty === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {task.difficulty}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => deleteTask(task._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
