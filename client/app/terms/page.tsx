import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>

                <div className="prose prose-blue max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">1. Introduction</h2>
                        <p className="text-gray-600">
                            Welcome to EduSkill360. By accessing our website and using our services, you agree to be bound by these Terms of Service. Please read them carefully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">2. Use of Services</h2>
                        <p className="text-gray-600">
                            EduSkill360 provides a platform for skill verification and connecting freelancers with employers. You agree to use the platform only for lawful purposes and in accordance with these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">3. User Accounts</h2>
                        <p className="text-gray-600">
                            You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">4. Skill Verification</h2>
                        <p className="text-gray-600">
                            Our skill verification process is designed to assess your proficiency. We reserve the right to revoke any verification badge if we discover any fraudulent activity or cheating during assessments.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">5. Disclaimer</h2>
                        <p className="text-gray-600">
                            The services are provided "as is". EduSkill360 makes no warranties, expressed or implied, regarding the accuracy or reliability of the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">6. Contact Us</h2>
                        <p className="text-gray-600">
                            If you have any questions about these Terms, please contact us at <a href="mailto:support@edoskill360.com" className="text-blue-600 hover:underline">support@edoskill360.com</a>.
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
