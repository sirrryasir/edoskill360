"use client";

import { useState, useEffect } from "react";
import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { usePublicDataStore } from "@/store/usePublicDataStore";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { jobs, fetchJobs, isLoading } = usePublicDataStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Job Type</h3>
        <div className="space-y-3">
          {[
            "Full-time",
            "Part-time",
            "Contract",
            "Freelance",
            "Internship",
          ].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <Label
                htmlFor={`type-${type}`}
                className="font-normal cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Salary Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$200k+</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "Node.js", "Python", "Design", "Marketing", "Sales"].map(
            (skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {skill}
              </Badge>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Verification</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="verified-only" />
          <Label htmlFor="verified-only" className="font-normal cursor-pointer">
            Verified Employers Only
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Jobs</h1>
            <p className="text-muted-foreground mt-1">
              Found {jobs.length} opportunities matching your skills
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, skills, companies..."
                className="pl-9 bg-white dark:bg-slate-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden shrink-0 bg-white dark:bg-slate-950"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your job search</SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-950 p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground hover:text-destructive"
                >
                  Reset
                </Button>
              </div>
              <FilterSidebar />
            </div>
          </div>

          {/* Job List */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            {isLoading ? (
              <div className="text-center py-20 text-muted-foreground">
                Loading jobs...
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id}
                  title={job.title}
                  company={
                    (job.employerId as any)?.companyName ||
                    (job.employerId as any)?.name
                  } // Handle population
                  location={job.location}
                  type={job.type}
                  salary={job.salaryRange || "Competitive"}
                  postedAt="Recently" // TODO: Add time helper
                  description={job.description}
                  skills={job.requirements}
                  isVerifiedHost={true} // Mock for now until we have company verification
                />
              ))
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No jobs found.</p>
              </div>
            )}

            {/* Pagination / Load More */}
            {!isLoading && jobs.length > 0 && (
              <div className="pt-8 flex justify-center">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
