'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { convertToIndianCurrency } from '@/utils/helper';
import { useState, useEffect } from 'react';
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

export default function Analytics({ transactions, summary }) {
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

    if (transaction.transaction_type === 'credit') {
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
    { name: 'Total Received', value: summary.totalCredited },
    { name: 'Total Spent', value: summary.totalDebited || 0 },
  ];

  const COLORS = ['#22c55e', '#ef4444'];

  // Calculate pie chart radius based on window width
  const pieChartRadius = width < 640 ? 80 : 150;

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Transaction Analytics
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className='px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors'
          >
            Back to Transactions
          </motion.button>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          <div className='bg-white rounded-lg shadow-sm p-4 sm:p-6'>
            <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4'>
              Monthly Financial Overview
            </h2>
            <div className='h-[300px] sm:h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='month'
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor='end'
                    height={60}
                    interval={0}
                  />
                  <YAxis
                    tickFormatter={(value) => convertToIndianCurrency(value)}
                    tick={{ fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => convertToIndianCurrency(value)}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar
                    dataKey='received'
                    name='Total Received'
                    fill='#22c55e'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='spent'
                    name='Total Spent'
                    fill='#ef4444'
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey='balance'
                    name='Current Balance'
                    fill='#3b82f6'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className='bg-white rounded-lg shadow-sm p-4 sm:p-6'>
            <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4'>
              Transaction Distribution
            </h2>
            <div className='h-[300px] sm:h-[400px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={pieChartRadius}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelStyle={{ fontSize: '12px' }}
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
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
