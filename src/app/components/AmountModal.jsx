'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaRupeeSign, FaTimes, FaUser } from 'react-icons/fa';

export default function AmountModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && parseFloat(amount) > 0) {
      onSubmit(parseFloat(amount), name.trim() || 'Anonymous');
      setAmount('');
      setName('');
    }
  };

  const handleClose = () => {
    setAmount('');
    setName('');
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
            className='bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-8 relative overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient background accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0dccf2] to-[#7928CA]"></div>
            <div className='flex justify-between items-center mb-8'>
              <div>
                <h2 className='text-2xl font-bold text-[#111718] mb-1'>
                  Enter Contribution Details
                </h2>
                <p className="text-[#495057] text-sm">
                  Support this cause with your contribution
                </p>
              </div>
              <button
                onClick={handleClose}
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

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className="block text-sm font-bold text-[#111718] mb-3"
                >
                  Your Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                  placeholder='Enter your name'
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor='amount'
                  className="block text-sm font-bold text-[#111718] mb-3"
                >
                  Amount (₹)
                </label>
                <input
                  type='number'
                  id='amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min='1'
                  step='0.01'
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0dccf2]/20 focus:border-[#0dccf2] transition-all duration-200 outline-none text-[#111718] placeholder-[#495057] bg-gray-50 focus:bg-white"
                  placeholder='Enter amount'
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type='button'
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-6 py-3 text-sm font-medium text-[#495057] bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 border border-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={
                    isLoading ||
                    !amount ||
                    parseFloat(amount) <= 0 ||
                    !name.trim()
                  }
                  className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0dccf2] to-[#0bb8d9] hover:from-[#0bb8d9] hover:to-[#0aa5c6] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white'></div>
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
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
