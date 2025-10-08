'use client';

import { convertToIndianCurrency } from '@/utils/helper';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  FaTimes,
  FaUniversity,
  FaUser,
  FaCreditCard,
  FaRupeeSign,
} from 'react-icons/fa';

export default function RedeemModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  currentBalance,
}) {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      accountHolderName.trim() &&
      accountNumber.trim() &&
      ifscCode.trim() &&
      amount
    ) {
      onSubmit({
        accountHolderName: accountHolderName.trim(),
        accountNumber: accountNumber.trim(),
        ifscCode: ifscCode.trim().toUpperCase(),
        amount: parseFloat(amount),
      });
    }
  };

  const handleClose = () => {
    setAccountHolderName('');
    setAccountNumber('');
    setIfscCode('');
    setAmount('');
    onClose();
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      const numValue = parseFloat(value) || 0;
      if (numValue <= currentBalance) {
        setAmount(value);
      }
    }
  };

  const isAmountValid =
    amount && parseFloat(amount) > 0 && parseFloat(amount) <= currentBalance;

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
                Redeem Funds
              </h2>
              <button
                onClick={handleClose}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className='mb-4 p-3 bg-blue-50 rounded-lg'>
              <p className='text-sm text-blue-800'>
                <strong>Available for redemption:</strong>
                {convertToIndianCurrency(currentBalance)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='amount'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Amount to Redeem
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaRupeeSign className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='amount'
                    value={amount}
                    onChange={handleAmountChange}
                    required
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-900'
                    placeholder='Enter amount to redeem'
                    disabled={isLoading}
                  />
                </div>
                {amount && !isAmountValid && (
                  <p className='text-red-500 text-xs mt-1'>
                    Amount must be greater than 0 and less than or equal to{' '}
                    {convertToIndianCurrency(currentBalance)}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='accountHolderName'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Account Holder Name
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaUser className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='accountHolderName'
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    required
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-900'
                    placeholder='Enter account holder name'
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='accountNumber'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Account Number
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaCreditCard className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='accountNumber'
                    value={accountNumber}
                    onChange={(e) =>
                      setAccountNumber(e.target.value.replace(/\D/g, ''))
                    }
                    required
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-900'
                    placeholder='Enter account number'
                    disabled={isLoading}
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='ifscCode'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  IFSC Code
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FaUniversity className='text-gray-400' />
                  </div>
                  <input
                    type='text'
                    id='ifscCode'
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    required
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-900'
                    placeholder='Enter IFSC code'
                    disabled={isLoading}
                    maxLength={11}
                  />
                </div>
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={handleClose}
                  disabled={isLoading}
                  className='flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={
                    isLoading ||
                    !accountHolderName.trim() ||
                    !accountNumber.trim() ||
                    !ifscCode.trim() ||
                    !isAmountValid
                  }
                  className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isLoading ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      Processing...
                    </>
                  ) : (
                    'Redeem Funds'
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
