import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Terms Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Terms and Conditions
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Please read these terms carefully before using GroupFund services.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                        {/* Agreement */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing and using GroupFund ("the Service"), you accept and agree to be bound by the
                                terms and provision of this agreement. If you do not agree to abide by the above, please
                                do not use this service.
                            </p>
                        </div>

                        {/* Service Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                GroupFund is a digital platform that enables users to create, manage, and contribute to
                                group funds for various purposes including but not limited to:
                            </p>
                            <ul className="text-gray-600 space-y-2 ml-6">
                                <li>• Group trips and events</li>
                                <li>• Team activities and projects</li>
                                <li>• Community initiatives</li>
                                <li>• Shared expenses and collections</li>
                            </ul>
                        </div>

                        {/* User Accounts */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    To use certain features of the Service, you must create an account. You agree to:
                                </p>
                                <ul className="text-gray-600 space-y-2 ml-6">
                                    <li>• Provide accurate, current, and complete information</li>
                                    <li>• Maintain and update your account information</li>
                                    <li>• Keep your password secure and confidential</li>
                                    <li>• Accept responsibility for all activities under your account</li>
                                    <li>• Notify us immediately of any unauthorized use</li>
                                </ul>
                            </div>
                        </div>

                        {/* Acceptable Use */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">You agree not to use the Service to:</p>
                                <ul className="text-gray-600 space-y-2 ml-6">
                                    <li>• Violate any applicable laws or regulations</li>
                                    <li>• Infringe upon the rights of others</li>
                                    <li>• Transmit harmful, offensive, or inappropriate content</li>
                                    <li>• Attempt to gain unauthorized access to the Service</li>
                                    <li>• Interfere with or disrupt the Service</li>
                                    <li>• Use the Service for fraudulent or illegal activities</li>
                                </ul>
                            </div>
                        </div>

                        {/* Payment Terms */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contributions</h3>
                                    <p className="text-gray-600">
                                        All contributions to funds are processed through secure third-party payment processors.
                                        By making a contribution, you authorize the processing of your payment.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fees</h3>
                                    <p className="text-gray-600">
                                        GroupFund may charge processing fees on transactions. All fees are clearly displayed
                                        before completion of any transaction.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Refunds</h3>
                                    <p className="text-gray-600">
                                        Refund policies are determined by individual fund creators. Please refer to our
                                        <Link href="/refunds" className="text-indigo-600 hover:text-indigo-700 ml-1">
                                            Cancellation and Refunds Policy
                                        </Link> for more information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Privacy and Data */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Your privacy is important to us. Please review our
                                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 ml-1">
                                    Privacy Policy
                                </Link>, which also governs your use of the Service, to understand our practices.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    The Service and its original content, features, and functionality are and will remain
                                    the exclusive property of GroupFund and its licensors.
                                </p>
                                <p className="text-gray-600">
                                    You retain ownership of any content you submit to the Service, but grant us a license
                                    to use, modify, and display such content in connection with the Service.
                                </p>
                            </div>
                        </div>

                        {/* Disclaimers */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
                            <div className="space-y-4">
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Availability</h3>
                                    <p className="text-gray-600">
                                        The Service is provided "as is" and "as available" without warranties of any kind,
                                        either express or implied.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Management</h3>
                                    <p className="text-gray-600">
                                        GroupFund is not responsible for how fund creators use collected funds or for any
                                        disputes between fund participants.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-party Services</h3>
                                    <p className="text-gray-600">
                                        We use third-party payment processors and services. We are not responsible for their
                                        actions or policies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Limitation of Liability */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                In no event shall GroupFund, nor its directors, employees, partners, agents, suppliers,
                                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive
                                damages, including without limitation, loss of profits, data, use, goodwill, or other
                                intangible losses, resulting from your use of the Service.
                            </p>
                        </div>

                        {/* Termination */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    We may terminate or suspend your account and bar access to the Service immediately,
                                    without prior notice or liability, under our sole discretion, for any reason whatsoever
                                    and without limitation, including but not limited to a breach of the Terms.
                                </p>
                                <p className="text-gray-600">
                                    If you wish to terminate your account, you may simply discontinue using the Service.
                                </p>
                            </div>
                        </div>

                        {/* Changes to Terms */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                                If a revision is material, we will provide at least 30 days notice prior to any new terms
                                taking effect.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                            <p className="text-gray-600 leading-relaxed">
                                These Terms shall be interpreted and governed by the laws of India,
                                without regard to its conflict of law provisions.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about these Terms and Conditions, please contact us.
                            </p>
                            <div className="flex gap-4">
                                <Link href="/contact">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                                        Contact Us
                                    </Button>
                                </Link>
                                <Link href="/privacy">
                                    <Button variant="outline">
                                        Privacy Policy
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