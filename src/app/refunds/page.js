import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RefundsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Refunds Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Cancellation and Refunds Policy
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Understanding our refund and cancellation policies for RaiseIt services.
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                        {/* Overview */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                At RaiseIt, we understand that circumstances may change and you may need to cancel
                                contributions or request refunds. This policy outlines the terms and conditions for
                                cancellations and refunds on our platform.
                            </p>
                        </div>

                        {/* General Refund Policy */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Refund Policy</h2>
                            <div className="space-y-4">
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Fees</h3>
                                    <p className="text-gray-600">
                                        Processing fees charged by RaiseIt are generally non-refundable, as these cover
                                        the costs of payment processing and platform maintenance.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contribution Refunds</h3>
                                    <p className="text-gray-600">
                                        Refunds for contributions are subject to the policies set by individual fund creators
                                        and may vary depending on the specific fund and circumstances.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h3>
                                    <p className="text-gray-600">
                                        Approved refunds are typically processed within 5-10 business days, depending on
                                        your payment method and financial institution.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* When Refunds Are Available */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Refunds Are Available</h2>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Cancellation</h3>
                                    <p className="text-gray-600">
                                        If a fund is cancelled by the creator before the target date, all contributors
                                        are typically eligible for refunds minus processing fees.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Issues</h3>
                                    <p className="text-gray-600">
                                        Refunds may be provided for contributions made due to technical errors or
                                        platform malfunctions.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Unauthorized Transactions</h3>
                                    <p className="text-gray-600">
                                        Refunds are available for unauthorized transactions or fraudulent activity
                                        on your account.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Duplicate Payments</h3>
                                    <p className="text-gray-600">
                                        If you accidentally make duplicate contributions, we can process refunds for
                                        the duplicate payments.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* When Refunds Are Not Available */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Refunds Are Not Available</h2>
                            <div className="space-y-4">
                                <div className="bg-red-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fund Goal Reached</h3>
                                    <p className="text-gray-600">
                                        Once a fund has reached its goal and funds have been disbursed to the creator,
                                        refunds are generally not available.
                                    </p>
                                </div>
                                <div className="bg-red-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Fees</h3>
                                    <p className="text-gray-600">
                                        Platform processing fees are non-refundable as they cover the costs of payment
                                        processing and platform maintenance.
                                    </p>
                                </div>
                                <div className="bg-red-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Voluntary Contributions</h3>
                                    <p className="text-gray-600">
                                        Contributions made voluntarily to active funds may not be eligible for refunds
                                        unless specified by the fund creator.
                                    </p>
                                </div>
                                <div className="bg-red-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Change of Mind</h3>
                                    <p className="text-gray-600">
                                        Refunds are not typically available simply because you changed your mind about
                                        contributing to a fund.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How to Request a Refund */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
                            <div className="space-y-4">
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Contact Support</h3>
                                    <p className="text-gray-600">
                                        Reach out to our support team through our
                                        <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 ml-1">
                                            contact form
                                        </Link> or email us at satishkumr001@gmail.com.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Provide Information</h3>
                                    <p className="text-gray-600">
                                        Include your account email, fund details, transaction ID, and reason for the refund request.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Review Process</h3>
                                    <p className="text-gray-600">
                                        Our team will review your request and respond within 2-3 business days with a decision.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Processing</h3>
                                    <p className="text-gray-600">
                                        If approved, refunds are processed within 5-10 business days to your original payment method.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fund Creator Responsibilities */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fund Creator Responsibilities</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    Fund creators are responsible for:
                                </p>
                                <ul className="text-gray-600 space-y-2 ml-6">
                                    <li>• Setting clear refund policies for their funds</li>
                                    <li>• Communicating with contributors about fund status</li>
                                    <li>• Processing refunds when appropriate</li>
                                    <li>• Using collected funds for the stated purpose</li>
                                    <li>• Providing updates on fund progress</li>
                                </ul>
                                <p className="text-gray-600">
                                    RaiseIt reserves the right to intervene in cases where fund creators fail to
                                    fulfill their responsibilities or violate platform policies.
                                </p>
                            </div>
                        </div>

                        {/* Dispute Resolution */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    If you have a dispute regarding a refund or cancellation:
                                </p>
                                <ol className="text-gray-600 space-y-2 ml-6">
                                    <li>1. First, attempt to resolve the issue directly with the fund creator</li>
                                    <li>2. If unable to resolve, contact RaiseIt support</li>
                                    <li>3. Provide all relevant documentation and evidence</li>
                                    <li>4. Our team will investigate and make a determination</li>
                                    <li>5. If necessary, we may involve third-party mediation</li>
                                </ol>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with a Refund?</h2>
                            <p className="text-gray-600 mb-4">
                                If you need to request a refund or have questions about our cancellation policy,
                                our support team is here to help.
                            </p>
                            <div className="flex gap-4">
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