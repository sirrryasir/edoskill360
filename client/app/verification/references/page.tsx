"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";

interface ReferenceForm {
    name: string;
    email: string;
    relationship: string;
    company: string;
}

export default function ReferencesPage() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ReferenceForm>();

    const onSubmit = async (data: ReferenceForm) => {
        setLoading(true);
        try {
            const res = await fetch("/api/verification/references", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                alert("Failed to submit reference.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting reference.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto p-6 max-w-2xl mt-10">
                <Card className="border-green-500 bg-green-50 dark:bg-green-900/20 text-center p-8">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="w-16 h-16 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-700 dark:text-green-400 mb-2">Request Sent!</CardTitle>
                    <CardDescription className="text-base text-slate-700 dark:text-slate-300">
                        We have sent a verification request to your reference via Email/WhatsApp. <br />
                        Once they respond, our Agents will review and verify your work history.
                    </CardDescription>
                    <div className="mt-8">
                        <Button onClick={() => router.push("/dashboard/worker?tab=verification")} size="lg">
                            Return to Dashboard
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Professional References</CardTitle>
                    <CardDescription>
                        Provide contact details for a previous employer or colleague who can vouch for your professional experience.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Reference Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. John Doe"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@company.com"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="relationship">Relationship</Label>
                            <Input
                                id="relationship"
                                placeholder="e.g. Manager, Team Lead, Client"
                                {...register("relationship", { required: "Relationship is required" })}
                            />
                            {errors.relationship && <span className="text-red-500 text-sm">{errors.relationship.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                placeholder="e.g. TechFlow Solutions"
                                {...register("company", { required: "Company is required" })}
                            />
                            {errors.company && <span className="text-red-500 text-sm">{errors.company.message}</span>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" size="lg" disabled={loading}>
                            {loading ? "Sending Request..." : <><Send className="w-4 h-4 mr-2" /> Send Verification Request</>}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
