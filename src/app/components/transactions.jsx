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
import { useQRCode } from "next-qrcode";
import Head from "next/head";



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

  // handle whatsApp Share
  const handleWhatsAppShare=async()=>{
    const qr=fund.qrCode;
const description=fund.description||"Help us to reach our goal";
    const message = `Hey! 
We're raising funds for \" ${fund.title}\ "  –  ${description}.  
Every small contribution counts 
 
or you can scan this qr ${qr}
You can view details and contribute here: 
${window.location.href} 

All updates will be shared on this page.`;
 
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
              message)}`;
            window.open(shareUrl, "_blank");
  }


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
    <>
    <Head>
  <meta charSet="UTF-8" />
</Head>

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
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 18px rgba(107, 114, 128, 0.2)",
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          onClick={() => setShowQRCode((s) => !s)}
          className="px-3 py-1.5 mb-3 bg-gray-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
        >
          {showQRCode ? "Hide QR" : "Show QR"}
        </motion.button>
        {showQRCode && (
          <div className="my-4 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col items-center">
              <img src={fund.qrCode} alt="Scan to pay via UPI" className="font-black"/>
              <p className="text-lg text-gray-900 mt-2 break-words max-w-xs font-bold">
                {fund.title} 
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp share button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 18px rgba(37, 211, 102, 0.2)",
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          onClick={() =>handleWhatsAppShare()}
          className="px-3 py-1.5 mb-3 bg-green-500 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M20.52 3.48A11.94 11.94 0 0012.01 0C5.37 0 .01 5.37.01 12c0 2.11.55 4.17 1.6 5.98L0 24l6.19-1.6a11.9 11.9 0 005.81 1.49h.01c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.41zM12 21.44c-1.84 0-3.63-.49-5.2-1.43l-.37-.22-3.68.95.98-3.59-.24-.37A9.43 9.43 0 012.56 12C2.56 6.7 6.7 2.56 12 2.56c2.52 0 4.88.98 6.66 2.76A9.36 9.36 0 0121.44 12c0 5.3-4.14 9.44-9.44 9.44zm5.37-7.07c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.21-.45-2.3-1.43-.85-.75-1.43-1.67-1.6-1.95-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.48h-.55c-.19 0-.5.07-.76.36s-1 1-1 2.43 1.03 2.82 1.17 3.02c.14.19 2.03 3.09 4.92 4.33.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.19-.55-.33z" />
          </svg>
          Share on WhatsApp
        </motion.button>

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
                            {transaction.transactionType === "credit"
                              ? "+"
                              : "-"}
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
    </>
  );
}
