import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-indigo-600">
                                GroupFund
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="text-sm">Home</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Privacy Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            How we collect, use, and protect your personal information.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                        {/* Introduction */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                            <p className="text-gray-600 leading-relaxed">
                                At GroupFund, we are committed to protecting your privacy and ensuring the security
                                of your personal information. This Privacy Policy explains how we collect, use,
                                disclose, and safeguard your information when you use our platform.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                            <div className="space-y-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Name and contact information (email, phone number)</li>
                                        <li>• Account credentials and profile information</li>
                                        <li>• Payment information (processed securely through third-party providers)</li>
                                        <li>• Communication preferences</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Fund creation and contribution activities</li>
                                        <li>• Platform usage patterns and preferences</li>
                                        <li>• Device information and IP addresses</li>
                                        <li>• Browser type and operating system</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund-Related Information</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Fund details and descriptions</li>
                                        <li>• Contribution amounts and transaction history</li>
                                        <li>• Fund progress and updates</li>
                                        <li>• Communication between fund creators and contributors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                            <div className="space-y-4">
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Provision</h3>
                                    <p className="text-gray-600">
                                        To provide, maintain, and improve our platform services, including fund creation,
                                        contribution processing, and user account management.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
                                    <p className="text-gray-600">
                                        To send you important updates, notifications, and respond to your inquiries and
                                        support requests.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Security and Fraud Prevention</h3>
                                    <p className="text-gray-600">
                                        To protect against fraud, unauthorized access, and ensure the security of our
                                        platform and users.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics and Improvement</h3>
                                    <p className="text-gray-600">
                                        To analyze usage patterns, improve our services, and develop new features
                                        (using anonymized data where possible).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Information Sharing */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
                            <div className="space-y-4">
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">With Your Consent</h3>
                                    <p className="text-gray-600">
                                        We may share your information with third parties when you explicitly consent
                                        to such sharing.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Providers</h3>
                                    <p className="text-gray-600">
                                        We work with trusted third-party service providers for payment processing,
                                        hosting, analytics, and customer support.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                                    <p className="text-gray-600">
                                        We may disclose information when required by law, court order, or to protect
                                        our rights, property, or safety.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Transfers</h3>
                                    <p className="text-gray-600">
                                        In the event of a merger, acquisition, or sale of assets, user information
                                        may be transferred as part of the transaction.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Data Security */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                            <div className="space-y-4">
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Encryption</h3>
                                    <p className="text-gray-600">
                                        We use industry-standard encryption to protect your data during transmission
                                        and storage.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Controls</h3>
                                    <p className="text-gray-600">
                                        Strict access controls and authentication measures are in place to protect
                                        your personal information.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Security Audits</h3>
                                    <p className="text-gray-600">
                                        We conduct regular security assessments and updates to maintain the highest
                                        level of data protection.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Employee Training</h3>
                                    <p className="text-gray-600">
                                        Our team receives regular training on data protection and privacy best practices.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Your Rights */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
                            <div className="space-y-4">
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Access and Update</h3>
                                    <p className="text-gray-600">
                                        You can access, update, or correct your personal information through your
                                        account settings or by contacting us.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Portability</h3>
                                    <p className="text-gray-600">
                                        You have the right to request a copy of your personal data in a portable format.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Deletion</h3>
                                    <p className="text-gray-600">
                                        You can request deletion of your personal information, subject to legal
                                        and contractual obligations.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Opt-out</h3>
                                    <p className="text-gray-600">
                                        You can opt out of marketing communications and certain data processing
                                        activities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cookies and Tracking */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    We use cookies and similar technologies to:
                                </p>
                                <ul className="text-gray-600 space-y-2 ml-6">
                                    <li>• Remember your preferences and settings</li>
                                    <li>• Analyze website traffic and usage patterns</li>
                                    <li>• Provide personalized content and features</li>
                                    <li>• Ensure platform security and functionality</li>
                                </ul>
                                <p className="text-gray-600">
                                    You can control cookie settings through your browser preferences, though
                                    disabling certain cookies may affect platform functionality.
                                </p>
                            </div>
                        </div>

                        {/* Children's Privacy */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                GroupFund is not intended for children under 13 years of age. We do not knowingly
                                collect personal information from children under 13. If you believe we have collected
                                information from a child under 13, please contact us immediately.
                            </p>
                        </div>

                        {/* International Users */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you are accessing GroupFund from outside India, please be aware that
                                your information may be transferred to, stored, and processed in India
                                where our servers are located. By using our service, you consent to such transfer.
                            </p>
                        </div>

                        {/* Changes to Privacy Policy */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any
                                material changes by posting the new Privacy Policy on this page and updating the
                                "Last updated" date. We encourage you to review this Privacy Policy periodically.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about this Privacy Policy or our data practices,
                                please contact us:
                            </p>
                            <div className="space-y-2 text-gray-600">
                                <p>Email: privacy@groupfund.com</p>
                                <p>Address: [Your Company Address]</p>
                                <p>Phone: [Your Contact Number]</p>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <Link href="/contact">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                                        Contact Support
                                    </Button>
                                </Link>
                                <Link href="/terms">
                                    <Button variant="outline">
                                        View Terms
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 