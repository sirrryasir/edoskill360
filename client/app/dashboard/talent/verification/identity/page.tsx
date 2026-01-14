"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function IdentityVerificationPage() {
    const { user } = useAuthStore();
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Using relative path to simpler proxy/rewrite handling (or ensuring cookies are sent)
            const res = await fetch("/api/verification/identity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ identityProof: imageUrl }),
            });

            if (res.ok) {
                alert("Identity verification submitted!");
                router.push("/dashboard/talent?tab=verification");
            } else {
                const data = await res.json();
                alert(data.message || "Submission failed.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during submission.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Identity Verification</h1>

            <div className="space-y-6">
                <p className="text-muted-foreground">
                    Upload a clear image of your Government ID (Passport, Driver's License, or National ID).
                    <br />
                    <span className="text-xs text-muted-foreground/80 mt-1 block">
                        *For MVP demo, please paste a public image URL representing your ID.
                    </span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Upload ID Document (Image)</label>
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImageUrl(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                required={!imageUrl}
                            />
                            <div className="space-y-2">
                                <div className="mx-auto w-12 h-12 text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                </div>
                                <p className="text-xs text-slate-500">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                        </div>
                    </div>

                    {imageUrl && (
                        <div className="mt-4">
                            <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                            <img
                                src={imageUrl}
                                alt="ID Preview"
                                className="w-full h-48 object-cover rounded-lg border bg-muted"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit for Verification"}
                    </button>
                </form>
            </div>
        </div>
    );
}
