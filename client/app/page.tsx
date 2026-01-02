import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Search,
  Trophy,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground border border-blue-100 dark:border-blue-900 rounded-full shadow-sm"
            >
              🚀 Empowering the Next Generation of Workers
            </Badge>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
              Verify your Skills. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x">
                Accelerate your Career.
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 font-medium">
              The trusted platform connecting skilled workers with top
              employers. Take assessments, earn verified badges, and get hired.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-8 w-full justify-center">
              <Link href="/register?role=worker" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  className="w-full h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all rounded-full"
                >
                  I'm a Worker
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register?role=employer" className="w-full sm:w-auto">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full h-14 px-8 text-lg font-bold border-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                >
                  I'm an Employer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-32 bg-zinc-50/50 dark:bg-zinc-950/50"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Why EduSkill360?
            </h2>
            <p className="text-lg text-zinc-500 md:text-xl">
              We bridge the gap between talent and opportunity through trust,
              transparency, and technology.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border shadow-lg shadow-zinc-200/50 dark:shadow-none bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50 transition-transform hover:-translate-y-2 duration-300">
              <CardHeader>
                <div className="p-4 w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 mb-6 flex items-center justify-center">
                  <Trophy className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl">Skill Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 leading-relaxed">
                  Take practical assessments designed by industry experts. Pass
                  the test and get a verified badge on your profile that
                  employers trust.
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-lg shadow-zinc-200/50 dark:shadow-none bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50 transition-transform hover:-translate-y-2 duration-300 delay-100">
              <CardHeader>
                <div className="p-4 w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 mb-6 flex items-center justify-center">
                  <Briefcase className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl">Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 leading-relaxed">
                  Employers post jobs with specific skill requirements. Our
                  system automatically matches you based on your verified score,
                  getting you hired faster.
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-lg shadow-zinc-200/50 dark:shadow-none bg-white/50 backdrop-blur-sm dark:bg-zinc-900/50 transition-transform hover:-translate-y-2 duration-300 delay-200">
              <CardHeader>
                <div className="p-4 w-14 h-14 rounded-2xl bg-purple-600/10 text-purple-600 mb-6 flex items-center justify-center">
                  <Search className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl">Talent Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-500 leading-relaxed">
                  Employers can search our extensive database of verified
                  workers, filtering by skill level, exact location, and
                  availability to find the perfect fit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-black relative overflow-hidden">
         <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-purple-500/10 blur-[100px] rounded-full"></div>
         <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">Simple Process</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">How it works</h2>
                <p className="text-lg text-zinc-500">Get started in minutes. Whether you are hiring or looking for work, we made it easy.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Worker Flow */}
                <div className="space-y-8 relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded-full hidden md:block"></div>
                    <div className="space-y-4 relative">
                        <div className="absolute -left-[22px] top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow hidden md:block"></div>
                        <h3 className="text-xl font-bold">For Workers</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-600">1</span>
                                <div>
                                    <p className="font-medium">Create your profile</p>
                                    <p className="text-sm text-zinc-500">Sign up and list your skills and experience.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-600">2</span>
                                <div>
                                    <p className="font-medium">Take Assessments</p>
                                    <p className="text-sm text-zinc-500">Complete skill tests to earn verified badges.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-600">3</span>
                                <div>
                                    <p className="font-medium">Get Hired</p>
                                    <p className="text-sm text-zinc-500">Get matched with top employers looking for your verified skills.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Employer Flow */}
                <div className="space-y-8 relative">
                     <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 to-transparent rounded-full hidden md:block"></div>
                    <div className="space-y-4 relative">
                        <div className="absolute -left-[22px] top-1 h-4 w-4 rounded-full border-4 border-white bg-purple-600 shadow hidden md:block"></div>
                        <h3 className="text-xl font-bold">For Employers</h3>
                         <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-sm font-bold text-purple-600">1</span>
                                <div>
                                    <p className="font-medium">Post a Job</p>
                                    <p className="text-sm text-zinc-500">Describe your needs and required skills.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-sm font-bold text-purple-600">2</span>
                                <div>
                                    <p className="font-medium">Review Matches</p>
                                    <p className="text-sm text-zinc-500">See auto-matched candidates with verified scores.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-sm font-bold text-purple-600">3</span>
                                <div>
                                    <p className="font-medium">Hire with Confidence</p>
                                    <p className="text-sm text-zinc-500">Know for sure that your candidate can do the job.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50 border-t">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-8">
            Trusted by growing companies and skilled freelancers
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale items-center">
            {/* Placeholders for logos */}
            <div className="text-xl font-bold">TechStart</div>
            <div className="text-xl font-bold">DevForce</div>
            <div className="text-xl font-bold">DesignHub</div>
            <div className="text-xl font-bold">WorkFlow</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to start your journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are advancing their careers or finding
            the perfect talent on EduSkill360.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 text-blue-700 font-bold"
              >
                Get Started for Free
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 bg-transparent border-white text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-slate-400">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white">EduSkill360</div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Support
            </a>
          </div>
          <div className="text-xs">
            &copy; {new Date().getFullYear()} EduSkill360. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
