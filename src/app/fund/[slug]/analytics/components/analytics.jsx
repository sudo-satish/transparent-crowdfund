'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { convertToIndianCurrency } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { FaChartLine, FaMoneyBillWave,FaRupeeSign,FaWallet,FaExclamationTriangle, FaChartBar, FaChartPie, FaClipboardList, FaHandHoldingHeart } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { escapeHtml } from '@/utils/helper';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Add useWindowSize hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount

  return windowSize;
}

export default function Analytics({ transactions, summary, fund }) {
  const router = useRouter();
  const { width } = useWindowSize();

  // Process transactions data for monthly chart
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()}`;

    if (!acc[monthYear]) {
      acc[monthYear] = {
        received: 0,
        spent: 0,
        balance: 0,
      };
    }

    if (transaction.transactionType === 'credit') {
      acc[monthYear].received += transaction.amount;
    } else {
      acc[monthYear].spent += transaction.amount;
    }

    acc[monthYear].balance = acc[monthYear].received - acc[monthYear].spent;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    ...data,
  }));

  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Total Received', value: summary.totalCredited || 0 },
    { name: 'Total Spent', value: summary.totalDebited || 0 },
  ];

  const COLORS = ['#0dccf2', '#7928CA'];

  // Calculate pie chart radius based on window width
  const pieChartRadius = width < 640 ? 80 : 120;

  // Calculate additional stats
  const totalTransactions = transactions.length;
  const largestTransaction = transactions.reduce((max, t) => t.amount > max ? t.amount : max, 0);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white text-[#111718] font-display overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            {/* Space for overlay navbar */}
            <div className="h-20"></div>

            {/* Header Section */}
            <div className="px-6 sm:px-10 mb-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-4"
              >
                <button
                  onClick={() => router.back()}
                  aria-label="Back to fund"
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
                  <FaChartLine className='text-4xl text-[#0dccf2]' />
                </motion.div>
                <div>
                  <h1 className="text-[#111718] text-2xl sm:text-3xl font-bold leading-tight">
                    Fund Analytics: {fund.title}
                  </h1>
                    <div className="flex items-start gap-3">
                      <p className="text-[#495057] text-base leading-relaxed">
                        Detailed insights into your collection performance
                      </p>
                    </div>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-10 space-y-8">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 rounded-lg border border-green-200 p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg text-green-600">
                      <FaMoneyBillWave />
                    </div>
                    <h3 className="text-sm font-semibold text-[#111718]">Total Received</h3>
                  </div>
                  <p className="text-xl font-semibold text-green-600">
                    {convertToIndianCurrency(summary.totalCredited || 0)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                    className="bg-red-50 rounded-lg border border-red-200 p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                      <FaRupeeSign className="text-red-600 text-lg" />
                        <h2 className="text-sm font-semibold text-[#111718]">
                            Total Spent
                        </h2>
                  </div>
                  <p className="text-xl font-semibold text-red-600">
                    {convertToIndianCurrency(summary.totalDebited || 0)}
                  </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-lg border p-4 hover:shadow-md transition-all duration-300 ${
                      summary.totalBalance >= 0 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-orange-50 border-orange-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {summary.totalBalance >= 0 ? (
                        <FaWallet className="text-blue-600 text-lg" />
                      ) : (
                        <FaExclamationTriangle className="text-orange-600 text-lg" />
                      )}
                      <h2 className="text-sm font-semibold text-[#111718]">
                        Current Balance
                      </h2>
                    </div>
                    <p className={`text-xl font-semibold ${
                      summary.currentBalance >= 0 ? "text-blue-600" : "text-orange-600"
                    }`}>
                      {convertToIndianCurrency(summary.totalBalance || 0)}
                    </p>
                  </motion.div>
              </div>

              {/* Additional Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl text-[#111718]">
                    <FaClipboardList />
                  </div>
                  <h2 className="text-xl font-bold text-[#111718]">
                    Quick Stats
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-[#60838a] mb-1">Transactions</p>
                    <p className="text-lg font-bold text-[#0dccf2]">
                      {totalTransactions}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-[#60838a] mb-1">Largest Transaction</p>
                    <p className="text-lg font-bold text-green-600">
                      {convertToIndianCurrency(largestTransaction)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-[#60838a] mb-1">Contributors</p>
                    <p className="text-lg font-bold text-purple-600">
                      {summary.contributorCount || 0}
                    </p>
                  </div>
                
                </div>
              </motion.div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl text-[#0dccf2]">
                      <FaChartBar />
                    </div>
                    <h2 className="text-xl font-bold text-[#111718]">
                      Monthly Overview
                    </h2>
                  </div>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 12, fill: '#60838a' }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          interval={0}
                        />
                        <YAxis
                          tickFormatter={(value) => convertToIndianCurrency(value)}
                          tick={{ fontSize: 12, fill: '#60838a' }}
                          width={100}
                        />
                        <Tooltip
                          formatter={(value) => convertToIndianCurrency(value)}
                          labelStyle={{ color: '#111718', fontWeight: 'bold' }}
                          contentStyle={{ 
                            fontSize: '14px', 
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                        <Bar
                          dataKey="received"
                          name="Received"
                          fill="#0dccf2"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="spent"
                          name="Spent"
                          fill="#7928CA"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl text-[#7928CA]">
                      <FaChartPie />
                    </div>
                    <h2 className="text-xl font-bold text-[#111718]">
                      Fund Distribution
                    </h2>
                  </div>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={pieChartRadius}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          labelStyle={{ fontSize: '12px', fontWeight: 'bold', fill: '#111718' }}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => convertToIndianCurrency(value)}
                          labelStyle={{ color: '#111718', fontWeight: 'bold' }}
                          contentStyle={{ 
                            fontSize: '14px',
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
