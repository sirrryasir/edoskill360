"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function SkillVerificationPage() {
    const [skill, setSkill] = useState("");
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState<any[]>([]);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [result, setResult] = useState<string | null>(null);
    const router = useRouter();

    const generateQuiz = async () => {
        if (!skill) return;
        setLoading(true);
        try {
            const res = await fetch("/api/verification/ai/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skill, difficulty: "intermediate" }),
            });
            const data = await res.json();
            if (data.questions) {
                setQuiz(data.questions);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate quiz");
        } finally {
            setLoading(false);
        }
    };

    const submitQuiz = () => {
        let score = 0;
        quiz.forEach((q, idx) => {
            if (answers[idx] === q.correctOption) score++;
        });

        const percentage = (score / quiz.length) * 100;
        if (percentage >= 60) {
            setResult("PASS");
            localStorage.setItem("skill_passed", "true"); // MVP State persistence
        } else {
            setResult("FAIL");
        }
    };

    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2 font-heading">Skill Verification</h1>
            <p className="text-muted-foreground mb-8">Prove your expertise by passing an AI-generated quiz.</p>

            {!quiz.length ? (
                <div className="space-y-4">
                    <label className="block font-medium mb-2">Enter your primary skill</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            placeholder="e.g. React Native, Node.js, Graphic Design"
                            className="flex-1 border p-3 rounded-lg bg-background"
                        />
                        <button
                            onClick={generateQuiz}
                            disabled={loading || !skill}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition"
                        >
                            {loading && <Loader2 className="animate-spin w-4 h-4" />}
                            Generate Quiz
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {result ? (
                        <div className={`p-6 rounded-lg text-center ${result === "PASS" ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"}`}>
                            {result === "PASS" ? (
                                <>
                                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-600" />
                                    <h3 className="text-2xl font-bold">You Passed!</h3>
                                    <p className="mb-4">You demonstrated knowledge in {skill}.</p>
                                    <button
                                        onClick={() => router.push("/dashboard/talent/verification/interview")}
                                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
                                    >
                                        Proceed to Interview
                                    </button>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-12 h-12 mx-auto mb-2 text-red-600" />
                                    <h3 className="text-2xl font-bold">Quiz Failed</h3>
                                    <p className="mb-4">You need at least 60% to pass. Try again.</p>
                                    <button
                                        onClick={() => { setQuiz([]); setResult(null); }}
                                        className="text-red-700 underline font-semibold cursor-pointer"
                                    >
                                        Retry
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {quiz.map((q, idx) => (
                                    <div key={idx} className="p-4 bg-muted/30 border rounded-lg">
                                        <p className="font-bold mb-3">{idx + 1}. {q.question}</p>
                                        <div className="space-y-2">
                                            {q.options.map((opt: string, optIdx: number) => (
                                                <label key={optIdx} className="flex items-center gap-3 p-3 bg-card border rounded cursor-pointer hover:bg-accent transition">
                                                    <input
                                                        type="radio"
                                                        name={`q-${idx}`}
                                                        checked={answers[idx] === optIdx}
                                                        onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={submitQuiz}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                            >
                                Submit Answers
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
