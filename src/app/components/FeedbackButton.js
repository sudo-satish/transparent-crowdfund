'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function FeedbackButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.name.value, e.target.mobile.value, e.target.message.value);

        // Save in db
        const feedback = {
            name: e.target.name.value,
            mobile: e.target.mobile.value,
            message: e.target.message.value,
        };

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                body: JSON.stringify(feedback),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            setIsModalOpen(false);
            toast.success('Feedback submitted successfully');
        } catch (error) {
            toast.error('Failed to submit feedback');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 ease-in-out hover:scale-105"
                aria-label="Get Help or Feedback"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Get Help or Feedback</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    required
                                    pattern="[0-9]{10}"
                                    title="Please enter a valid 10-digit mobile number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
                                    placeholder="Enter your 10-digit mobile number"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none text-gray-900 placeholder-gray-500"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
} 