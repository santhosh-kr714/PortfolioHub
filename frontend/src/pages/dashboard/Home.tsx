import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FolderGit2, 
  Award, 
  Eye, 
  CheckCircle, 
  Globe, 
  ExternalLink, 
  Copy, 
  MessageSquare, 
  Share2, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useAuthStore } from '../../store/useAuthStore';

const Twitter = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const navigate = useNavigate();
  const { user: authUser } = useAuthStore();
  const { profile, projects, skills, certificates, experience, education } = usePortfolioStore();

  const [publishStep, setPublishStep] = useState<'idle' | 'preview' | 'publishing' | 'success'>('idle');
  const [publishProgress, setPublishProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const isProfileEmpty = !profile?.full_name || profile.full_name === 'Your Name' || profile.full_name === '';

  // Calculate Profile Completion
  const getCompletionPercentage = () => {
    let score = 0;
    let max = 6;
    if (profile?.profile_image) score++;
    if (profile?.full_name && profile.full_name !== 'Your Name') score++;
    if (profile?.bio) score++;
    if (projects.length > 0) score++;
    if (skills.length > 0) score++;
    if (certificates.length > 0) score++;
    return Math.round((score / max) * 100);
  };

  const completion = getCompletionPercentage();

  // Simulated Publish flow
  useEffect(() => {
    if (publishStep === 'publishing') {
      setPublishProgress(10);
      const interval = setInterval(() => {
        setPublishProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setPublishStep('success');
              setIsPublished(true);
            }, 300);
            return 100;
          }
          return prev + 25;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [publishStep]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/${profile?.full_name?.toLowerCase().replace(/\s+/g, '') || authUser?.username || 'user'}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getPublicUrl = () => {
    return `${window.location.origin}/${profile?.full_name?.toLowerCase().replace(/\s+/g, '') || authUser?.username || 'user'}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
        <p className="text-sm text-gray-400">Welcome to your PortfolioHub workspace.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Completion and Actions */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-1 rounded-md">Setup Status</span>
                <h2 className="text-xl font-bold text-white">Profile Completion</h2>
                <p className="text-xs text-gray-400 max-w-sm">Complete all section forms to showcase a fully loaded professional profile.</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#3B82F6" strokeWidth="6" 
                            strokeDasharray={213}
                            strokeDashoffset={213 - (213 * completion) / 100}
                            className="transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute text-sm font-bold text-white">{completion}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/5">
              <button onClick={() => navigate('/dashboard/profile')} className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 transition-all text-xs font-semibold text-gray-300 hover:text-white">
                <User className="w-4 h-4 text-blue-400" /> Edit Profile
              </button>
              <button onClick={() => navigate('/dashboard/projects')} className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 transition-all text-xs font-semibold text-gray-300 hover:text-white">
                <FolderGit2 className="w-4 h-4 text-purple-400" /> Edit Projects
              </button>
              <button onClick={() => navigate('/dashboard/certificates')} className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl text-left border border-white/5 transition-all text-xs font-semibold text-gray-300 hover:text-white col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-yellow-400" /> Edit Certificates
              </button>
            </div>
          </div>

          {/* Quick Analytics Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-white">Portfolio Traffic</h3>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> Live
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-white">{isPublished ? '24' : '0'}</div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Total Views</div>
              </div>
              <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-white">{isPublished ? '18' : '0'}</div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Unique Visitors</div>
              </div>
              <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-white">{isPublished ? '3m 12s' : '0s'}</div>
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-1">Avg Duration</div>
              </div>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-purple-400" /> Recent Projects
              </h3>
              {projects.length === 0 ? (
                <p className="text-xs text-gray-500">No projects added yet.</p>
              ) : (
                <div className="space-y-3">
                  {projects.slice(0, 3).map(p => (
                    <div key={p.id} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                      <span className="text-gray-300 font-medium truncate pr-4">{p.title}</span>
                      <span className="text-gray-500 shrink-0">{p.tech_stack?.slice(0, 2).join(', ')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" /> Recent Certificates
              </h3>
              {certificates.length === 0 ? (
                <p className="text-xs text-gray-500">No certificates added yet.</p>
              ) : (
                <div className="space-y-3">
                  {certificates.slice(0, 3).map(c => (
                    <div key={c.id} className="flex justify-between items-center text-xs py-1 border-b border-white/5 last:border-0">
                      <span className="text-gray-300 font-medium truncate pr-4">{c.title}</span>
                      <span className="text-gray-500 shrink-0 truncate max-w-[80px]">{c.issuer}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Publish & Status Side Card */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <h3 className="font-bold text-white">Publishing</h3>
              </div>
              
              <div className="p-4 bg-black/20 border border-white/5 rounded-2xl space-y-3">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <span>Status:</span>
                  <span className={isPublished ? "text-emerald-400" : "text-yellow-500"}>
                    {isPublished ? 'Live & Public' : 'Draft'}
                  </span>
                </div>
                {isPublished && (
                  <a 
                    href={getPublicUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    View site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => setPublishStep('preview')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Publish Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Publish Flow Modal */}
      <AnimatePresence>
        {publishStep !== 'idle' && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0c0c] border border-white/10 rounded-3xl w-full max-w-md p-6 overflow-hidden relative"
            >
              {/* Close Button */}
              {publishStep !== 'publishing' && (
                <button 
                  onClick={() => setPublishStep('idle')}
                  className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Step 1: Preview checklist */}
              {publishStep === 'preview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Publish Checklist</h3>
                    <p className="text-xs text-gray-400">Review your portfolio components before making them public.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 text-sm">
                      <CheckCircle className={`w-5 h-5 ${!isProfileEmpty ? 'text-emerald-400' : 'text-gray-600'}`} />
                      <span className="text-white">Profile Details {!isProfileEmpty ? '' : '(Incomplete)'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 text-sm">
                      <CheckCircle className={`w-5 h-5 ${projects.length > 0 ? 'text-emerald-400' : 'text-gray-600'}`} />
                      <span className="text-white">Selected Works ({projects.length})</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 text-sm">
                      <CheckCircle className={`w-5 h-5 ${skills.length > 0 ? 'text-emerald-400' : 'text-gray-600'}`} />
                      <span className="text-white">Technical Skills ({skills.length})</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPublishStep('publishing')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors mt-2"
                  >
                    Confirm & Publish
                  </button>
                </div>
              )}

              {/* Step 2: Publishing animation */}
              {publishStep === 'publishing' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <Globe className="w-12 h-12 text-blue-500 animate-pulse" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Publishing your portfolio...</h3>
                    <p className="text-xs text-gray-500 mt-1">Generating site assets and custom URLs</p>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${publishProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Success Screen */}
              {publishStep === 'success' && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Portfolio Published! 🎉</h3>
                    <p className="text-xs text-gray-400">Your site is now publicly available for everyone to see.</p>
                  </div>

                  <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between text-xs text-gray-300">
                    <span className="truncate pr-4 select-all">{getPublicUrl()}</span>
                    <button 
                      onClick={handleCopyLink}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" /> {isCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center pt-2">
                    <a 
                      href={getPublicUrl()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open Site
                    </a>
                    <button 
                      onClick={handleCopyLink}
                      className="flex items-center justify-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share Site
                    </button>
                  </div>

                  {/* Share on Socials */}
                  <div className="pt-4 border-t border-white/5 flex justify-center gap-6 text-gray-400">
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getPublicUrl())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      title="Share on X / Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getPublicUrl())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getPublicUrl())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      title="Share on WhatsApp"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
