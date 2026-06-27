import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Link as LinkIcon, Save, X, Code2, Briefcase, MessageCircle, Globe } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function SocialLinks() {
  const { socialLinks, setSocialLinks } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentLink, setCurrentLink] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLink.id) {
      setSocialLinks(socialLinks.map(l => l.id === currentLink.id ? currentLink : l));
    } else {
      setSocialLinks([...socialLinks, { ...currentLink, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setCurrentLink(null);
  };

  const handleDelete = (id: string) => {
    setSocialLinks(socialLinks.filter(l => l.id !== id));
  };

  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Code2 className="w-5 h-5" />;
      case 'linkedin': return <Briefcase className="w-5 h-5" />;
      case 'twitter': return <MessageCircle className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentLink?.id ? 'Edit Link' : 'New Link'}</h1>
            <p className="text-gray-400">Add a link to your social media or external profiles.</p>
          </div>
          <button 
            onClick={() => setIsEditing(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                required
                value={currentLink?.platform || 'GitHub'}
                onChange={e => setCurrentLink({...currentLink, platform: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="GitHub">GitHub</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter</option>
                <option value="Dribbble">Dribbble</option>
                <option value="Behance">Behance</option>
                <option value="Medium">Medium</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
              <input
                type="url"
                required
                value={currentLink?.url || ''}
                onChange={e => setCurrentLink({...currentLink, url: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username / Handle (optional)</label>
              <input
                value={currentLink?.username || ''}
                onChange={e => setCurrentLink({...currentLink, username: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="@username"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Link
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Social Links</h1>
          <p className="text-gray-400">Manage your online presence.</p>
        </div>
        <button
          onClick={() => {
            setCurrentLink({ platform: 'GitHub', url: '', username: '' });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {socialLinks.length === 0 ? (
        <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <LinkIcon className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No links added</h3>
          <p className="text-gray-400 max-w-sm mb-6">Connect your social profiles so visitors can find you online.</p>
          <button
            onClick={() => {
              setCurrentLink({ platform: 'GitHub', url: '', username: '' });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Link
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {socialLinks.map((link) => (
              <motion.div
                key={link.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-gray-300">
                    {getIconForPlatform(link.platform)}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{link.platform}</h3>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                      {link.username || new URL(link.url).hostname}
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setCurrentLink(link);
                      setIsEditing(true);
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(link.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
