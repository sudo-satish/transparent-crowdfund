'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HashLoader  } from 'react-spinners';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Auto-hide loading when pathname changes (navigation complete)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center gap-4 relative overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0dccf2] to-[#7928CA]"></div>
            
            {/* Custom spinner */}
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-[#0dccf2]"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-[#0dccf2]/30"></div>
            </div>
            
            <div className="text-center">
              <p className="text-[#111718] font-bold text-lg mb-1">Loading...</p>
              <p className="text-[#495057] text-sm">Please wait while we process your request</p>
            </div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};