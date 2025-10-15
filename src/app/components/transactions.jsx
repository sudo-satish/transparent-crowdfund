"use client";

import { motion } from "framer-motion";
import {
  convertToIndianCurrency,
  formatDate,
  escapeHtml,
} from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useLoading } from "./LoadingProvider";
import { FaRupeeSign } from "react-icons/fa";
import { config } from "@/config";
import {
  FaHandHoldingHeart,
  FaUsers,
  FaShareAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import TopContributors from "./TopContributors";
import { useEffect, useState } from "react";
import ContributorsCount from "./ContributorsCount";
import AmountModal from "./AmountModal";
import NameModal from "./NameModal";
import RedeemModal from "./RedeemModal";
import { useQRCode } from 'next-qrcode';
export default function Transactions({ fundId, summary, fund, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [shareError, setShareError] = useState("");
  const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isCreatingPaymentLink, setIsCreatingPaymentLink] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const paymentPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fund/${fund?.slug}/make-payment`;
  const { Image } = useQRCode()


  const router = useRouter();
  const { setIsLoading: setGlobalLoading } = useLoading();

  // Check if current user is the fund creator
  const isFundCreator = fund?.createdBy === userId;
  const currentBalance = summary?.totalBalance || 0;

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await fetch(`/api/funds/${fundId}/transaction`);
      const transactionsData = await transactions.json();
      setTransactions(transactionsData);
    };

    setIsLoading(true);

    async function fetchData() {
      await Promise.all([fetchTransactions()]);
    }

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, [fundId]);

  const exportToCSV = () => {
    // Prepare CSV content
    const headers = ["Date", "Type", "Contact", "Amount"];
    const csvContent = [
      headers.join(","),
      ...transactions.map((t) =>
        [
          formatDate(t.date),
          t.transactionType === "credit" ? "Received" : "Spent",
          t.contact.replace(/^91/, "+91"),
          convertToIndianCurrency(t.amount).replace(/[₹,]/g, ""), // Remove ₹ and commas for clean number format
        ].join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `shyam_colony_transactions_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Support ${escapeHtml(fund.title)}`,
      text: `Help us reach our goal! Current balance: ${convertToIndianCurrency(currentBalance)}. ${escapeHtml(fund.description) || "Join us in making a difference!"}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert(
          "Payment page link copied to clipboard! Share it with others to collect funds."
        );
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setShareError("Failed to share. Please try again.");
      }
    }
  };

  const handlePaymentClick = () => {
    if (fund.customerDecidesAmount) {
      // Show amount modal for customer-decided amount
      setIsAmountModalOpen(true);
    } else {
      // Show name modal for fixed amount
      setIsNameModalOpen(true);
    }
  };

  const createFixedAmountPaymentLink = async (name) => {
    setIsCreatingPaymentLink(true);
    try {
      const response = await fetch("/api/razorpay/fixed-payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fundId, name }),
      });

      const data = await response.json();

      if (data.success && data.paymentLink) {
        window.open(data.paymentLink, "_blank");
        setIsNameModalOpen(false);
      } else {
        alert("Failed to create payment link. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment link:", error);
      alert("Failed to create payment link. Please try again.");
    } finally {
      setIsCreatingPaymentLink(false);
    }
  };

  const handleAmountSubmit = async (amount, name) => {
    setIsCreatingPaymentLink(true);
    try {
      const response = await fetch("/api/razorpay/payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, fundId, name }),
      });

      const data = await response.json();

      if (data.success && data.paymentLink) {
        window.open(data.paymentLink, "_blank");
        setIsAmountModalOpen(false);
      } else {
        alert("Failed to create payment link. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment link:", error);
      alert("Failed to create payment link. Please try again.");
    } finally {
      setIsCreatingPaymentLink(false);
    }
  };

  const handleRedeemSubmit = async (bankDetails) => {
    setIsRedeeming(true);
    try {
      const response = await fetch(`/api/funds/${fundId}/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bankDetails),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `Successfully redeemed ₹${data.amount.toLocaleString("en-IN")} to your account. The funds will be transferred within 2-3 business days.`
        );
        setIsRedeemModalOpen(false);
        // Refresh the page to show updated balance
        window.location.reload();
      } else {
        alert(data.message || "Failed to redeem funds. Please try again.");
      }
    } catch (error) {
      console.error("Error redeeming funds:", error);
      alert("Failed to redeem funds. Please try again.");
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <FaHandHoldingHeart className="text-4xl text-green-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800">Fund Details</h1>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 ml-12"
          >
            <MdLocationOn className="text-xl text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-700">
              {escapeHtml(fund.title)}
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2 mb-8"
        >
          {fund.description && (
            <div className="flex items-start gap-3">
              <FaUsers className="text-gray-400 mt-1" />
              <p className="text-gray-600">{escapeHtml(fund.description)}</p>
            </div>
          )}
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 p-3 md:p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-sm md:text-lg font-semibold text-green-800">
              Total Received
            </h2>
            <p className="text-lg md:text-2xl font-bold text-green-600">
              {convertToIndianCurrency(summary.totalCredited || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-red-50 p-3 md:p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-sm md:text-lg font-semibold text-red-800">
              Total Spent
            </h2>
            <p className="text-lg md:text-2xl font-bold text-red-600">
              {convertToIndianCurrency(summary.totalDebited || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-3 md:p-6 rounded-lg shadow-sm ${
              currentBalance >= 0 ? "bg-blue-50" : "bg-orange-50"
            }`}
          >
            <h2
              className={`text-sm md:text-lg font-semibold ${
                currentBalance >= 0 ? "text-blue-800" : "text-orange-800"
              }`}
            >
              Current Balance
            </h2>
            <p
              className={`text-lg md:text-2xl font-bold ${
                currentBalance >= 0 ? "text-blue-600" : "text-orange-600"
              }`}
            >
              {convertToIndianCurrency(currentBalance || 0)}
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.3,
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
              backgroundColor: "rgb(22 163 74)",
            }}
            whileTap={{
              scale: 0.97,
              transition: { duration: 0.1 },
            }}
            onClick={handlePaymentClick}
            disabled={isCreatingPaymentLink || false}
            className="group relative px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <FaRupeeSign className="text-yellow-300" size={14} />
            </motion.div>
            <span>
              {isCreatingPaymentLink ? "Creating..." : "Make Payment"}
            </span>
          </motion.button>
          <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.9,
                  duration: 0.3,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                  backgroundColor: "rgb(37 99 235)",
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 },
                }}
                onClick={handleShare}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
              >
                <FaShareAlt size={14} />
                Share Page and start collecting funds
              </motion.button>

          {/* Redeem Button - Only show for fund creator */}
          {isFundCreator && currentBalance > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.55,
                duration: 0.3,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgb(37 99 235)",
              }}
              whileTap={{
                scale: 0.97,
                transition: { duration: 0.1 },
              }}
              onClick={() => setIsRedeemModalOpen(true)}
              disabled={isRedeeming}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed text-center"
            >
              <FaMoneyBillWave size={14} />
              {isRedeeming ? "Processing..." : "Redeem Funds"}
            </motion.button>
          )}

          {transactions?.length > 0 && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 0.3,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
                  backgroundColor: "rgb(126 34 206)",
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 },
                }}
                onClick={() => {
                  setGlobalLoading(true);
                  router.push(`/fund/${fund.slug}/analytics`);
                }}
                className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                View Analytics
              </motion.button>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.3,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)",
                  backgroundColor: "rgb(29 78 216)",
                }}
                whileTap={{
                  scale: 0.97,
                  transition: { duration: 0.1 },
                }}
                onClick={exportToCSV}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                Export to CSV
              </motion.button>
            </>
          )}
          
        </div>
        {/* show QR code buttonn */}
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.3 }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 18px rgba(107, 114, 128, 0.2)" }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            onClick={() => setShowQRCode((s) => !s)}
            className="px-3 py-1.5 mb-3 bg-gray-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
          >
            {showQRCode ? "Hide QR" : "Show QR"}
        </motion.button>
        {showQRCode && (
          <div className="my-4 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center">
              <Image
                text={paymentPageUrl}
                options={{
                  type: 'image/jpeg',
                  quality: 0.3,
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#010599FF',
                    light: '#FFE6C2FF',
                  },
                }}
              />
              <p className="text-sm text-gray-600 mt-2 break-words max-w-xs">{paymentPageUrl}</p>
            </div>
          </div>
        )}

        {shareError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mb-4"
          >
            {shareError}
          </motion.div>
        )}
      {fund?.isPrivate && !isFundCreator ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-600">
            This fund is private. You can't view details.
          </div>
        ) : (
        <>
        {/* Top Contributors */}
        <TopContributors contributor={summary.topContributor || {}} />
        <ContributorsCount contributors={summary.contributorCount || 0} />

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h2>
          </div>
          {transactions?.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg ${
                    transaction.transactionType === "credit"
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      {transaction.name && (
                        <p className="text-xs text-gray-500 font-normal mb-0.5">
                          {escapeHtml(transaction.name)}
                        </p>
                      )}
                      <p className="font-medium text-gray-800">
                        {escapeHtml(transaction.contact)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          transaction.transactionType === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.transactionType === "credit" ? "+" : "-"}
                        {convertToIndianCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Balance:{" "}
                        {convertToIndianCurrency(
                          transaction.closingBalance || 0
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No transactions found
            </div>
          )}
        </div>
        </>
        )}

        {/* Amount Modal */}
        <AmountModal
          isOpen={isAmountModalOpen}
          onClose={() => setIsAmountModalOpen(false)}
          onSubmit={handleAmountSubmit}
          isLoading={isCreatingPaymentLink}
        />

        {/* Name Modal for Fixed Amount */}
        <NameModal
          isOpen={isNameModalOpen}
          onClose={() => setIsNameModalOpen(false)}
          onSubmit={createFixedAmountPaymentLink}
          isLoading={isCreatingPaymentLink}
          amount={fund.contributionAmount}
        />

        {/* Redeem Modal */}
        <RedeemModal
          isOpen={isRedeemModalOpen}
          onClose={() => setIsRedeemModalOpen(false)}
          onSubmit={handleRedeemSubmit}
          isLoading={isRedeeming}
          currentBalance={currentBalance}
        />
      </div>
    </div>
  );
}
