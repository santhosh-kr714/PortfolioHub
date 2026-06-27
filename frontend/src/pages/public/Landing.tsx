import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layout, Zap, Globe } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">P</div>
            <span className="font-bold text-xl tracking-tight">PortfolioHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link to="/features" className="hover:text-white transition-colors">Features</Link>
            <Link to="/templates" className="hover:text-white transition-colors">Templates</Link>
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30">100% Free</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</Link>
            <Link to="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>The new standard for developer portfolios</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
          >
            Build your portfolio <br/> for free. Forever.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Create an Awwwards-winning portfolio instantly. Connect your GitHub, choose a premium template, and go live on your own custom domain. No premium tiers. No credit card required.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
              Start building for free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/johndoe" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
              View live demo
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Preview Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-6xl mx-auto mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#0a0a0a]">
            {/* Mockup Top Bar */}
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-black/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Mockup Content area */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8">
               <div className="grid grid-cols-3 gap-6 w-full h-full opacity-50">
                  <div className="col-span-1 rounded-xl bg-white/5 border border-white/10" />
                  <div className="col-span-2 space-y-6">
                    <div className="h-1/3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10" />
                    <div className="h-2/3 grid grid-cols-2 gap-6">
                      <div className="rounded-xl bg-white/5 border border-white/10" />
                      <div className="rounded-xl bg-white/5 border border-white/10" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Layout className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Templates</h3>
              <p className="text-gray-400">Choose from meticulously crafted templates inspired by top-tier tech companies. Fully customizable.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Updates</h3>
              <p className="text-gray-400">Update your projects or skills in the dashboard and see them reflected on your live site instantly.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">SEO Optimized</h3>
              <p className="text-gray-400">Automatic meta tags, sitemaps, and optimized performance to ensure you rank on Google.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
