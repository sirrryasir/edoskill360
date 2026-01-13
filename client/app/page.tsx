"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"; // Kept for layout structure if needed, or replaced by custom components
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layout,
  LineChart,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Briefcase,
  ChevronRight,
  Star,
  MapPin,
  Clock,
} from "lucide-react";
import TalentCard from "@/components/TalentCard"; // Use the component which handles rendering well
import JobCard from "@/components/JobCard"; // Use the component which handles rendering well
import { usePublicDataStore } from "@/store/usePublicDataStore";

export default function Home() {
  const { jobs, talents, fetchJobs, fetchTalents, isLoading } =
    usePublicDataStore();

  useEffect(() => {
    fetchJobs();
    fetchTalents();
  }, [fetchJobs, fetchTalents]);

  // Derived state for display - distinct from the full list pages
  const featuredJobs = jobs.slice(0, 3);
  const featuredTalents = talents.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center max-w-5xl mx-auto">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground border border-blue-100 dark:border-blue-900 rounded-full shadow-sm"
            >
              🚀 The #1 Platform for Verified Talent
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
              Prove Skills. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x">
                Hire with Confidence.
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 font-medium">
              A marketplace where skills are verified, not just claimed. Connect
              with top talent or find your next dream job today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-8 w-full justify-center">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all rounded-full"
                >
                  Browse Jobs
                  <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/talents" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full h-14 px-8 text-lg font-bold border-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                >
                  Browse Talents
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section (Real Data) */}
      <section className="py-20 bg-zinc-50/50 dark:bg-zinc-950/50 border-y">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Featured Opportunities
              </h2>
              <p className="text-lg text-zinc-500">
                Top companies looking for verified talent right now.
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden md:inline-flex text-blue-600 font-semibold hover:underline items-center"
            >
              View all jobs <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center py-10 text-muted-foreground">
                Loading opportunities...
              </div>
            ) : featuredJobs.length > 0 ? (
              featuredJobs.map((job) => (
                // Reusing JobCard or custom Card setup for homepage.
                // Let's use custom Card here to match the design requested, or reuse JobCard if it fits.
                // The previous design used a custom Card setup. I'll stick to a slightly modified JobCard or just reimplement the Card here for consistency with the design provided in the prompt.
                // Actually, let's use the JobCard component for consistency across the app,
                // BUT the user really liked the specific design in the homepage.
                // Let's adapt the JobCard usage or recreate the nice card.
                // Recreating valid dynamic cards using the design from before:
                <Card
                  key={job._id}
                  className="hover:shadow-lg transition-all duration-300 border-none bg-white dark:bg-zinc-900 shadow-sm flex flex-col"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 capitalize"
                      >
                        {job.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">
                        {job.salaryRange}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                      {job.title}
                    </CardTitle>
                    <p className="text-sm font-medium text-zinc-500">
                      {(job.employerId as any)?.companyName ||
                        (job.employerId as any)?.name ||
                        "Unknown Company"}
                    </p>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements?.slice(0, 3).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t bg-zinc-50/50 dark:bg-zinc-800/50 p-4 flex justify-between items-center mt-auto">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" /> {job.location}
                      {/* <Clock className="h-3 w-3 ml-3 mr-1" /> Recently */}
                    </div>
                    <Link href={`/jobs/${job._id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 text-muted-foreground">
                No jobs posted yet.
              </div>
            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/jobs">
              <Button variant="outline" className="w-full">
                View all jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Verified Talents (Real Data) */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Top Verified Talents
              </h2>
              <p className="text-lg text-zinc-500">
                Hire professionals who have proven their skills through our
                rigorous assessments.
              </p>
            </div>
            <Link
              href="/talents"
              className="hidden md:inline-flex text-blue-600 font-semibold hover:underline items-center"
            >
              View all Talents <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-4 text-center py-10 text-muted-foreground">
                Loading talent...
              </div>
            ) : featuredTalents.length > 0 ? (
              featuredTalents.map((freelancer) => (
                <TalentCard
                  key={freelancer._id}
                  id={freelancer._id}
                  name={freelancer.name}
                  title={freelancer.headline || "Talent"}
                  location={freelancer.location || "Remote"}
                  rate="$45.00" // Placeholder until rate is in model
                  verified={true} // Placeholder
                  score={98} // Placeholder
                  skills={["React", "Node.js", "TypeScript"]} // Placeholder
                  reviews={15} // Placeholder
                  rating={5.0} // Placeholder
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-10 text-muted-foreground">
                No Talents found.
              </div>
            )}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/talents">
              <Button variant="outline" className="w-full">
                View all Talents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Refined */}
      <section
        id="how-it-works"
        className="py-24 bg-zinc-50/50 dark:bg-zinc-950/50 relative overflow-hidden ml-0 mr-0"
      >
        <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-purple-500/10 blur-[100px] rounded-full"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="mb-4 border-blue-200 text-blue-700 bg-blue-50"
            >
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              How it works
            </h2>
            <p className="text-lg text-zinc-500">
              Get started in minutes. Whether you are hiring or looking for
              work, we made it easy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                  <Briefcase className="h-6 w-6" />
                </div>
                For Workers
              </h3>
              <ul className="space-y-6">
                {[
                  {
                    title: "Create Profile",
                    desc: "Sign up and list your skills and experience.",
                  },
                  {
                    title: "Take Assessments",
                    desc: "Complete skill tests to earn verified badges.",
                  },
                  {
                    title: "Get Hired",
                    desc: "Get matched with top employers looking for verified skills.",
                  },
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                  <Trophy className="h-6 w-6" />
                </div>
                For Employers
              </h3>
              <ul className="space-y-6">
                {[
                  {
                    title: "Post a Job",
                    desc: "Describe your needs and required skills.",
                  },
                  {
                    title: "Review Matches",
                    desc: "See candidates with verified scores automatically matched.",
                  },
                  {
                    title: "Hire with Confidence",
                    desc: "Know for sure that your candidate can do the job.",
                  },
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 pattern-grid-lg opacity-20"></div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals and companies building the future of
            work with verified skills.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white font-bold w-full sm:w-auto"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
