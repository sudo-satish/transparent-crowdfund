"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useLoading } from "../components/LoadingProvider";

import { toast } from "react-hot-toast";

export default function CreateFund() {
  const router = useRouter();
  const { user } = useUser();
  const { setIsLoading: setGlobalLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [customerDecidesAmount, setCustomerDecidesAmount] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || "",
      goal: formData.get("goal") ? parseFloat(formData.get("goal")) : null,
      contributionAmount: customerDecidesAmount
        ? null
        : formData.get("contributionAmount")
          ? parseFloat(formData.get("contributionAmount"))
          : null,
      customerDecidesAmount: customerDecidesAmount,
      isPrivate: isPrivate,
      createdBy: user.id,
    };

    try {
      const response = await fetch("/api/funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create fund");
      }

      toast.success("Fund created successfully!");
      setGlobalLoading(true);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to create fund. Please try again.");
      console.error("Error creating fund:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Gradient background accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0dccf2] to-[#7928CA]"></div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#111718] mb-1">
              Create New Fund
            </h2>
            <p className="text-[#495057] text-sm">
              Start your crowdfunding campaign today
            </p>
          </div>
          <button
            onClick={() => {
              setGlobalLoading(true);
              router.back();
            }}
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

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-[#111718] mb-3"
            >
              Fund Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
              placeholder="Enter a compelling title for your fund"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold text-[#111718] mb-3"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none resize-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
              placeholder="Describe your fund's purpose and how the money will be used..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="goal"
                className="block text-sm font-bold text-[#111718] mb-3"
              >
                Fund Goal (₹)
              </label>
              <input
                type="number"
                id="goal"
                name="goal"
                min="1"
                step="0.01"
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                placeholder="Enter target amount (optional)"
              />
            </div>

            <div>
              <label
                htmlFor="contributionAmount"
                className="block text-sm font-bold text-[#111718] mb-3"
              >
                Fixed Contribution Amount (₹)
              </label>
              {!customerDecidesAmount ? (
                <input
                  type="number"
                  id="contributionAmount"
                  name="contributionAmount"
                  required
                  min="1"
                  step="0.01"
                  className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                  placeholder="Enter fixed contribution amount"
                />
              ) : (
                <div className="w-full px-3 py-2 rounded-xl border-2 border-[#0dccf2]/20 bg-[#0dccf2]/10 flex items-center">
                  <p className="text-sm text-[#0dccf2] font-medium">
                    ✓ Contributors decide amount
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-[#111718]">Fund Settings</h3>

            <div className="flex items-start space-x-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                    isPrivate
                      ? "bg-[#0dccf2] border-[#0dccf2] shadow-sm"
                      : "bg-white border-gray-300 hover:border-[#0dccf2]/50"
                  }`}
                >
                  {isPrivate && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <label
                htmlFor="isPrivate"
                onClick={() => setIsPrivate(!isPrivate)}
                className="block text-sm text-[#111718] cursor-pointer leading-relaxed"
              >
                This fund is Private (only admin can view details)
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="customerDecidesAmount"
                  name="customerDecidesAmount"
                  checked={customerDecidesAmount}
                  onChange={(e) => setCustomerDecidesAmount(e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() =>
                    setCustomerDecidesAmount(!customerDecidesAmount)
                  }
                  className={`w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                    customerDecidesAmount
                      ? "bg-[#0dccf2] border-[#0dccf2] shadow-sm"
                      : "bg-white border-gray-300 hover:border-[#0dccf2]/50"
                  }`}
                >
                  {customerDecidesAmount && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <label
                htmlFor="customerDecidesAmount"
                onClick={() => setCustomerDecidesAmount(!customerDecidesAmount)}
                className="block text-sm text-[#111718] cursor-pointer leading-relaxed"
              >
                Let customers decide their contribution amount
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setGlobalLoading(true);
                router.back();
              }}
              disabled={isLoading}
              className="px-6 py-3 text-sm font-medium text-[#495057] bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 border border-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0dccf2] to-[#0bb8d9] hover:from-[#0bb8d9] hover:to-[#0aa5c6] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? "Creating..." : "Create Fund"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
