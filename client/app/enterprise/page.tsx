import Link from "next/link";

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <main>
                {/* Hero Section */}
                <section className="bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Hire Proven Talent with</span>
                            <span className="block text-blue-600">Confidence</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            EduSkill360 Enterprise gives you access to a pre-vetted pool of professionals. Our rigorous skill verification ensures you only see candidates who can actually do the job.
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <a href="#contact" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 sm:px-8">
                                    Contact Sales
                                </a>
                                <a href="/register?role=employer" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 sm:px-8">
                                    Create Employer Account
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Abstract Background Element */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-blue-500 fill-current">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" />
                        </svg>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Why Top Companies Choose Us
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                                {/* Feature 1 */}
                                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Verified Skills</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Stop guessing. Every candidate on our platform has passed technical assessments specific to their role.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Talent Pooling</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Build your own pipeline of pre-approved Talents for quick project ramping.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Custom Assessments</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Need a specific tech stack? We'll create custom verification exams tailored to your organization's needs.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section id="contact" className="bg-blue-600">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col items-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            <span className="block">Ready to build your team?</span>
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-blue-100 text-center max-w-2xl">
                            Contact our sales team today to discuss your hiring needs.
                        </p>
                        <div className="mt-8 w-full flex justify-center">
                            <a href="mailto:sales@edoskill360.com" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                                sales@edoskill360.com
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
