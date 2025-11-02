"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  convertToIndianCurrency,
  formatDate,
  escapeHtml,
} from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useLoading } from "./LoadingProvider";
import { FaDownload, FaRupeeSign, FaShare, FaWallet, FaExclamationTriangle, FaChartBar, FaFileExport, FaClipboardList, FaLock, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { config } from "@/config";
import {
  FaHandHoldingHeart,
  FaUsers,
  FaShareAlt,
  FaMoneyBillWave,
  FaWhatsapp,
  FaTwitter,
  FaLink,
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
  const [share, setShare] = useState(false);

  const paymentPageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fund/${fund?.slug}/make-payment`;
  const { Image } = useQRCode();
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
  const handleWhatsAppShare = async () => {
    const qr = fund.qrCode;
    const description = fund.description || "Help us to reach our goal";
    const message = `Hey! 
We're raising funds for \" ${fund.title}\ "  –  ${description}.  
Every small contribution counts 
 
or you can scan this qr ${qr}
You can view details and contribute here: 
${window.location.href} 

All updates will be shared on this page.`;

    const shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(shareUrl, "_blank");
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

  // handle download button
  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = fund.qrCode;
    link.download = `${fund.title}-QR`;
    link.click();
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
      </Head>

      <div className="relative flex h-auto min-h-screen w-full flex-col bg-white text-[#111718] font-display overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              {/* Space for overlay navbar */}
              <div className="h-20"></div>

              {/* Hero Section with Fund Details */}
              <div className="px-6 sm:px-10 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <button
                    onClick={() => router.push("/dashboard")}
                    aria-label="Back to dashboard"
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <IoArrowBack className="text-xl text-[#111718]" />
                  </button>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-2xl"
                  >
                    <FaHandHoldingHeart className='text-4xl text-[#0dccf2]' />
                  </motion.div>

                  <div>
                    <h1 className="text-[#111718] text-2xl sm:text-3xl font-bold leading-tight">
                      {escapeHtml(fund.title)}
                    </h1>
                    {fund.description && (
                    <div className="flex items-start gap-3">
                      {/* <FaUsers className="text-[#0dccf2] mt-0.5 text-lg" /> */}
                      <p className="text-[#495057] text-base leading-relaxed">{escapeHtml(fund.description)}</p>
                    </div>
                    )}
                  </div>
                </motion.div>

                
              </div>

              {/* Summary Cards */}
              <div className="px-6 sm:px-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 rounded-lg border border-green-200 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaMoneyBillWave className="text-green-600 text-lg" />
                      <h2 className="text-sm font-semibold text-[#111718]">
                        Total Received
                      </h2>
                    </div>
                    <p className="text-xl font-semibold text-green-600">
                      {convertToIndianCurrency(summary.totalCredited || 0)}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-orange-50 rounded-lg border border-orange-200 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FaRupeeSign className="text-orange-600 text-lg" />
                      <h2 className="text-sm font-semibold text-[#111718]">
                        Total Spent
                      </h2>
                    </div>
                    <p className="text-xl font-semibold text-orange-600">
                      {convertToIndianCurrency(summary.totalDebited || 0)}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-lg border p-4 hover:shadow-md transition-all duration-300 ${
                      currentBalance > 0 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {currentBalance > 0 ? (
                        <FaWallet className="text-blue-600 text-lg" />
                      ) : (
                        <FaExclamationTriangle className="text-red-600 text-lg" />
                      )}
                      <h2 className="text-sm font-semibold text-[#111718]">
                        Current Balance
                      </h2>
                    </div>
                    <p className={`text-xl font-semibold ${
                      currentBalance > 0 ? "text-blue-600" : "text-red-600"
                    }`}>
                      {convertToIndianCurrency(currentBalance || 0)}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 sm:px-10 mb-8">
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.3,
                    }}
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 },
                    }}
                    onClick={handlePaymentClick}
                    disabled={isCreatingPaymentLink || false}
                    className="flex items-center justify-center px-4 py-2.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                      className="mr-2"
                    >
                      <FaRupeeSign size={14} />
                    </motion.div>
                    <span>
                      {isCreatingPaymentLink ? "Creating..." : "Make Payment"}
                    </span>
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
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 },
                      }}
                      onClick={() => setIsRedeemModalOpen(true)}
                      disabled={isRedeeming}
                      className="flex items-center justify-center px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <FaMoneyBillWave className="mr-2" size={14} />
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
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.98,
                          transition: { duration: 0.1 },
                        }}
                        onClick={() => {
                          setGlobalLoading(true);
                          router.push(`/fund/${fund.slug}/analytics`);
                        }}
                        className="flex items-center justify-center px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                      >
                        <FaChartBar className="mr-2" size={14} />
                        Analytics
                      </motion.button>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: 0.7,
                          duration: 0.3,
                        }}
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.98,
                          transition: { duration: 0.1 },
                        }}
                        onClick={exportToCSV}
                        className="flex items-center justify-center px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                      >
                        <FaFileExport className="mr-2" size={14} />
                        Export CSV
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {shareError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 sm:px-10 mb-8"
                >
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium">{shareError}</p>
                  </div>
                </motion.div>
              )}

              {fund?.isPrivate && !isFundCreator ? (
                <div className="px-6 sm:px-10">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
                    <FaLock className="text-6xl mb-4 text-[#495057] mx-auto" />
                    <h3 className="text-xl font-bold text-[#111718] mb-2">Private Fund</h3>
                    <p className="text-[#495057]">This fund is private. You can't view details.</p>
                  </div>
                </div>
              ) : (
                <div className="px-6 sm:px-10 space-y-8">
                  {/* Top Contributors */}
                  <TopContributors contributor={summary.topContributor || {}} />
                  <ContributorsCount contributors={summary.contributorCount || 0} />

                  {/* Transactions List */}
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FaClipboardList className="text-lg text-[#0dccf2]" />
                      <h2 className="text-lg font-semibold text-[#111718]">
                        Recent Transactions
                      </h2>
                    </div>
                    {transactions?.length > 0 ? (
                      <div className="space-y-3">
                        {transactions.map((transaction, index) => (
                          <motion.div
                            key={transaction._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                              transaction.transactionType === "credit"
                                ? "bg-green-50 border-green-200 hover:border-green-300"
                                : "bg-orange-50 border-orange-200 hover:border-orange-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className={`text-lg ${
                                  transaction.transactionType === "credit" ? "text-green-600" : "text-orange-600"
                                }`}>
                                  {transaction.transactionType === "credit" ? (
                                    <FaArrowUp />
                                  ) : (
                                    <FaArrowDown />
                                  )}
                                </div>
                                <div>
                                  {transaction.name && (
                                    <p className="text-xs text-[#495057] font-medium mb-0.5">
                                      {escapeHtml(transaction.name)}
                                    </p>
                                  )}
                                  <p className="font-semibold text-[#111718] text-sm">
                                    {escapeHtml(transaction.contact)}
                                  </p>
                                  <p className="text-xs text-[#60838a] mt-0.5">
                                    {formatDate(transaction.date)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold text-lg ${
                                  transaction.transactionType === "credit"
                                    ? "text-green-600"
                                    : "text-orange-600"
                                }`}>
                                  {transaction.transactionType === "credit" ? "+" : "-"}
                                  {convertToIndianCurrency(transaction.amount)}
                                </p>
                                <p className="text-xs text-[#60838a] mt-0.5">
                                  Balance: {convertToIndianCurrency(transaction.closingBalance || 0)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FaEdit className="text-4xl mb-3 text-[#0dccf2] mx-auto" />
                        <h3 className="text-lg font-semibold text-[#111718] mb-2">No Transactions Yet</h3>
                        <p className="text-[#495057] text-sm">Start collecting funds to see transactions here</p>
                      </div>
                    )}
                  </div>
                </div>
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

              {/* Floating Share Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                onClick={() => setShare((prev) => !prev)}
                aria-label="Share this fund"
                className="fixed right-6 bottom-24 bg-gradient-to-r from-[#0dccf2] to-[#0bb8d9] hover:from-[#0bb8d9] hover:to-[#0aa5c6] text-white rounded-full p-4 shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl z-40"
              >
                <FaShareAlt className="h-6 w-6" />
              </motion.button>

              {/* Share Modal & Overlay */}
              <AnimatePresence>
                {share && (
                  <>
                    <motion.div
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShare(false)}
                    />

                    <motion.div
                      className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      {/* Gradient background accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0dccf2] to-[#7928CA]"></div>

                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-[#111718] mb-1">
                            Share This Fund
                          </h2>
                          <p className="text-[#495057] text-sm">
                            Help others contribute to this collection
                          </p>
                        </div>
                        <button
                          onClick={() => setShare(false)}
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

                      <div className="flex justify-around items-center gap-6">
                        <div className="flex flex-col items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWhatsAppShare()}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                            aria-label="Share on WhatsApp"
                          >
                            <FaWhatsapp className="w-7 h-7" />
                          </motion.button>
                          <span className="text-sm font-medium text-[#111718]">WhatsApp</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShare}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0dccf2] to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                            aria-label="Share link"
                          >
                            <FaLink className="w-7 h-7" />
                          </motion.button>
                          <span className="text-sm font-medium text-[#111718]">Share Link</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownload}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                            aria-label="Download QR"
                          >
                            <FaDownload className="w-6 h-6" />
                          </motion.button>
                          <span className="text-sm font-medium text-[#111718]">Download QR</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
