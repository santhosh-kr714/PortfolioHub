import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, Copy, Check, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  contextData: any; // e.g., { role: 'Software Engineer', experience: '5 years' }
  onApply: (generatedText: string) => void;
}

export default function AIGeneratorModal({ isOpen, onClose, title, contextData, onApply }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState('Professional');

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult('');
    
    // Simulate streaming SSE response
    const mockResponse = `As a dedicated software professional, I specialize in building highly scalable, accessible, and performant web applications. With a strong foundation in modern JavaScript frameworks and a passion for crafting seamless user experiences, I bridge the gap between design and technical implementation.`;
    
    let currentIndex = 0;
    const words = mockResponse.split(' ');
    
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setResult((prev) => prev + (prev ? ' ' : '') + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 50); // 50ms per word
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#0f0f0f] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bot className="w-6 h-6 text-purple-500" />
                {title}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex gap-4 mb-4">
                {['Professional', 'Friendly', 'Startup Founder', 'Technical'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      tone === t 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {!result && !isGenerating ? (
                <div className="text-center py-12">
                  <Bot className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                    Click generate to let AI write a highly optimized, {tone.toLowerCase()} bio based on your profile context.
                  </p>
                  <button 
                    onClick={handleGenerate}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-all mx-auto shadow-lg shadow-purple-500/20"
                  >
                    <Sparkles className="w-5 h-5" /> Generate Magic
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="min-h-[150px] p-6 bg-black/50 border border-white/10 rounded-2xl relative group">
                    <p className="text-gray-200 leading-relaxed text-lg">
                      {result}
                      {isGenerating && <span className="inline-block w-2 h-5 ml-1 bg-purple-500 animate-pulse" />}
                    </p>
                    
                    {!isGenerating && result && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button 
                          onClick={handleCopy}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                          title="Copy to clipboard"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {!isGenerating && result && (
                    <div className="flex justify-end gap-3 pt-4">
                      <button 
                        onClick={handleGenerate}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" /> Regenerate
                      </button>
                      <button 
                        onClick={() => {
                          onApply(result);
                          onClose();
                        }}
                        className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Apply to Profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
