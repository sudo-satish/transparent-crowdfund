import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
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

            {/* Contact Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions or need support? We're here to help you with your GroupFund experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    ></textarea>
                                </div>
                                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="text-2xl mr-4 text-indigo-600">📧</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Email</h3>
                                            <p className="text-gray-600">satishkumr001&#64;gmail&#46;com</p>
                                            <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="text-2xl mr-4 text-indigo-600">🕒</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                                            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM IST</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="text-2xl mr-4 text-indigo-600">🌐</div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Social Media</h3>
                                            <p className="text-gray-600">Follow us for updates and tips</p>
                                            <div className="flex gap-4 mt-2">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-700">Twitter</a>
                                                <a href="#" className="text-indigo-600 hover:text-indigo-700">LinkedIn</a>
                                                <a href="#" className="text-indigo-600 hover:text-indigo-700">Facebook</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 p-8 rounded-xl">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Need immediate help?</h3>
                                <p className="text-gray-600 mb-4">
                                    Check out our frequently asked questions or browse our help center for quick answers.
                                </p>
                                <div className="space-y-3">
                                    <Link href="/terms" className="block text-indigo-600 hover:text-indigo-700">
                                        Terms and Conditions →
                                    </Link>
                                    <Link href="/privacy" className="block text-indigo-600 hover:text-indigo-700">
                                        Privacy Policy →
                                    </Link>
                                    <Link href="/refunds" className="block text-indigo-600 hover:text-indigo-700">
                                        Cancellation & Refunds →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 