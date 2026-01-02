"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function LoginForm() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError("");

    try {
      // In development, we use the Next.js rewrite to proxy to backend
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data);

      // Redirect based on role
      if (data.role === "admin") {
        router.push("/dashboard/admin");
      } else if (data.role === "employer") {
        router.push("/dashboard/employer");
      } else {
        router.push("/dashboard/worker");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Enter your credentials to access your account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 dark:text-slate-300">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="name@example.com" 
                    {...field} 
                    className="h-12 bg-white/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel className="text-slate-700 dark:text-slate-300">Password</FormLabel>
                    <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="******" 
                    {...field} 
                    className="h-12 bg-white/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-900/50">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                </>
            ) : "Sign In"}
          </Button>
        </form>
      </Form>
      
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
       {/* Branding Sidebar */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-blue-600 p-12 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
             <Link href="/" className="flex items-center space-x-2">
                <span className="text-3xl font-bold tracking-tight">EduSkill360</span>
            </Link>
        </div>

        <div className="relative z-10 max-w-lg">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
                Unlock your potential with verified skills.
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Join thousands of professionals who are advancing their careers and finding better opportunities through our trusted verification platform.
            </p>
            
            <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-400"></div>
                    ))}
                </div>
                <div className="text-sm font-medium">
                    <span className="block text-white">Join 10,000+ users</span>
                    <span className="text-blue-200">Building their future today</span>
                </div>
            </div>
        </div>

        <div className="relative z-10 text-sm text-blue-200">
            &copy; {new Date().getFullYear()} EduSkill360. All rights reserved.
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600"/></div>}>
             <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
