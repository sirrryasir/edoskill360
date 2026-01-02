"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useSkillStore } from "@/store/useSkillStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CreateTaskForm() {
  const { createTask } = useTaskStore();
  const { availableSkills } = useSkillStore();
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    skillId: string;
    difficulty: "easy" | "medium" | "hard";
    maxScore: number;
    timeLimit: number;
  }>({
    title: "",
    description: "",
    skillId: "",
    difficulty: "easy",
    maxScore: 100,
    timeLimit: 30,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(formData);
    // Reset form or show success (simplified)
    setFormData({ ...formData, title: "", description: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. React Basics"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Skill</Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, skillId: val })
                }
                value={formData.skillId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Skill" />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                onValueChange={(val) =>
                  setFormData({
                    ...formData,
                    difficulty: val as "easy" | "medium" | "hard",
                  })
                }
                value={formData.difficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Max Score</Label>
              <Input
                type="number"
                value={formData.maxScore}
                onChange={(e) =>
                  setFormData({ ...formData, maxScore: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <Button type="submit">Create Task</Button>
        </form>
      </CardContent>
    </Card>
  );
}
