'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHeart, FaRupeeSign, FaArrowRight, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { useLoading } from '@/app/components/LoadingProvider';

export default function CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setIsLoading } = useLoading();
    const [countdown, setCountdown] = useState(5);
    const [showRedirect, setShowRedirect] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('success'); // success, failed, pending

    // Get parameters from URL
    const fundSlug = searchParams.get('fund_slug') || searchParams.get('fundId') || '';

    const razorpayPaymentId = searchParams.get('razorpay_payment_id');
    const razorpayPaymentLinkId = searchParams.get('razorpay_payment_link_id');
    const razorpayPaymentLinkReferenceId = searchParams.get('razorpay_payment_link_reference_id');
    const razorpayPaymentLinkStatus = searchParams.get('razorpay_payment_link_status');

    useEffect(() => {
        // Determine payment status based on URL parameters
        if (razorpayPaymentLinkStatus === 'paid') {
            setPaymentStatus('success');
        } else if (razorpayPaymentLinkStatus === 'cancelled') {
            setPaymentStatus('failed');
        } else if (razorpayPaymentLinkStatus === 'pending') {
            setPaymentStatus('pending');
        }

        // Start countdown after 2 seconds
        const timer = setTimeout(() => {
            setShowRedirect(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [razorpayPaymentLinkStatus]);

    useEffect(() => {
        if (!showRedirect) return;

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Show loading and redirect based on payment status
                    setIsLoading(true);
                    if (paymentStatus === 'success' && fundSlug) {
                        router.push(`/fund/${fundSlug}`);
                    } else {
                        router.push('/dashboard');
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showRedirect, countdown, router, fundSlug, paymentStatus, setIsLoading]);

    const getStatusConfig = () => {
        switch (paymentStatus) {
            case 'success':
                return {
                    icon: FaCheckCircle,
                    iconColor: 'text-green-600',
                    bgColor: 'bg-green-100',
                    title: 'Payment Successful!',
                    message: 'Your contribution has been successfully processed.',
                    statusText: 'Payment completed!',
                    statusColor: 'text-green-600',
                    buttonText: 'Continue to Fund',
                    gradient: 'from-green-400 via-blue-500 to-indigo-600'
                };
            case 'failed':
                return {
                    icon: FaTimesCircle,
                    iconColor: 'text-red-600',
                    bgColor: 'bg-red-100',
                    title: 'Payment Failed',
                    message: 'Your payment could not be processed. Please try again.',
                    statusText: 'Payment failed',
                    statusColor: 'text-red-600',
                    buttonText: 'Try Again',
                    gradient: 'from-red-400 via-orange-500 to-yellow-600'
                };
            case 'pending':
                return {
                    icon: FaExclamationTriangle,
                    iconColor: 'text-yellow-600',
                    bgColor: 'bg-yellow-100',
                    title: 'Payment Pending',
                    message: 'Your payment is being processed. Please wait.',
                    statusText: 'Payment pending',
                    statusColor: 'text-yellow-600',
                    buttonText: 'Check Status',
                    gradient: 'from-yellow-400 via-orange-500 to-red-600'
                };
            default:
                return {
                    icon: FaCheckCircle,
                    iconColor: 'text-green-600',
                    bgColor: 'bg-green-100',
                    title: 'Thank You!',
                    message: 'Your contribution has been successfully processed.',
                    statusText: 'Payment completed!',
                    statusColor: 'text-green-600',
                    buttonText: 'Continue to Fund',
                    gradient: 'from-green-400 via-blue-500 to-indigo-600'
                };
        }
    };

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${statusConfig.gradient}`}></div>

                    {/* Status icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                        className="mb-6"
                    >
                        <div className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                            <StatusIcon className={`text-4xl ${statusConfig.iconColor}`} />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-2xl font-bold text-gray-800 mb-4"
                    >
                        {statusConfig.title}
                    </motion.h1>

                    {/* Message */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-gray-600 mb-6"
                    >
                        {statusConfig.message}
                        <br />
                        <span className={`font-medium ${statusConfig.statusColor}`}>
                            {statusConfig.statusText}
                        </span>
                    </motion.p>

                    {/* Payment details */}
                    {razorpayPaymentId && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="bg-gray-50 rounded-lg p-4 mb-6"
                        >
                            <div className="text-sm text-gray-600">
                                <div className="flex justify-between items-center mb-2">
                                    <span>Payment ID:</span>
                                    <span className="font-mono text-xs">{razorpayPaymentId}</span>
                                </div>
                                {razorpayPaymentLinkId && (
                                    <div className="flex justify-between items-center">
                                        <span>Link ID:</span>
                                        <span className="font-mono text-xs">{razorpayPaymentLinkId}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Celebration animation for success */}
                    {paymentStatus === 'success' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="flex justify-center gap-2 mb-6"
                        >
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, y: 0 }}
                                    animate={{ scale: [0, 1.2, 1], y: [0, -10, 0] }}
                                    transition={{
                                        delay: 1.2 + i * 0.1,
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatDelay: 2
                                    }}
                                >
                                    <FaHeart className="text-pink-500 text-xl" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Redirect message */}
                    {showRedirect && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-blue-50 rounded-lg p-4 mb-6"
                        >
                            <div className="flex items-center justify-center gap-2 text-blue-700">
                                <FaArrowRight className="text-sm" />
                                <span className="text-sm font-medium">
                                    Redirecting in {countdown} seconds...
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* Action buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="space-y-3"
                    >
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                if (paymentStatus === 'success' && fundSlug) {
                                    router.push(`/fund/${fundSlug}`);
                                } else {
                                    router.push('/dashboard');
                                }
                            }}
                            className={`w-full bg-gradient-to-r ${statusConfig.gradient} text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaRupeeSign className="text-sm" />
                                <span>{statusConfig.buttonText}</span>
                                <FaArrowRight className="text-sm" />
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                setIsLoading(true);
                                router.push('/dashboard');
                            }}
                            className="w-full bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                        >
                            Go to Dashboard
                        </button>
                    </motion.div>

                    {/* Floating particles for success */}
                    {paymentStatus === 'success' && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}