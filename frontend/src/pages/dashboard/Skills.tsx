import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Award, Save, X } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Skills() {
  const { skills, setSkills } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.id) {
      setSkills(skills.map(s => s.id === currentSkill.id ? currentSkill : s));
    } else {
      setSkills([...skills, { ...currentSkill, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setCurrentSkill(null);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentSkill?.id ? 'Edit Skill' : 'New Skill'}</h1>
            <p className="text-gray-400">Add a new skill and its proficiency level.</p>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name</label>
              <input
                required
                value={currentSkill?.name || ''}
                onChange={e => setCurrentSkill({...currentSkill, name: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. React, Node.js, Python..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                required
                value={currentSkill?.category || 'Programming'}
                onChange={e => setCurrentSkill({...currentSkill, category: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="Programming">Programming</option>
                <option value="Frameworks">Frameworks</option>
                <option value="Databases">Databases</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Cloud">Cloud</option>
                <option value="Tools">Tools</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Proficiency (%)</label>
                <span className="text-blue-400 text-sm font-bold">{currentSkill?.percentage || 50}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentSkill?.percentage || 50}
                onChange={e => setCurrentSkill({...currentSkill, percentage: parseInt(e.target.value)})}
                className="w-full accent-blue-500"
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
              Save Skill
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Programming';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Skills</h1>
          <p className="text-gray-400">Manage your technical and soft skills.</p>
        </div>
        <button
          onClick={() => {
            setCurrentSkill({ name: '', category: 'Programming', percentage: 80 });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Add your first skill</h3>
          <p className="text-gray-400 max-w-sm mb-6">Highlight the tools and technologies you excel at to impress visitors.</p>
          <button
            onClick={() => {
              setCurrentSkill({ name: '', category: 'Programming', percentage: 80 });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Skill
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, catSkills]) => (
            <div key={category} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                  {catSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-black/30 border border-white/10 rounded-xl p-4 group hover:border-white/20 transition-colors relative"
                    >
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setCurrentSkill(skill);
                            setIsEditing(true);
                          }}
                          className="p-1.5 bg-white/10 rounded-md text-white hover:bg-blue-600 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleDelete(skill.id)}
                          className="p-1.5 bg-white/10 rounded-md text-white hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white">
                          {skill.name.charAt(0)}
                        </div>
                        <h4 className="font-medium text-white">{skill.name}</h4>
                      </div>
                      
                      <div className="w-full bg-white/10 rounded-full h-1.5 mb-1 overflow-hidden">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${skill.percentage || 0}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-gray-500 font-medium">
                        {skill.percentage}%
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
