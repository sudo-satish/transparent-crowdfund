'use client';

import { motion } from 'framer-motion';
import { convertToIndianCurrency, formatDate } from '@/utils/helper';
import { useRouter } from 'next/navigation';

export default function Transactions({ transactions, summary }) {
  const router = useRouter();
  const currentBalance = summary.total_balance;

  const exportToCSV = () => {
    // Prepare CSV content
    const headers = ['Date', 'Type', 'Contact', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map((t) =>
        [
          formatDate(t.date),
          t.transaction_type === 'credit' ? 'Received' : 'Spent',
          t.contact.replace(/^91/, '+91'),
          convertToIndianCurrency(t.amount).replace(/[₹,]/g, ''), // Remove ₹ and commas for clean number format
        ].join(',')
      ),
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `shyam_colony_transactions_${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>
          Daily Transaction (Shyam Colony)
        </h1>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-green-50 p-3 md:p-6 rounded-lg shadow-sm'
          >
            <h2 className='text-sm md:text-lg font-semibold text-green-800'>
              Total Received
            </h2>
            <p className='text-lg md:text-2xl font-bold text-green-600'>
              {convertToIndianCurrency(summary.total_credited)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-red-50 p-3 md:p-6 rounded-lg shadow-sm'
          >
            <h2 className='text-sm md:text-lg font-semibold text-red-800'>
              Total Spent
            </h2>
            <p className='text-lg md:text-2xl font-bold text-red-600'>
              {convertToIndianCurrency(summary.total_debited || 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-3 md:p-6 rounded-lg shadow-sm ${
              currentBalance >= 0 ? 'bg-blue-50' : 'bg-orange-50'
            }`}
          >
            <h2
              className={`text-sm md:text-lg font-semibold ${
                currentBalance >= 0 ? 'text-blue-800' : 'text-orange-800'
              }`}
            >
              Current Balance
            </h2>
            <p
              className={`text-lg md:text-2xl font-bold ${
                currentBalance >= 0 ? 'text-blue-600' : 'text-orange-600'
              }`}
            >
              {convertToIndianCurrency(currentBalance || 0)}
            </p>
          </motion.div>
        </div>

        {/* Transactions List */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Recent Transactions
            </h2>
            <div className='flex gap-3'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/analytics')}
                className='px-2 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition-colors'
              >
                View Analytics
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={exportToCSV}
                className='px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors'
              >
                Export to CSV
              </motion.button>
            </div>
          </div>
          <div className='space-y-4'>
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${
                  transaction.transaction_type === 'credit'
                    ? 'bg-green-50'
                    : 'bg-red-50'
                }`}
              >
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='font-medium text-gray-800'>
                      {transaction.contact}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <p
                    className={`font-bold ${
                      transaction.transaction_type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.transaction_type === 'credit' ? '+' : '-'}
                    {convertToIndianCurrency(transaction.amount)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
