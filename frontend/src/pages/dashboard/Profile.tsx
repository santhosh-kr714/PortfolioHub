import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Camera, MapPin, Phone, Mail, Globe, Sparkles, User, Info, Link as LinkIcon, Share2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import AIGeneratorModal from '../../components/ai/AIGeneratorModal';
import ImageUpload from '../../components/common/ImageUpload';
import AutosaveStatus from '../../components/common/AutosaveStatus';

type TabType = 'basic' | 'about' | 'contact' | 'social';

export default function Profile() {
  const { user: authUser } = useAuthStore();
  const { profile, updateProfile, socialLinks, setSocialLinks } = usePortfolioStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      full_name: profile?.full_name || authUser?.full_name || '',
      headline: profile?.headline || authUser?.headline || '',
      bio: profile?.bio || authUser?.bio || '',
      location: profile?.location || 'New York, USA',
      phone: profile?.phone || '',
      website: profile?.website || '',
      availability: profile?.availability || 'Available for freelance',
      profile_image: profile?.profile_image || '',
      cover_image: profile?.cover_image || '',
    }
  });

  const headline = watch('headline');
  const allValues = watch();

  // Autosave with 800ms debounce
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      updateProfile(allValues);
      setIsSaving(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [allValues, updateProfile]);

  // Social Links mapping (GitHub, LinkedIn, Twitter)
  const getSocialUrl = (platform: string) => {
    const link = socialLinks.find(l => l.platform.toLowerCase() === platform.toLowerCase());
    return link ? link.url : '';
  };

  const handleSocialChange = (platform: string, url: string) => {
    const existing = socialLinks.find(l => l.platform.toLowerCase() === platform.toLowerCase());
    if (existing) {
      setSocialLinks(socialLinks.map(l => l.platform.toLowerCase() === platform.toLowerCase() ? { ...l, url } : l));
    } else {
      setSocialLinks([...socialLinks, { id: Date.now().toString() + platform, platform, url, username: '' }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Profile</h1>
          <p className="text-sm text-gray-400">Manage your digital presence and contact info.</p>
        </div>
        <AutosaveStatus saving={isSaving} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-px">
        {[
          { id: 'basic', label: 'Basic Info', icon: User },
          { id: 'about', label: 'About', icon: Info },
          { id: 'contact', label: 'Contact', icon: Mail },
          { id: 'social', label: 'Social Links', icon: Share2 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                isActive 
                  ? 'border-blue-500 text-white bg-white/5 rounded-t-xl' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 rounded-t-xl'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md">
        <form onSubmit={e => e.preventDefault()} className="space-y-6">
          
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Cover Photo</label>
                <ImageUpload 
                  value={watch('cover_image')} 
                  onChange={(url) => setValue('cover_image', url)} 
                  aspectRatio="banner"
                  label="Upload Cover Image"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center sm:text-left">Profile Image</label>
                  <ImageUpload 
                    value={watch('profile_image')} 
                    onChange={(url) => setValue('profile_image', url)} 
                    aspectRatio="square"
                    label="Upload Avatar"
                  />
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      {...register('full_name')}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Professional Headline</label>
                    <input
                      type="text"
                      {...register('headline')}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="e.g. Senior Creative Technologist"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Availability Status</label>
                <select
                  {...register('availability')}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                >
                  <option value="Available for freelance">Available for freelance</option>
                  <option value="Open to full-time roles">Open to full-time roles</option>
                  <option value="Not looking for work">Not looking for work</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Short Intro (Bio)</label>
                  <button 
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-1 rounded-lg uppercase tracking-wider transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Write with AI
                  </button>
                </div>
                <textarea
                  {...register('bio')}
                  rows={6}
                  placeholder="Describe your passion, your specialization, and what sets you apart..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Location</label>
                <input
                  type="text"
                  {...register('location')}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address (Auth)</label>
                <input
                  type="email"
                  value={authUser?.email || ''}
                  disabled
                  className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Personal Website</label>
                <input
                  type="url"
                  {...register('website')}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="https://johndoe.com"
                />
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">GitHub Profile URL</label>
                <input
                  type="url"
                  value={getSocialUrl('GitHub')}
                  onChange={(e) => handleSocialChange('GitHub', e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={getSocialUrl('LinkedIn')}
                  onChange={(e) => handleSocialChange('LinkedIn', e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Twitter / X URL</label>
                <input
                  type="url"
                  value={getSocialUrl('Twitter')}
                  onChange={(e) => handleSocialChange('Twitter', e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          )}

        </form>
      </div>

      <AIGeneratorModal 
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="AI Bio Generator"
        contextData={{ headline }}
        onApply={(text) => setValue('bio', text)}
      />
    </div>
  );
}
