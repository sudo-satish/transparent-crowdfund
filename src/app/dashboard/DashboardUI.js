'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlus, FaRupeeSign, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { escapeHtml } from '@/utils/helper';

const canDeleteFund = process.env.NODE_ENV === 'development';

export default function DashboardUI() {

    const [funds, setFunds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingFundId, setDeletingFundId] = useState(null);

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await fetch("/api/funds");
                const data = await response.json();
                console.log(data);
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-800">My Funds</h1>
                    <Link href="/create-fund">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105">
                            <FaPlus className="mr-2" />
                            Create Fund
                        </Button>
                    </Link>
                </motion.div>

                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading funds...</p>
                    </div>
                ) : funds.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">No funds created yet</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">Start by creating your first fund to collect contributions from your community</p>
                        <Link href="/create-fund">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105">
                                Create Your First Fund
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {funds.map((fund) => (
                            <motion.div
                                key={fund._id}
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                className="group"
                            >
                                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <Link
                                                href={`/fund/${fund.slug}`}
                                                className="flex-1"
                                            >
                                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                                                    {escapeHtml(fund.title)}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${fund.status === 'active' ? 'bg-green-100 text-green-700' :
                                                    fund.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {fund.status.charAt(0).toUpperCase() + fund.status.slice(1)}
                                                </span>
                                                {
                                                    canDeleteFund && (
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
                                                    )
                                                }

                                            </div>
                                        </div>

                                        {fund.description && (
                                            <p className="text-gray-600 mb-6 line-clamp-2 min-h-[3rem]">
                                                {escapeHtml(fund.description)}
                                            </p>
                                        )}

                                        <div className="space-y-4">
                                            {
                                                fund.goal && (
                                                    <>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-500">Goal</span>
                                                            <span className="font-medium text-gray-800 flex items-center">
                                                                <FaRupeeSign className="text-xs mr-1" />
                                                                {fund.goal.toLocaleString()}
                                                            </span>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-500">Raised</span>
                                                            <span className="font-medium text-gray-800 flex items-center">
                                                                <FaRupeeSign className="text-xs mr-1" />
                                                                {fund.currentAmount.toFixed(2).toLocaleString()}
                                                            </span>
                                                        </div>

                                                        <div className="relative pt-1">
                                                            <div className="flex mb-2 items-center justify-between">
                                                                <div>
                                                                    <span className="text-xs font-semibold inline-block text-indigo-600">
                                                                        {Math.round((fund.currentAmount / fund.goal) * 100)}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${(fund.currentAmount / fund.goal) * 100}%` }}
                                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>)
                                            }

                                            <div className="text-xs text-gray-500 mt-2">
                                                Created {new Date(fund.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
} 