"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  CheckCircle2,
  AlertCircle,
  Plus,
  Briefcase,
  User,
  FileText,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerificationTab from "@/components/dashboard/VerificationTab";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Suspense } from "react";

function TalentDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "skills";
  const { user, isLoading } = useAuthStore();
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
    if (!isLoading) {
      if (!user) {
        router.push("/login?redirect=/dashboard/talent");
      } else if (user.role !== "talent" && user.role !== "admin") {
        // Redirect if not worker
        if (user.role === "employer") router.push("/dashboard/employer");
        else if (user.role === "agent") router.push("/dashboard/agent");
      } else {
        fetchSkills();
        fetchUserSkills();
      }
    }
  }, [user, isLoading, router, fetchSkills, fetchUserSkills]);

  const handleAddSkill = async () => {
    if (selectedSkill) {
      await addSkill(selectedSkill);
      setSelectedSkill("");
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center">Loading dashboard...</div>;
  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Track your skills, applications, and profile status.
          </p>
        </div>
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium">Looking for work</span>
        </div>
      </div>

      <Tabs value={defaultTab} className="w-full">
        {/* TabsList removed to avoid duplication with Sidebar */}

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal information and bio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.email} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Full Stack Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell employers about yourself..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Tasks Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Add Skill Column */}
            <div className="md:col-span-1">
              <Card className="border-none shadow-md bg-white dark:bg-slate-900 h-full">
                <CardHeader>
                  <CardTitle>Add New Skill</CardTitle>
                  <CardDescription>
                    Select a skill to take an assessment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    onValueChange={setSelectedSkill}
                    value={selectedSkill}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a skill..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSkills
                        .filter(
                          (skill) =>
                            !userSkills.some(
                              (us) => us.skillId._id === skill._id
                            )
                        )
                        .map((skill) => (
                          <SelectItem key={skill._id} value={skill._id}>
                            {skill.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleAddSkill}
                    disabled={!selectedSkill}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Skill
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Skills List Column */}
            <div className="md:col-span-2">
              <div className="grid gap-4">
                {userSkills.length === 0 ? (
                  <Card className="border-dashed bg-slate-50 dark:bg-slate-900/50">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                      <CheckCircle2 className="h-10 w-10 mb-4 opacity-50" />
                      <p>No skills added yet.</p>
                      <p className="text-sm">
                        Add a skill to start verifying your expertise.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  userSkills.map((us) => (
                    <div
                      key={us._id}
                      className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                        <div
                          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${us.verified
                            ? "bg-green-100 text-green-600"
                            : "bg-slate-100 text-slate-500"
                            }`}
                        >
                          {us.verified ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <AlertCircle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold">{us.skillId.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={us.verified ? "default" : "secondary"}
                              className={us.verified ? "bg-green-600" : ""}
                            >
                              {us.verified ? "Verified" : "Pending"}
                            </Badge>
                            {us.verified && (
                              <span className="text-sm font-medium">
                                Score: {us.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {!us.verified && (
                        <Button
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={async () => {
                            const task = await getTaskBySkill(us.skillId._id);
                            if (task) {
                              router.push(`/tasks/${task._id}`);
                            } else {
                              alert(
                                "No assessment available for this skill yet."
                              );
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
        </TabsContent>

        {/* Jobs Applied Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>
                Track the status of your job applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="mb-4 md:mb-0">
                      <h3 className="font-bold text-lg">
                        {i === 1 ? "Frontend Developer" : "UX Designer"}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <Briefcase className="w-3 h-3 mr-1" /> TechCorp Inc.
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" /> Remote
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> Applied 2d ago
                        </span>
                      </div>
                    </div>
                    <Badge variant={i === 1 ? "default" : "secondary"}>
                      {i === 1 ? "Under Review" : "Viewed"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardContent className="p-0 sm:p-6">
              <VerificationTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function TalentDashboard() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <TalentDashboardContent />
    </Suspense>
  );
}
