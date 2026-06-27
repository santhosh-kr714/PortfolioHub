import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Trophy, Save, X, Calendar, ExternalLink } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Achievements() {
  const { achievements, setAchievements } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAchievement.id) {
      setAchievements(achievements.map(a => a.id === currentAchievement.id ? currentAchievement : a));
    } else {
      setAchievements([...achievements, { ...currentAchievement, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setCurrentAchievement(null);
  };

  const handleDelete = (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentAchievement?.id ? 'Edit Achievement' : 'New Achievement'}</h1>
            <p className="text-gray-400">Add an award, honor, or significant milestone.</p>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                required
                value={currentAchievement?.title || ''}
                onChange={e => setCurrentAchievement({...currentAchievement, title: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Employee of the Year, Hackathon Winner"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Achieved</label>
                <input
                  type="month"
                  value={currentAchievement?.date_achieved || ''}
                  onChange={e => setCurrentAchievement({...currentAchievement, date_achieved: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL (optional)</label>
                <input
                  type="url"
                  value={currentAchievement?.url || ''}
                  onChange={e => setCurrentAchievement({...currentAchievement, url: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                required
                rows={3}
                value={currentAchievement?.description || ''}
                onChange={e => setCurrentAchievement({...currentAchievement, description: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Briefly describe what this achievement is about..."
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
              Save Achievement
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Sort by date descending
  const sortedAchievements = [...achievements].sort((a, b) => {
    return new Date(b.date_achieved).getTime() - new Date(a.date_achieved).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Achievements</h1>
          <p className="text-gray-400">Showcase your awards and milestones.</p>
        </div>
        <button
          onClick={() => {
            setCurrentAchievement({ title: '', description: '', date_achieved: '', url: '' });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No achievements yet</h3>
          <p className="text-gray-400 max-w-sm mb-6">Add any awards, competition wins, or major milestones you are proud of.</p>
          <button
            onClick={() => {
              setCurrentAchievement({ title: '', description: '', date_achieved: '', url: '' });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Achievement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {sortedAchievements.map((achieve) => (
              <motion.div
                key={achieve.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 group hover:border-white/20 transition-colors relative"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setCurrentAchievement(achieve);
                      setIsEditing(true);
                    }}
                    className="p-1.5 bg-white/10 rounded-md text-white hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleDelete(achieve.id)}
                    className="p-1.5 bg-white/10 rounded-md text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                    <Trophy className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 pr-16">{achieve.title}</h3>
                    {achieve.date_achieved && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {achieve.date_achieved}
                      </div>
                    )}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {achieve.description}
                    </p>
                    {achieve.url && (
                      <a href={achieve.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                        View Details <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
