'use client';

import { motion } from 'framer-motion';

export default function ContributorsCount({ contributors }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col items-center text-center'
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'
      >
        Contributors Count
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className='text-2xl sm:text-3xl font-bold text-indigo-600'
      >
        {contributors}
      </motion.p>
    </motion.div>
  );
}
