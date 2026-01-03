"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useJobStore } from "@/store/useJobStore";
import PostJobForm from "@/components/PostJobForm";
import WorkerSearch from "@/components/WorkerSearch";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  DollarSign,
  Briefcase,
  PlusCircle,
  Users,
  FileText,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Suspense } from "react";

function EmployerDashboardContent() {
  const { myJobs, fetchMyJobs } = useJobStore();

  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "my-jobs";

  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/dashboard/employer");
    } else {
      fetchMyJobs();
    }
  }, [user, router, fetchMyJobs]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
          Employer Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Post jobs, manage listings, and find the perfect talent.
        </p>
      </div>

      <Tabs defaultValue={defaultTab} key={defaultTab} className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 flex-wrap">
          <TabsTrigger
            value="post-job"
            className="flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Post a Job
          </TabsTrigger>
          <TabsTrigger
            value="my-jobs"
            className="flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" /> My Jobs
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm"
          >
            <Users className="w-4 h-4 mr-2" /> Applicants
          </TabsTrigger>
          <TabsTrigger
            value="search"
            className="flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm"
          >
            <Search className="w-4 h-4 mr-2" /> Talent Search
          </TabsTrigger>
        </TabsList>

        {/* Post Job Tab */}
        <TabsContent value="post-job">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Post a New Opportunity</CardTitle>
              <CardDescription>
                Fill in the details to reach verified professionals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PostJobForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Jobs Tab */}
        <TabsContent value="my-jobs">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Listings</CardTitle>
                <CardDescription>
                  Manage your current job postings.
                </CardDescription>
              </div>
              <Badge variant="outline">{myJobs.length} Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myJobs.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                    <p className="text-slate-500">No active job postings.</p>
                    <Button variant="link" className="mt-2 text-blue-600">
                      Switch to &apos;Post a Job&apos; tab
                    </Button>
                  </div>
                ) : (
                  myJobs.map((job) => (
                    <div
                      key={job._id}
                      className="p-5 border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />{" "}
                              {job.salaryRange}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3" /> {job.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            Close
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                        {job.requirements.map((req) => (
                          <span
                            key={req}
                            className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applicants Tab */}
        <TabsContent value="applicants">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>
                Review candidates who applied to your jobs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                <Users className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">No new applicants yet.</p>
                <p className="text-sm text-slate-400">
                  Notifications will appear here when workers apply.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Talent Search Tab */}
        <TabsContent value="search">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle>Search Database</CardTitle>
              <CardDescription>
                Proactively find verified talent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WorkerSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function EmployerDashboard() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <EmployerDashboardContent />
    </Suspense>
  );
}
