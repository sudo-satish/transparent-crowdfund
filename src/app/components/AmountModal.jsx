'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaRupeeSign, FaTimes } from 'react-icons/fa';

export default function AmountModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && parseFloat(amount) > 0) {
      onSubmit(parseFloat(amount));
      setAmount('');
    }
  };

  const handleClose = () => {
    setAmount('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Enter Contribution Amount
              </h2>
              <button
                onClick={handleClose}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='amount'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Amount (₹)
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaRupeeSign className='text-gray-400' />
                  </div>
                  <input
                    type='number'
                    id='amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min='1'
                    step='0.01'
                    required
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 text-gray-900'
                    placeholder='Enter amount'
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  type='button'
                  onClick={handleClose}
                  disabled={isLoading}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isLoading || !amount || parseFloat(amount) <= 0}
                  className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      Creating...
                    </>
                  ) : (
                    'Pay now'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
