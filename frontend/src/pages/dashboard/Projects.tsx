import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Copy, Search, GripVertical, ExternalLink, Code2, Save, X, Image as ImageIcon } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import ImageUpload from '../../components/common/ImageUpload';
import AutosaveStatus from '../../components/common/AutosaveStatus';

export default function Projects() {
  const { projects, setProjects } = usePortfolioStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  // Search filter
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.tech_stack || []).some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // HTML5 Drag and Drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    setIsSaving(true);
    const updated = [...projects];
    const [removed] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, removed);
    
    setProjects(updated);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleOpenAddModal = () => {
    setCurrentProject({
      title: '',
      description: '',
      tech_stack: '',
      github_url: '',
      live_demo_url: '',
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: any) => {
    setCurrentProject({
      ...project,
      tech_stack: (project.tech_stack || []).join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = (project: any) => {
    setIsSaving(true);
    const copy = {
      ...project,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      title: `${project.title} (Copy)`
    };
    setProjects([...projects, copy]);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleDelete = (id: string) => {
    setIsSaving(true);
    setProjects(projects.filter(p => p.id !== id));
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const techArray = typeof currentProject.tech_stack === 'string'
      ? currentProject.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean)
      : currentProject.tech_stack;

    const formattedProject = {
      ...currentProject,
      tech_stack: techArray
    };

    if (currentProject.id) {
      setProjects(projects.map(p => p.id === currentProject.id ? formattedProject : p));
    } else {
      setProjects([...projects, { ...formattedProject, id: Date.now().toString() }]);
    }

    setIsModalOpen(false);
    setCurrentProject(null);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
          <p className="text-sm text-gray-400">Manage, organize, and showcase your works.</p>
        </div>
        <AutosaveStatus saving={isSaving} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-3xl p-12 text-center text-gray-500 text-sm">
          {searchQuery ? 'No projects matches your search.' : 'No projects yet. Click Add Project to showcase your work.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              draggable
              onDragStart={e => handleDragStart(e, idx)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, idx)}
              className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-5 flex items-start gap-4 cursor-grab active:cursor-grabbing group transition-all duration-300"
            >
              {/* Drag Handle */}
              <div className="text-gray-600 group-hover:text-gray-400 self-center">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 shrink-0 border border-white/10">
                {project.image ? (
                  <img src={project.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate text-base mb-1">{project.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-2 leading-relaxed">{project.description}</p>
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech_stack.slice(0, 3).map((tech: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-gray-300 font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 3 && (
                      <span className="text-[10px] text-gray-500 font-medium pl-1">
                        +{project.tech_stack.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-3 mt-1 text-xs">
                  <button 
                    onClick={() => handleOpenEditModal(project)}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDuplicate(project)}
                    className="flex items-center gap-1 text-gray-400 hover:text-white font-semibold"
                  >
                    <Copy className="w-3 h-3" /> Duplicate
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold ml-auto"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0c0c] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  {currentProject?.id ? 'Edit Project' : 'Add Project'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleModalSave} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Image</label>
                    <ImageUpload 
                      value={currentProject?.image || ''} 
                      onChange={url => setCurrentProject({ ...currentProject, image: url })} 
                      aspectRatio="video"
                      label="Upload Project Image"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Title</label>
                      <input
                        required
                        type="text"
                        value={currentProject?.title || ''}
                        onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                        placeholder="e.g. Aether 3D Orbital Platform"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Short Description</label>
                      <textarea
                        required
                        rows={3}
                        value={currentProject?.description || ''}
                        onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm resize-none"
                        placeholder="Describe the goals, technology used, and results..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={currentProject?.tech_stack || ''}
                        onChange={e => setCurrentProject({ ...currentProject, tech_stack: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                        placeholder="React, Three.js, WebGL, Tailwind"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">GitHub Repository URL</label>
                      <input
                        type="url"
                        value={currentProject?.github_url || ''}
                        onChange={e => setCurrentProject({ ...currentProject, github_url: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Live Demo URL</label>
                      <input
                        type="url"
                        value={currentProject?.live_demo_url || ''}
                        onChange={e => setCurrentProject({ ...currentProject, live_demo_url: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-xl text-gray-400 hover:text-white transition-colors text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Save className="w-4 h-4" /> Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
