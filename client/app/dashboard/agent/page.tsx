"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function agentDashboard() {
    const [data, setData] = useState<any>({ verifications: [], tasks: [] });
    const [loading, setLoading] = useState(true);
    const { user, isLoading: authLoading } = useAuthStore(); // Renamed isLoading to authLoading to avoid conflict
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && (!user || ((user.role as string) !== "agent" && user.role !== "admin"))) {
            router.push("/login?redirect=/dashboard/agent");
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch relative path, cookies included automatically
                const res = await fetch("/api/agent/pending");

                if (res.status === 401 || res.status === 403) {
                    alert("Access Denied");
                    return router.push("/dashboard");
                }

                if (res.ok) {
                    const jsonData = await res.json();
                    setData(jsonData);
                }
            } catch (error) {
                console.error("Error fetching actions:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, authLoading, router]);


    const handleReviewVerification = async (id: string, outcome: "approved" | "rejected") => {
        const notes = prompt("Enter verification notes (optional):");
        try {
            await fetch("/api/agent/review-verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // No Authorization header needed (cookies)
                },
                body: JSON.stringify({ id, outcome, notes })
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Action failed");
        }
    };

    const handleReviewTask = async (id: string, outcome: "approved" | "rejected") => {
        const notes = prompt("Enter review notes (optional):");
        const score = outcome === "approved" ? prompt("Enter score (0-100):", "100") : 0;

        try {
            await fetch("/api/agent/review-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // No Authorization header needed (cookies)
                },
                body: JSON.stringify({ id, outcome, notes, score: Number(score) })
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Action failed");
        }
    };

    if (loading) return <div className="p-8">Loading pending queue...</div>;

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Verification Requests */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4 bg-slate-50 p-2 rounded">Pending Identity/Docs</h2>
                    {data.verifications?.length === 0 ? (
                        <p className="text-gray-500">No pending requests.</p>
                    ) : (
                        <div className="space-y-4">
                            {data.verifications?.map((v: any) => (
                                <div key={v._id} className="border p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="font-bold block">{v.type.toUpperCase()} VERIFICATION</span>
                                            <span className="text-sm text-gray-600">User: {v.userId?.name} ({v.userId?.email})</span>
                                        </div>
                                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                                    </div>

                                    {/* Proof Display */}
                                    {v.type === 'identity' && v.data?.identityProof && (
                                        <div className="mb-3">
                                            <a href={v.data.identityProof} target="_blank" className="text-blue-600 hover:underline text-sm">View ID Image</a>
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleReviewVerification(v._id, "approved")}
                                            className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700 text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReviewVerification(v._id, "rejected")}
                                            className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 text-sm"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Task Proofs */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4 bg-slate-50 p-2 rounded">Pending Skill Proofs</h2>
                    {data.tasks?.length === 0 ? (
                        <p className="text-gray-500">No pending task proofs.</p>
                    ) : (
                        <div className="space-y-4">
                            {data.tasks?.map((t: any) => (
                                <div key={t._id} className="border p-4 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="font-bold block">{t.taskId?.skillId?.name} - {t.taskId?.title}</span>
                                            <span className="text-sm text-gray-600">User: {t.userId?.name} ({t.userId?.email})</span>
                                        </div>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Proof</span>
                                    </div>

                                    <p className="text-sm mb-2"><span className="font-semibold">Type:</span> {t.taskId?.submissionType}</p>

                                    {/* Proof Content */}
                                    <div className="bg-gray-50 p-3 rounded mb-3 text-sm">
                                        {t.submissionText && <p><strong>Text:</strong> {t.submissionText}</p>}
                                        {t.submissionLink && <p><strong>Link:</strong> <a href={t.submissionLink} target="_blank" className="text-blue-600 underline">{t.submissionLink}</a></p>}
                                        {t.submissionFile && <p><strong>File:</strong> <a href={t.submissionFile} target="_blank" className="text-blue-600 underline">Download File</a></p>}
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={() => handleReviewTask(t._id, "approved")}
                                            className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700 text-sm"
                                        >
                                            Approve & Score
                                        </button>
                                        <button
                                            onClick={() => handleReviewTask(t._id, "rejected")}
                                            className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 text-sm"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
