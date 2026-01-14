"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { CheckCircle2, Lock, ArrowRight, XCircle, Clock } from "lucide-react";

const STAGES = [
    { id: "STAGE_1", label: "Profile & CV", description: "Complete your profile information." },
    { id: "STAGE_2", label: "Identity Verification", description: "Upload government ID." },
    { id: "STAGE_3", label: "Skill Verification", description: "Prove your core skills." },
    { id: "STAGE_4", label: "Interview", description: "AI-assisted technical interview." },
    { id: "STAGE_5", label: "References", description: "Verify past work experience." },
];

export default function VerificationJourney() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user, isLoading: authLoading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
                return;
            }

            if (user.role === "talent") {
                router.push("/dashboard/talent?tab=verification");
            } else {
                router.push("/"); // Or their respective dashboard
            }
        }
    }, [user, authLoading, router]);

    const getCurrentStageIndex = () => {
        if (!user?.verificationStage) return 0;
        const stageMap: Record<string, number> = {
            "STAGE_0_UNVERIFIED": 0,
            "STAGE_1_PROFILE_COMPLETED": 1,
            "STAGE_2_SKILLS_SUBMITTED": 2,
            "STAGE_3_INTERVIEW_COMPLETED": 3,
            "STAGE_4_REFERENCES_PENDING": 4,
            "STAGE_5_VERIFIED": 5
        };
        // fallback for old enums if any exist in DB
        const oldStageMap: Record<string, number> = {
            "UNVERIFIED": 0,
            "PROFILE_COMPLETED": 1,
            "IDENTITY_SUBMITTED": 2, // Approximating to Identity
            "IDENTITY_APPROVED": 2,
            "SKILLS_TESTING": 3,
            "SKILLS_EVALUATED": 3,
            "AI_VALIDATION_PASSED": 3,
            "REFERENCES_PENDING": 4,
            "REFERENCES_VERIFIED": 5,
            "VERIFIED": 5
        };

        return stageMap[user.verificationStage] || oldStageMap[user.verificationStage] || 0;
    };

    if (loading || authLoading) return <div className="p-8 flex justify-center">Loading journey...</div>;

    const currentStageIdx = getCurrentStageIndex();

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4 font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Verification Journey
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Complete these mandatory steps to unlock the full potential of EduSkill360.
                    Trust is earned through proof.
                </p>
            </div>

            {/* Stepper Logic */}
            <div className="space-y-4">
                {STAGES.map((stage, index) => {
                    const isCompleted = currentStageIdx > index;
                    const isCurrent = currentStageIdx === index;
                    const isLocked = currentStageIdx < index;

                    return (
                        <div
                            key={stage.id}
                            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${isCurrent
                                ? "border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-slate-900 shadow-lg scale-[1.02]"
                                : isCompleted
                                    ? "border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10"
                                    : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 opacity-75"
                                }`}
                        >
                            <div className="p-6 flex items-center gap-6">
                                {/* Icon Indicator */}
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${isCompleted
                                    ? "bg-green-500 border-green-500 text-white"
                                    : isCurrent
                                        ? "bg-blue-600 border-blue-600 text-white animate-pulse"
                                        : "bg-transparent border-slate-300 text-slate-400"
                                    }`}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : isLocked ? <Lock className="w-5 h-5" /> : index + 1}
                                </div>

                                <div className="flex-grow">
                                    <h3 className={`text-lg font-bold ${isCompleted ? "text-green-700 dark:text-green-400" : "text-slate-900 dark:text-slate-100"}`}>
                                        {stage.label}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {stage.description}
                                    </p>

                                    {/* Status Badge */}
                                    {isCurrent && (
                                        <div className="mt-2 inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            <Clock className="w-3 h-3 mr-1" />
                                            IN PROGRESS
                                        </div>
                                    )}
                                </div>

                                {/* Action Area */}
                                <div className="flex-shrink-0">
                                    {isCurrent && (
                                        <Link
                                            href={
                                                index === 0 ? "/profile/edit" : // Profile
                                                    index === 1 ? "/dashboard/talent/verification/identity" : // Identity
                                                        index === 2 ? "/dashboard/talent/verification/skills" : // Skills
                                                            index === 3 ? "/dashboard/talent/verification/interview" : // Interview
                                                                index === 4 ? "/dashboard/talent/verification/references" : "#" // References
                                            }
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                                        >
                                            Start <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                    {isLocked && (
                                        <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                            <Lock className="w-3 h-3" /> Locked
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <div className="text-green-600 font-bold text-sm">Completed</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Rejection Handling Specifics */}
            {user?.verificationStage?.includes("REJECTED") && (
                <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl flex items-start gap-4">
                    <XCircle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                        <h3 className="font-bold text-red-700 dark:text-red-400">Verification Rejected</h3>
                        <p className="text-sm text-red-600/80 mt-1">
                            Your verification was rejected at the {user.verificationStage.replace("_REJECTED", "")} stage.
                            Please review the feedback and resubmit.
                        </p>
                        <button onClick={() => window.location.reload()} className="mt-3 text-sm font-semibold text-red-700 underline">
                            Check Status / Retry
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
