import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Code2, Save, X, Calendar, MapPin, Building2 } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Experience() {
  const { experience, setExperience } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentExp.id) {
      setExperience(experience.map(x => x.id === currentExp.id ? currentExp : x));
    } else {
      setExperience([...experience, { ...currentExp, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setCurrentExp(null);
  };

  const handleDelete = (id: string) => {
    setExperience(experience.filter(x => x.id !== id));
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentExp?.id ? 'Edit Experience' : 'New Experience'}</h1>
            <p className="text-gray-400">Add your work experience and achievements.</p>
          </div>
          <button 
            onClick={() => setIsEditing(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
              <input
                required
                value={currentExp?.position || ''}
                onChange={e => setCurrentExp({...currentExp, position: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                required
                value={currentExp?.company || ''}
                onChange={e => setCurrentExp({...currentExp, company: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                value={currentExp?.location || ''}
                onChange={e => setCurrentExp({...currentExp, location: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input
                  type="month"
                  required
                  value={currentExp?.start_date || ''}
                  onChange={e => setCurrentExp({...currentExp, start_date: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                <input
                  type="month"
                  disabled={currentExp?.is_current}
                  value={currentExp?.end_date || ''}
                  onChange={e => setCurrentExp({...currentExp, end_date: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_current"
                    checked={currentExp?.is_current || false}
                    onChange={e => setCurrentExp({...currentExp, is_current: e.target.checked, end_date: e.target.checked ? '' : currentExp.end_date})}
                    className="rounded border-white/10 bg-black/30 text-blue-500 focus:ring-blue-500 w-4 h-4"
                  />
                  <label htmlFor="is_current" className="text-sm text-gray-300">I currently work here</label>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={currentExp?.description || ''}
                onChange={e => setCurrentExp({...currentExp, description: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Describe your responsibilities and achievements..."
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
              Save Experience
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Sort experience by start date descending
  const sortedExp = [...experience].sort((a, b) => {
    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Experience</h1>
          <p className="text-gray-400">Manage your professional journey.</p>
        </div>
        <button
          onClick={() => {
            setCurrentExp({ position: '', company: '', location: '', start_date: '', end_date: '', is_current: false, description: '' });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No experience added</h3>
          <p className="text-gray-400 max-w-sm mb-6">List your work history to show your career progression and achievements.</p>
          <button
            onClick={() => {
              setCurrentExp({ position: '', company: '', location: '', start_date: '', end_date: '', is_current: false, description: '' });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          <AnimatePresence>
            {sortedExp.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:border-blue-500/50 transition-colors z-10">
                  <Building2 className="w-4 h-4 text-blue-400" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors relative">
                  <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setCurrentExp(exp);
                        setIsEditing(true);
                      }}
                      className="p-1.5 bg-white/10 rounded-md text-white hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => handleDelete(exp.id)}
                      className="p-1.5 bg-white/10 rounded-md text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                  <div className="text-blue-400 font-medium mb-4">{exp.company}</div>
                  
                  <div className="flex flex-col gap-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {exp.start_date} - {exp.is_current ? 'Present' : exp.end_date}
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
