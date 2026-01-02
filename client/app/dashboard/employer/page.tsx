"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useJobStore } from "@/store/useJobStore";
import PostJobForm from "@/components/PostJobForm";
import WorkerSearch from "@/components/WorkerSearch";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Briefcase } from "lucide-react";

export default function EmployerDashboard() {
  const { user } = useAuthStore();
  const { myJobs, fetchMyJobs } = useJobStore();

  useEffect(() => {
    fetchMyJobs();
  }, [fetchMyJobs]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
          Employer Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Post jobs and find the perfect talent.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Management Tools */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <PostJobForm />
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-lg font-bold mb-4">Talent Search</h2>
            <WorkerSearch />
          </div>
        </div>

        {/* Right Column: Job Listings */}
        <div className="lg:col-span-2">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Active Job Postings</h2>
              <Badge variant="outline">{myJobs.length} Active</Badge>
            </div>

            <div className="space-y-4">
              {myJobs.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="text-slate-500">No active job postings.</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Use the "Post a Job" form to get started.
                  </p>
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
                            <DollarSign className="w-3 h-3" /> {job.salaryRange}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> {job.type}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100"
                      >
                        Active
                      </Badge>
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
          </div>
        </div>
      </div>
    </div>
  );
}
