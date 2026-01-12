import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-blue max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">1. Data Collection</h2>
                        <p className="text-gray-600">
                            We collect information you provide directly to us, such as when you create an account, take a skill assessment, or apply for a job. This includes your name, email, and professional profile data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">2. How We Use Data</h2>
                        <p className="text-gray-600">
                            We use your data to:
                            <ul className="list-disc ml-5 mt-2">
                                <li>Provide and improve our services.</li>
                                <li>Verify your skills and issue certificates.</li>
                                <li>Match you with potential employers.</li>
                                <li>Communicate with you about updates and opportunities.</li>
                            </ul>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">3. Assessment Data</h2>
                        <p className="text-gray-600">
                            When you take a skill assessment, we record your answers and results. Verified badges are public on your profile unless you choose to hide them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">4. Data Sharing</h2>
                        <p className="text-gray-600">
                            We do not sell your personal data. We facilitate data sharing only between workers and employers as part of the hiring process you initiate.
                        </p>
                    </section>

                    <p className="text-sm text-gray-400 mt-8">
                        Last updated: January 1, 2026
                    </p>
                </div>
            </main>
        </div>
    );
}
