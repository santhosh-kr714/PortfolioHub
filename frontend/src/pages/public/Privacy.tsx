import React from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-gray-300">
          <p>Last updated: June 26, 2026</p>
          <h2 className="text-xl font-semibold text-white mt-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create or modify your account, use our services, or communicate with us.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect PortfolioHub and our users.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">3. Information Sharing</h2>
          <p>We do not share your personal information with companies, organizations, or individuals outside of PortfolioHub except in specific circumstances like legal requirements.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">4. Data Security</h2>
          <p>We work hard to protect PortfolioHub and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.</p>
          
          <h2 className="text-xl font-semibold text-white mt-4">5. Changes</h2>
          <p>Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page.</p>
        </div>
      </motion.div>
    </div>
  );
}
