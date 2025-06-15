'use client';

import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { convertToIndianCurrency } from '@/utils/helper';

export default function TopContributors({ contributor }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      className='bg-white rounded-lg shadow-sm p-6 mb-6'
    >
      <div className='flex items-center gap-2 mb-4'>
        <FaCrown className='text-yellow-500' />
        <h2 className='text-xl font-semibold text-gray-800'>Top Contributor</h2>
      </div>

      <div className='space-y-4'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
        >
          <div className='flex items-center gap-3'>
            <div>
              <p className='font-medium text-gray-800'>{contributor._id}</p>
            </div>
          </div>
          <div className='flex items-center gap-1 text-green-600 font-semibold'>
            <span>{convertToIndianCurrency(contributor.totalAmount)}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
