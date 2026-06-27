import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Education() {
  const { education, setEducation } = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState<any>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEdu.id) {
      setEducation(education.map(x => x.id === currentEdu.id ? currentEdu : x));
    } else {
      setEducation([...education, { ...currentEdu, id: Date.now().toString() }]);
    }
    setIsEditing(false);
    setCurrentEdu(null);
  };

  const handleDelete = (id: string) => {
    setEducation(education.filter(x => x.id !== id));
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{currentEdu?.id ? 'Edit Education' : 'New Education'}</h1>
            <p className="text-gray-400">Add your academic background.</p>
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
              <input
                required
                value={currentEdu?.institution || ''}
                onChange={e => setCurrentEdu({...currentEdu, institution: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Stanford University"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
              <input
                required
                value={currentEdu?.degree || ''}
                onChange={e => setCurrentEdu({...currentEdu, degree: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Bachelor of Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Field of Study</label>
              <input
                value={currentEdu?.field_of_study || ''}
                onChange={e => setCurrentEdu({...currentEdu, field_of_study: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                <input
                  type="month"
                  required
                  value={currentEdu?.start_date || ''}
                  onChange={e => setCurrentEdu({...currentEdu, start_date: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">End Date (or expected)</label>
                <input
                  type="month"
                  value={currentEdu?.end_date || ''}
                  onChange={e => setCurrentEdu({...currentEdu, end_date: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                rows={4}
                value={currentEdu?.description || ''}
                onChange={e => setCurrentEdu({...currentEdu, description: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Activities and societies, notable achievements, GPA..."
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
              Save Education
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Sort education by start date descending
  const sortedEdu = [...education].sort((a, b) => {
    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Education</h1>
          <p className="text-gray-400">Manage your academic background.</p>
        </div>
        <button
          onClick={() => {
            setCurrentEdu({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '' });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <GraduationCap className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No education added</h3>
          <p className="text-gray-400 max-w-sm mb-6">List your university, college, or bootcamp education.</p>
          <button
            onClick={() => {
              setCurrentEdu({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', description: '' });
              setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          <AnimatePresence>
            {sortedEdu.map((edu) => (
              <motion.div
                key={edu.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:border-blue-500/50 transition-colors z-10">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors relative">
                  <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setCurrentEdu(edu);
                        setIsEditing(true);
                      }}
                      className="p-1.5 bg-white/10 rounded-md text-white hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => handleDelete(edu.id)}
                      className="p-1.5 bg-white/10 rounded-md text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                  <div className="text-blue-400 font-medium mb-4">{edu.institution}</div>
                  
                  <div className="flex flex-col gap-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {edu.start_date} - {edu.end_date || 'Present'}
                    </div>
                    {edu.field_of_study && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        {edu.field_of_study}
                      </div>
                    )}
                  </div>
                  
                  {edu.description && (
                    <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
