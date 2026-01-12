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
                router.push("/verification");
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
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Identity Verification</h1>

            <div className="bg-white p-8 rounded-xl border shadow-sm">
                <p className="mb-6 text-gray-600">
                    Upload a clear image of your Government ID (Passport, Driver's License, or National ID).
                    <br />
                    <span className="text-xs text-gray-400">
                        *For MVP demo, please paste a public image URL representing your ID.
                    </span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">ID Image URL</label>
                        <input
                            type="url"
                            className="w-full border p-3 rounded-lg"
                            placeholder="https://example.com/my-id.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>

                    {imageUrl && (
                        <div className="mt-4">
                            <p className="text-xs text-gray-500 mb-2">Preview:</p>
                            <img
                                src={imageUrl}
                                alt="ID Preview"
                                className="w-full h-48 object-cover rounded-lg border bg-gray-50"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition mt-4 disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit for Verification"}
                    </button>
                </form>
            </div>
        </div>
    );
}
