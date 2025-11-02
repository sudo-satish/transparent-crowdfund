"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      e.target.name.value,
      e.target.mobile.value,
      e.target.message.value
    );

    // Save in db
    const feedback = {
      name: e.target.name.value,
      mobile: e.target.mobile.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(feedback),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setIsModalOpen(false);
      toast.success(
        "Feedback submitted successfully! We'll get back to you soon."
      );
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#0dccf2] to-[#0bb8d9] hover:from-[#0bb8d9] hover:to-[#0aa5c6] text-white rounded-full p-4 shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl z-40"
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
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Gradient background accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0dccf2] to-[#7928CA]"></div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#111718] mb-1">
                  We're Here to Help!
                </h2>
                <p className="text-[#495057] text-sm">
                  Share your feedback or get assistance
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#495057] hover:text-[#111718] cursor-pointer transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-[#111718] mb-3"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-bold text-[#111718] mb-3"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-[#111718] mb-3"
                >
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none resize-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                  placeholder="Share your feedback, questions, or issues you're facing..."
                ></textarea>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-[#495057] bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0dccf2] to-[#0bb8d9] hover:from-[#0bb8d9] hover:to-[#0aa5c6] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
