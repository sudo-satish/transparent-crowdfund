'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingLink } from "../components/LoadingLink";
import { Button } from "@/components/ui/button";
import { FaPlus, FaRupeeSign, FaTrash, FaWallet, FaChartBar, FaCheckCircle, FaMoneyBillWave, FaBullseye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { escapeHtml } from '@/utils/helper';

const canDeleteFund = process.env.NODE_ENV === 'development';

export default function DashboardUI() {
    const router = useRouter();
    const [funds, setFunds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingFundId, setDeletingFundId] = useState(null);

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await fetch("/api/funds");
                const data = await response.json();
                setFunds(data);
            } catch (error) {
                console.error("Error fetching funds:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFunds();
    }, []);

    const handleDeleteFund = async (fundId, fundTitle) => {
        if (!confirm(`Are you sure you want to delete "${escapeHtml(fundTitle)}"? This action cannot be undone.`)) {
            return;
        }

        setDeletingFundId(fundId);

        try {
            const response = await fetch(`/api/funds/${fundId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete fund');
            }

            // Remove the fund from the local state
            setFunds(funds.filter(fund => fund._id !== fundId));
        } catch (error) {
            console.error("Error deleting fund:", error);
            alert('Failed to delete fund. Please try again.');
        } finally {
            setDeletingFundId(null);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-white text-[#111718] font-display overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        {/* Space for overlay navbar */}
                        <div className="h-20"></div>

                        {/* Hero Section */}
                        <div className="relative overflow-hidden mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6DD5FA] to-[#7928CA] opacity-10"></div>
                            <div className="relative">
                                <div className="flex flex-col gap-6 px-6 py-8 sm:px-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center gap-4"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="text-[#0dccf2]"
                                        >
                                            <FaWallet className="text-5xl" />
                                        </motion.div>
                                        <div>
                                            <h1 className="text-[#111718] text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                                                My Collection Funds
                                            </h1>
                                            <p className="text-lg font-medium leading-normal text-[#495057] mt-1">
                                                Manage all your group collections in one place
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 sm:px-10">
                            {isLoading ? (
                                <div className="text-center py-16">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0dccf2] mx-auto"></div>
                                    <p className="mt-4 text-[#495057]">Loading your collections...</p>
                                </div>
                            ) : funds.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200"
                                >
                                    <div className="text-6xl mb-6 text-[#0dccf2]">
                                        <FaBullseye />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[#111718] mb-4">Start Your First Collection</h2>
                                    <p className="text-[#495057] mb-8 max-w-md mx-auto">
                                        Create your first fund to collect contributions from your community with complete transparency
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => router.push('/create-fund')}
                                        className="inline-flex items-center justify-center px-6 py-3 bg-[#0dccf2] text-white text-base font-bold rounded-lg hover:bg-[#0bb8d9] shadow-lg transition-all duration-200"
                                    >
                                        <FaPlus className="mr-2" />
                                        Create Your First Fund
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <>
                                    {/* Stats Overview */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl text-blue-600">
                                                    <FaChartBar />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#111718]">Total Funds</p>
                                                    <p className="text-2xl font-bold text-blue-600">{funds.length}</p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl text-green-600">
                                                    <FaCheckCircle />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#111718]">Active</p>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {funds.filter(f => f.status === 'active').length}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl text-purple-600">
                                                    <FaMoneyBillWave />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#111718]">Total Raised</p>
                                                    <p className="text-lg font-bold text-purple-600 flex items-center">
                                                        <FaRupeeSign className="text-sm mr-1" />
                                                        {funds.reduce((sum, fund) => sum + fund.currentAmount, 0).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl text-orange-600">
                                                    <FaBullseye />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#111718]">Avg Progress</p>
                                                    <p className="text-2xl font-bold text-orange-600">
                                                        {Math.round(funds.reduce((sum, fund) => {
                                                            if (!fund.goal) return sum;
                                                            return sum + (fund.currentAmount / fund.goal * 100);
                                                        }, 0) / funds.filter(f => f.goal).length) || 0}%
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Funds Grid */}
                                    <motion.div
                                        variants={container}
                                        initial="hidden"
                                        animate="show"
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4"
                                    >
                                        {funds.map((fund, index) => (
                                            <motion.div
                                                key={fund._id}
                                                variants={item}
                                                whileHover={{ scale: 1.03, y: -5 }}
                                                className="group"
                                            >
                                                <LoadingLink href={`/fund/${fund.slug}`}>
                                                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-[#0dccf2]/30 overflow-hidden relative">
                                                        {/* Status Badge */}
                                                        <div className="absolute top-4 right-4 flex items-center gap-2">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                fund.status === 'active' ? 'bg-green-100 text-green-700' :
                                                                fund.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}>
                                                                {fund.status.charAt(0).toUpperCase() + fund.status.slice(1)}
                                                            </span>
                                                            {canDeleteFund && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        handleDeleteFund(fund._id, fund.title);
                                                                    }}
                                                                    disabled={deletingFundId === fund._id}
                                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                                                                >
                                                                    {deletingFundId === fund._id ? (
                                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                                                                    ) : (
                                                                        <FaTrash className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </div>



                                                        {/* Fund Title */}
                                                        <h3 className="text-xl font-bold text-[#111718] group-hover:text-[#0dccf2] transition-colors duration-200 mb-3 pr-16">
                                                            {escapeHtml(fund.title)}
                                                        </h3>

                                                        {/* Description */}
                                                        {fund.description && (
                                                            <p className="text-[#495057] mb-4 line-clamp-2 text-sm leading-relaxed">
                                                                {escapeHtml(fund.description)}
                                                            </p>
                                                        )}

                                                        {/* Progress Section */}
                                                        <div className="space-y-3 mb-4">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm text-[#60838a]">Goal</span>
                                                                <span className="font-semibold text-[#111718] flex items-center text-sm">
                                                                    <FaRupeeSign className="text-xs mr-1" />
                                                                    {fund.goal ? fund.goal.toLocaleString() : 'No Goal Set'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm text-[#60838a]">Raised</span>
                                                                <span className="font-bold text-[#0dccf2] flex items-center text-sm">
                                                                    <FaRupeeSign className="text-xs mr-1" />
                                                                    {fund.currentAmount.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            
                                                            {fund.goal && (
                                                                <div className="relative pt-2">
                                                                    <div className="flex mb-2 items-center justify-between">
                                                                        <span className="text-xs font-bold text-[#0dccf2]">
                                                                            {Math.round((fund.currentAmount / fund.goal) * 100)}% Complete
                                                                        </span>
                                                                    </div>
                                                                    <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                                                                        <motion.div
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: `${Math.min((fund.currentAmount / fund.goal) * 100, 100)}%` }}
                                                                            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                                                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#0dccf2] to-[#7928CA]"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="text-xs text-[#60838a] pt-4 border-t border-gray-200 flex justify-between items-center">
                                                            <span>Created {new Date(fund.createdAt).toLocaleDateString()}</span>
                                                            <span className="text-[#0dccf2] font-medium">View Details →</span>
                                                        </div>
                                                    </div>
                                                </LoadingLink>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                onClick={() => router.push('/create-fund')}
                aria-label="Create new fund"
                className="fixed right-6 bottom-24 bg-gradient-to-r from-[#0dccf2] to-[#0bb8d9] hover:from-[#0bb8d9] hover:to-[#0aa5c6] text-white rounded-full p-4 shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl z-40"
            >
                <FaPlus className="h-6 w-6" />
            </motion.button>
        </div>
    );
} 