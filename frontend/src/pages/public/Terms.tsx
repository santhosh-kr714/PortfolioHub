import React from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/30 blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[120px] mix-blend-screen" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-white mt-12"
      >
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4 text-gray-300">
          <p>Last updated: June 26, 2026</p>
          <h2 className="text-xl font-semibold text-white mt-4">1. Acceptance of Terms</h2>
          <p>By accessing and using PortfolioHub, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">2. User Account</h2>
          <p>To use certain features of the service, you must register for an account. You agree to provide accurate information and keep it updated.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">3. Content</h2>
          <p>You retain all your ownership rights in your content, but you are required to grant us a limited license to use, store, and display that content.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">4. Prohibited Conduct</h2>
          <p>You agree not to engage in any prohibited conduct, including but not limited to violating laws, sending spam, or distributing malware.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">5. Termination</h2>
          <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever.</p>
        </div>
      </motion.div>
    </div>
  );
}
