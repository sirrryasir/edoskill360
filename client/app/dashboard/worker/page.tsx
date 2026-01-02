"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useSkillStore } from "@/store/useSkillStore";
import { useTaskStore } from "@/store/useTaskStore";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Plus } from "lucide-react";

export default function WorkerDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { getTaskBySkill } = useTaskStore();
  const {
    availableSkills,
    userSkills,
    fetchSkills,
    fetchUserSkills,
    addSkill,
  } = useSkillStore();
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    fetchSkills();
    fetchUserSkills();
  }, [fetchSkills, fetchUserSkills]);

  const handleAddSkill = async () => {
    if (selectedSkill) {
      await addSkill(selectedSkill);
      setSelectedSkill("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
            Worker Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your skills and verification status.
          </p>
        </div>
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium">Looking for work</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
             <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h2 className="text-xl font-bold mb-6 relative z-10">My Profile</h2>
                
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <div>
                            <div className="text-lg font-bold">{user?.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{user?.role}</div>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                         <div>
                            <span className="text-xs font-semibold uppercase text-slate-400">Email</span>
                            <div className="text-sm font-medium truncate">{user?.email}</div>
                         </div>
                         <div>
                            <span className="text-xs font-semibold uppercase text-slate-400">Bio</span>
                            <div className="text-sm text-slate-500 italic">No bio added yet.</div>
                         </div>
                    </div>
                     <Button variant="outline" className="w-full">Edit Profile</Button>
                </div>
             </div>
        </div>

        {/* Skills Section */}
        <div className="md:col-span-2 space-y-6">
             <div className="glass-card p-8 rounded-2xl">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-xl font-bold">My Skills</h2>
                        <p className="text-sm text-slate-500">Verified skills boost your visibility.</p>
                    </div>
                    
                    {/* Add Skill Interface */}
                    <div className="flex w-full sm:w-auto gap-2">
                         <Select onValueChange={setSelectedSkill} value={selectedSkill}>
                            <SelectTrigger className="w-full sm:w-[200px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                <SelectValue placeholder="Select a skill..." />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSkills
                                    .filter(skill => !userSkills.some(us => us.skillId._id === skill._id))
                                    .map(skill => (
                                        <SelectItem key={skill._id} value={skill._id}>
                                            {skill.name}
                                        </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleAddSkill} disabled={!selectedSkill} size="icon" className="shrink-0 bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                 </div>

                 {/* Skills List */}
                 <div className="space-y-4">
                    {userSkills.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                            <p className="text-slate-500">You haven't added any skills yet.</p>
                            <p className="text-sm text-slate-400 mt-1">Add a skill above to get started.</p>
                        </div>
                    ) : (
                        userSkills.map((us) => (
                            <div key={us._id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-900 transition-all shadow-sm hover:shadow-md">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${us.verified ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                                        {us.verified ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{us.skillId.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={us.verified ? "default" : "secondary"} className={us.verified ? "bg-green-600 hover:bg-green-700" : ""}>
                                                {us.verified ? "Verified" : "Pending Verification"}
                                            </Badge>
                                            {us.verified && <span className="text-sm font-bold text-slate-500">Score: {us.score}%</span>}
                                        </div>
                                    </div>
                                </div>
                                
                                {!us.verified && (
                                    <Button 
                                        className="w-full sm:w-auto"
                                        onClick={async () => {
                                            const task = await getTaskBySkill(us.skillId._id);
                                            if (task) {
                                              router.push(`/tasks/${task._id}`);
                                            } else {
                                              alert("No assessment available for this skill yet.");
                                            }
                                        }}
                                    >
                                        Take Assessment
                                    </Button>
                                )}
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
