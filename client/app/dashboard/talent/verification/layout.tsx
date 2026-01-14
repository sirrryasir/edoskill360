"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Lock, ArrowRight, Circle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const STAGES = [
    {
        id: "profile",
        label: "Profile & CV",
        path: "/dashboard/talent?tab=profile",
        match: "profile"
    },
    {
        id: "identity",
        label: "Identity Verification",
        path: "/dashboard/talent/verification/identity",
        match: "identity"
    },
    {
        id: "skills",
        label: "Skill Verification",
        path: "/dashboard/talent/verification/skills",
        match: "skills"
    },
    {
        id: "interview",
        label: "Interview",
        path: "/dashboard/talent/verification/interview",
        match: "interview"
    },
    {
        id: "references",
        label: "References",
        path: "/dashboard/talent/verification/references",
        match: "references"
    },
];

export default function VerificationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user } = useAuthStore();

    const getCurrentStageIndex = () => {
        if (!user?.verificationStage) return 0;
        // Map backend Enums to index
        if (user.verificationStage === "VERIFIED") return 5;
        if (user.verificationStage.includes("REFERENCES")) return 4;
        if (user.verificationStage.includes("INTERVIEW")) return 3;
        if (user.verificationStage.includes("SKILLS")) return 2;
        if (user.verificationStage.includes("IDENTITY") || user.verificationStage.includes("PROFILE")) return 1;
        return 0;
    };

    const currentStageIdx = getCurrentStageIndex();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Vertical Stepper Sidebar (Desktop) */}
                <aside className="w-full lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
                    <div className="sticky top-24">
                        <h2 className="text-xl font-bold font-heading mb-6 px-2">Verification</h2>
                        <nav className="space-y-2 relative">
                            {/* Connecting Line */}
                            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

                            {STAGES.map((stage, index) => {
                                const isActive = pathname.includes(stage.match);
                                const isCompleted = currentStageIdx > index;
                                const isLocked = currentStageIdx < index;

                                return (
                                    <div key={stage.id} className="relative z-10 bg-slate-50 dark:bg-slate-950"> {/* Background wrapper to hide line if needed, or transparent */}
                                        <Link
                                            href={isLocked ? "#" : stage.path}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-lg transition-all border",
                                                isActive
                                                    ? "bg-white dark:bg-card border-blue-500 shadow-md translate-x-1"
                                                    : "border-transparent hover:bg-slate-100 dark:hover:bg-slate-900",
                                                isLocked && "opacity-50 cursor-not-allowed pointer-events-none"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-colors",
                                                isActive
                                                    ? "border-blue-500 bg-blue-600 text-white"
                                                    : isCompleted
                                                        ? "border-green-500 bg-green-500 text-white"
                                                        : "border-slate-300 bg-slate-100 dark:bg-slate-900 text-slate-500"
                                            )}>
                                                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-3 h-3" /> : index + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <span className={cn(
                                                    "text-sm font-medium block",
                                                    isActive ? "text-blue-700 dark:text-blue-400 font-bold" : "text-slate-600 dark:text-slate-400"
                                                )}>
                                                    {stage.label}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Trust Score Mini Widget */}
                        <div className="mt-8 p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white shadow-lg">
                            <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Current Trust Score</div>
                            <div className="text-3xl font-bold text-blue-400">
                                {/* Mock score if user doesn't have one yet, or calculate */}
                                {(user as any)?.trustScore || 20}
                                <span className="text-sm text-slate-500 font-normal ml-1">/ 100</span>
                            </div>
                            <div className="w-full bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-500 h-full rounded-full"
                                    style={{ width: `${(user as any)?.trustScore || 20}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-grow min-w-0">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 md:p-8 min-h-[500px]"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
