import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
            {/* Shipping Policy Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Shipping Policy
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Information about our shipping practices and delivery policies.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                        {/* Overview */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                GroupFund is a digital platform that facilitates group funding and payment collection.
                                As we primarily deal with digital transactions and fund transfers, our shipping policy
                                focuses on the delivery of digital services and any physical items that may be associated
                                with our platform.
                            </p>
                        </div>

                        {/* Digital Services */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Digital Services Delivery</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Access</h3>
                                    <p className="text-gray-600">
                                        Upon successful payment and fund creation, you will have immediate access to your
                                        GroupFund dashboard and all associated digital services.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Confirmations</h3>
                                    <p className="text-gray-600">
                                        All transactions and fund activities are confirmed via email within minutes of completion.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                                    <p className="text-gray-600">
                                        Fund progress and contribution updates are delivered in real-time through our platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Physical Items (if applicable) */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Physical Items (If Applicable)</h2>
                            <div className="space-y-4">
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h3>
                                    <p className="text-gray-600">
                                        For any physical items (such as promotional materials or merchandise), processing
                                        typically takes 1-3 business days from the date of order confirmation.
                                    </p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Methods</h3>
                                    <ul className="text-gray-600 space-y-2">
                                        <li>• Standard Shipping: 5-7 business days</li>
                                        <li>• Express Shipping: 2-3 business days</li>
                                        <li>• Overnight Shipping: Next business day (where available)</li>
                                    </ul>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Costs</h3>
                                    <p className="text-gray-600">
                                        Shipping costs vary based on destination, weight, and shipping method selected.
                                        All shipping costs are clearly displayed during the checkout process.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* International Shipping */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Shipping</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    GroupFund services are available internationally. However, for physical items,
                                    international shipping may be subject to:
                                </p>
                                <ul className="text-gray-600 space-y-2 ml-6">
                                    <li>• Customs duties and taxes</li>
                                    <li>• Import restrictions</li>
                                    <li>• Extended delivery times (7-21 business days)</li>
                                    <li>• Additional shipping costs</li>
                                </ul>
                                <p className="text-gray-600">
                                    Customers are responsible for any customs duties, taxes, or fees imposed by their
                                    local government.
                                </p>
                            </div>
                        </div>

                        {/* Tracking and Delivery */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking and Delivery</h2>
                            <div className="space-y-4">
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Tracking</h3>
                                    <p className="text-gray-600">
                                        All digital transactions and fund activities can be tracked in real-time through
                                        your GroupFund dashboard.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Physical Item Tracking</h3>
                                    <p className="text-gray-600">
                                        For physical items, tracking numbers are provided via email once the item ships.
                                        You can track your package through our partner shipping carriers.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Confirmation</h3>
                                    <p className="text-gray-600">
                                        Digital services are confirmed via email. Physical items require signature upon
                                        delivery for orders over a certain value.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Lost or Damaged Items */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lost or Damaged Items</h2>
                            <div className="space-y-4">
                                <p className="text-gray-600">
                                    If you receive a damaged item or if your item is lost in transit, please contact
                                    our support team within 48 hours of delivery (or expected delivery date for lost items).
                                </p>
                                <p className="text-gray-600">
                                    We will work with our shipping partners to resolve the issue and provide a replacement
                                    or refund as appropriate.
                                </p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Shipping?</h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about our shipping policy or need assistance with a delivery,
                                please don't hesitate to contact us.
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