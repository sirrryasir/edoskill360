"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import confetti from 'canvas-confetti';

export default function VerificationComplete() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const finalize = async () => {
            try {
                const res = await fetch("/api/verification/finalize", {
                    method: "POST",
                });

                if (res.ok) {
                    setSuccess(true);
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                } else {
                    setError("Failed to finalize verification. Ensure all steps are completed.");
                }
            } catch (err) {
                setError("An error occurred.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        finalize();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-600">Finalizing your verification status...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-md flex items-center justify-center min-h-screen">
            <Card className={`w-full text-center p-6 ${success ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-200"}`}>
                <div className="flex justify-center mb-6">
                    {success ? (
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle2 className="w-16 h-16 text-green-600" />
                        </div>
                    ) : (
                        <AlertTriangle className="w-16 h-16 text-red-500" />
                    )}
                </div>

                <CardHeader>
                    <CardTitle className="text-2xl mb-2">
                        {success ? "You are Verified!" : "Verification Failed"}
                    </CardTitle>
                    <CardDescription className="text-base">
                        {success
                            ? "Congratulations! Your profile is now fully verified. You can now apply for jobs with the 'Verified' badge."
                            : error
                        }
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button
                        onClick={() => router.push("/dashboard/talent")}
                        className="w-full mt-4"
                        size="lg"
                        variant={success ? "default" : "secondary"}
                    >
                        Go to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
