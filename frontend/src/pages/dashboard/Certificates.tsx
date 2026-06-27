import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, GripVertical, Save, X, Image as ImageIcon, Calendar, Award } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import ImageUpload from '../../components/common/ImageUpload';
import AutosaveStatus from '../../components/common/AutosaveStatus';

export default function Certificates() {
  const { certificates, setCertificates } = usePortfolioStore();
  const [isSaving, setIsSaving] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState<any>(null);

  // HTML5 Drag and Drop reorder
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
    const updated = [...certificates];
    const [removed] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, removed);
    
    setCertificates(updated);
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleOpenAddModal = () => {
    setCurrentCert({
      title: '',
      issuer: '',
      image_url: '',
      description: '',
      skills_gained: '',
      issue_year: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cert: any) => {
    setCurrentCert({ 
      ...cert,
      skills_gained: Array.isArray(cert.skills_gained) ? cert.skills_gained.join(', ') : (cert.skills_gained || '')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setIsSaving(true);
    setCertificates(certificates.filter(c => c.id !== id));
    setTimeout(() => setIsSaving(false), 500);
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const skillsArray = typeof currentCert.skills_gained === 'string'
      ? currentCert.skills_gained.split(',').map((s: string) => s.trim()).filter(Boolean)
      : (currentCert.skills_gained || []);

    const formattedCert = {
      ...currentCert,
      skills_gained: skillsArray
    };

    if (currentCert.id) {
      setCertificates(certificates.map(c => c.id === currentCert.id ? formattedCert : c));
    } else {
      setCertificates([...certificates, { ...formattedCert, id: Date.now().toString() }]);
    }

    setIsModalOpen(false);
    setCurrentCert(null);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Certificates</h1>
          <p className="text-sm text-gray-400">Add credentials and certifications to your profile.</p>
        </div>
        <AutosaveStatus saving={isSaving} />
      </div>

      {/* Toolbar */}
      <div className="flex justify-end bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add Certificate
        </button>
      </div>

      {/* Certificates List */}
      {certificates.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-3xl p-12 text-center text-gray-500 text-sm">
          No certificates yet. Click Add Certificate to show your credentials.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert, idx) => (
            <div
              key={cert.id}
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

              {/* Certificate Image Preview */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 shrink-0 border border-white/10 flex items-center justify-center">
                {cert.image_url ? (
                  cert.image_url.toLowerCase().endsWith('.pdf') || cert.image_url.includes('data:application/pdf') ? (
                    <div className="text-red-400 text-sm font-bold">PDF</div>
                  ) : (
                    <img src={cert.image_url} alt="" className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate text-base mb-1">{cert.title}</h3>
                <div className="text-xs text-blue-400 font-medium mb-1">{cert.issuer} {cert.issue_year ? `(${cert.issue_year})` : ''}</div>
                {cert.description && <p className="text-xs text-gray-400 line-clamp-2 mb-2 leading-relaxed">{cert.description}</p>}
                
                {cert.skills_gained && cert.skills_gained.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cert.skills_gained.slice(0, 3).map((skill: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-500/10 rounded text-[9px] text-blue-300 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-3 mt-1 text-xs">
                  <button 
                    onClick={() => handleOpenEditModal(cert)}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cert.id)}
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
              className="bg-[#0c0c0c] border border-white/10 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  {currentCert?.id ? 'Edit Certificate' : 'Add Certificate'}
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
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Certificate File (Image or PDF)</label>
                    <ImageUpload 
                      value={currentCert?.image_url || ''} 
                      onChange={url => setCurrentCert({ ...currentCert, image_url: url })} 
                      aspectRatio="video"
                      label="Upload Certificate File"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Certificate Title</label>
                    <input
                      required
                      type="text"
                      value={currentCert?.title || ''}
                      onChange={e => setCurrentCert({ ...currentCert, title: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                      placeholder="e.g. AWS Certified Solutions Architect"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Issuing Organization</label>
                      <input
                        required
                        type="text"
                        value={currentCert?.issuer || ''}
                        onChange={e => setCurrentCert({ ...currentCert, issuer: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                        placeholder="e.g. Amazon Web Services"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Issue Year (optional)</label>
                      <input
                        type="text"
                        value={currentCert?.issue_year || ''}
                        onChange={e => setCurrentCert({ ...currentCert, issue_year: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                        placeholder="e.g. 2026"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skills Gained (optional, comma-separated)</label>
                    <input
                      type="text"
                      value={currentCert?.skills_gained || ''}
                      onChange={e => setCurrentCert({ ...currentCert, skills_gained: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm"
                      placeholder="e.g. Cloud Security, IAM, DevOps"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Short Description</label>
                    <textarea
                      rows={3}
                      value={currentCert?.description || ''}
                      onChange={e => setCurrentCert({ ...currentCert, description: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white text-sm resize-none"
                      placeholder="Brief details about the certificate..."
                    />
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
                    <Save className="w-4 h-4" /> Save Certificate
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
