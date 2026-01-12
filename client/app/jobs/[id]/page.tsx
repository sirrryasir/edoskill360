"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { usePublicDataStore } from "@/store/usePublicDataStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Building,
  Globe,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Link from "next/link";

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const { currentJob, fetchJobById, isLoading, error } = usePublicDataStore();
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    fetchJobById(id);
  }, [id, fetchJobById]);

  const handleApply = () => {
    if (!user) {
      router.push("/login?redirect=/jobs/" + id);
      return;
    }
    // Mock application logic - would need POST /api/jobs/:id/apply
    setIsApplied(true);
    setIsApplied(true);
    alert("Application submitted successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Job link copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading job details...
      </div>
    );
  }

  if (error || !currentJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Job not found</h2>
        <Link href="/jobs">
          <Button variant="outline">Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  // Helper to safely access nested employer fields
  const companyName =
    currentJob.employerId?.companyName ||
    currentJob.employerId?.name ||
    "Unknown Company";
  const aboutCompany =
    currentJob.employerId?.bio || "No company description available.";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/20 pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border-b">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/jobs"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-400 capitalize">
                {companyName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {currentJob.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center font-medium text-foreground">
                    <Building className="w-4 h-4 mr-1.5 text-slate-400" />
                    {companyName}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                    {currentJob.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                    Posted Recently
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                className={`w-full md:w-auto ${isApplied
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
                onClick={handleApply}
                disabled={isApplied}
              >
                {isApplied ? "Applied Successfully" : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 md:p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold mb-4">Job Description</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {currentJob.description}
                  </p>
                </section>

                {/* Responsibilities - Assuming it might be part of desc or separate text in future, for nwo just mocking or using desc if simple string */}
                {/* <section>
                  <h2 className="text-xl font-bold mb-4">
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                      >
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section> */}

                <section>
                  <h2 className="text-xl font-bold mb-4">
                    Requirements & Skills
                  </h2>
                  <ul className="space-y-2">
                    {currentJob.requirements?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Salary
                        </div>
                        <div className="font-medium">
                          {currentJob.salaryRange || "Competitive"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Job Type
                        </div>
                        <div className="font-medium capitalize">
                          {currentJob.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Location
                        </div>
                        <div className="font-medium">{currentJob.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentJob.requirements?.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">About the Company</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 capitalize">
                    {companyName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{companyName}</div>
                    <div className="flex items-center text-xs text-blue-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                      Employer
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {aboutCompany}
                </p>
                {/* Website link mock - add field to DB if needed */}
                <Button variant="outline" className="w-full h-8 text-sm">
                  <Globe className="w-3 h-3 mr-2" /> Visit Website
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
