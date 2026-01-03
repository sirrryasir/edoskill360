"use client";

import { use, useEffect } from "react";
import { usePublicDataStore } from "@/store/usePublicDataStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  MapPin,
  Mail,
  Link as LinkIcon,
  Calendar,
  Star,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { currentFreelancer, fetchFreelancerById, isLoading, error } =
    usePublicDataStore();

  useEffect(() => {
    fetchFreelancerById(id);
  }, [id, fetchFreelancerById]);

  if (isLoading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-20 flex flex-col gap-8">
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="flex gap-8">
          <Skeleton className="h-96 w-80 rounded-xl" />
          <div className="flex-grow space-y-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-60 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentFreelancer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">User not found</h2>
        <Link href="/freelancers">
          <Button variant="outline">Back to Freelancers</Button>
        </Link>
      </div>
    );
  }

  const isVerified = currentFreelancer.skills?.some((s) => s.verified) || true; // Mock true for now if no skills

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/20 pb-20">
      {/* Header / Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Sidebar/Card */}
          <div className="w-full md:w-80 shrink-0 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border p-6 text-center relative overflow-hidden">
              <div className="w-32 h-32 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center text-4xl font-bold text-slate-400 mb-4 shadow-sm relative capitalize">
                {currentFreelancer.name.substring(0, 2)}
                {isVerified && (
                  <div
                    className="absolute bottom-2 right-2 bg-white dark:bg-zinc-900 rounded-full p-1 shadow-sm"
                    title="Identity Verified"
                  >
                    <ShieldCheck className="h-6 w-6 text-blue-600 fill-blue-50" />
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-1">
                {currentFreelancer.name}
              </h1>
              <p className="text-muted-foreground mb-4">
                {currentFreelancer.headline || "Freelancer"}
              </p>

              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 text-amber-500 fill-current"
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({currentFreelancer.reviews?.length || 0})
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <Link href="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/20">
                    Hire Me
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Message
                  </Button>
                </Link>
              </div>

              <div className="border-t pt-6 text-left space-y-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3 text-slate-400" />
                  {currentFreelancer.location || "Remote"}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-3 text-slate-400" />
                  Available for offers
                </div>
                {/* <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-3 text-slate-400" />
                  Joined Recently
                </div> */}
              </div>
            </div>

            {/* Availability Widget */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Availability</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hourly Rate</span>
                  <span className="font-semibold">$45.00 / hr</span>
                  {/* TODO: Add rate to User model */}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-semibold">~2 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow space-y-6 w-full">
            {/* About */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {currentFreelancer.bio || "No bio available."}
              </p>
            </div>

            {/* Verified Skills */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  Verified Skills
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View detailed report
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currentFreelancer.skills &&
                currentFreelancer.skills.length > 0 ? (
                  currentFreelancer.skills.map((userSkill) => (
                    <div key={userSkill._id} className="space-y-2">
                      <div className="flex justify-between font-medium">
                        <span>{userSkill.skillId?.name}</span>
                        <span className="text-blue-600">
                          {userSkill.score}/100
                        </span>
                      </div>
                      <Progress value={userSkill.score} className="h-2" />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-2">
                    No verified skills yet.
                  </p>
                )}
              </div>
            </div>

            {/* Experience & Portfolio Tabs */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border overflow-hidden">
              <Tabs defaultValue="experience">
                <div className="border-b px-6 pt-4">
                  <TabsList className="bg-transparent w-full justify-start h-auto p-0 space-x-6">
                    <TabsTrigger
                      value="experience"
                      className="bg-transparent text-muted-foreground data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-3 px-1 transition-none"
                    >
                      Experience
                    </TabsTrigger>
                    {/* <TabsTrigger
                      value="portfolio"
                      className="bg-transparent text-muted-foreground data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-3 px-1 transition-none"
                    >
                      Portfolio
                    </TabsTrigger> */}
                    <TabsTrigger
                      value="reviews"
                      className="bg-transparent text-muted-foreground data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-3 px-1 transition-none"
                    >
                      Reviews ({currentFreelancer.reviews?.length || 0})
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 md:p-8">
                  <TabsContent value="experience" className="space-y-8 mt-0">
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-8 pl-8 pb-2">
                      {/* Mock experience for now as it's not in DB schema yet */}
                      <p className="text-muted-foreground italic">
                        Experience section under development.
                      </p>

                      {/* {[
                        {
                          title: "Senior Developer",
                          company: "TechFlow Solutions",
                          period: "2022 - Present",
                          desc: "Leading the frontend team and re-architecting the core product.",
                        },
                      ].map((job, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-900 bg-blue-600"></div>
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {job.company} • {job.period}
                          </p>
                          <p className="text-slate-600 dark:text-slate-300">
                            {job.desc}
                          </p>
                        </div>
                      ))} */}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0 space-y-6">
                    {currentFreelancer.reviews &&
                    currentFreelancer.reviews.length > 0 ? (
                      currentFreelancer.reviews.map((review) => (
                        <div
                          key={review._id}
                          className="border-b last:border-0 pb-6 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold capitalize">
                                {(review.employerId as any)?.name?.charAt(0) ||
                                  "C"}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">
                                  {(review.employerId as any)?.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {/* Mock Date */}
                                  Recently
                                </p>
                              </div>
                            </div>
                            <div className="flex text-amber-500">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm">
                            "{review.comment}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No reviews yet.</p>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
