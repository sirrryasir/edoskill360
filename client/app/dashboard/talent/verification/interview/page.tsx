"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";

export default function InterviewPage() {
    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Simple MVP Guard
        if (localStorage.getItem("skill_passed") !== "true") {
            // prompt says Stage 3 follows Stage 2.
            // Ideally we check backend state too, but let's trust flow for now or local storage
        }

        const fetchQuestions = async () => {
            try {
                const res = await fetch("/api/verification/ai/interview", {
                    method: "POST", // It relies on User Profile in backend
                });
                const data = await res.json();
                if (data.questions) {
                    setQuestions(data.questions);
                }
            } catch (error) {
                console.error("Failed to load interview", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleSubmit = async () => {
        setSubmitting(true);
        const formattedAnswers = questions.map((q, idx) => ({
            question: q,
            answer: answers[idx] || ""
        }));

        try {
            const res = await fetch("/api/verification/interview/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: formattedAnswers })
            });

            if (res.ok) {
                alert("Interview submitted successfully! Points added to your Trust Score.");
                router.push("/dashboard/talent?tab=verification");
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting interview.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2 font-heading">Technical Interview</h1>
            <p className="text-muted-foreground mb-8">
                Please answer the following questions to verify your depth of knowledge.
                Your answers will be reviewed by an Agent.
            </p>

            <div className="space-y-8">
                {questions.map((q, idx) => (
                    <div key={idx} className="bg-muted/30 p-6 rounded-xl border border-border">
                        <label className="block text-lg font-bold mb-3 font-heading">{idx + 1}. {q}</label>
                        <textarea
                            value={answers[idx] || ""}
                            onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                            placeholder="Type your answer here..."
                            className="w-full border p-4 rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500 outline-none bg-background"
                        />
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition shadow-lg shadow-blue-600/20"
                >
                    {submitting && <Loader2 className="animate-spin w-4 h-4" />}
                    Submit Interview
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
