import React, { useState, useRef } from 'react';
import { Upload, Trash2, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../../services/upload';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: 'square' | 'video' | 'banner';
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Upload Image',
  aspectRatio = 'square',
  className = ''
}: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setProgress(20);

    try {
      // Simulate progress intervals for smoother visual feedback
      const progressInterval = setInterval(() => {
        setProgress(prev => (prev < 80 ? prev + 15 : prev));
      }, 200);

      const url = await uploadImage(file);
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        onChange(url);
        setUploading(false);
        setProgress(0);
      }, 300);
    } catch (err) {
      console.error(err);
      setUploading(false);
      setProgress(0);
      alert('Upload failed. Please try again.');
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const aspectClass = 
    aspectRatio === 'square' ? 'aspect-square rounded-full max-w-[140px]' : 
    aspectRatio === 'banner' ? 'aspect-[21/9] rounded-2xl w-full' :
    'aspect-video rounded-xl w-full';

  return (
    <div className={`w-full ${className}`}>
      {/* File input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className={`relative group ${aspectClass} overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center`}>
          {value.toLowerCase().endsWith('.pdf') || value.includes('data:application/pdf') ? (
            <div className="flex flex-col items-center justify-center text-red-400 p-4">
              <span className="text-4xl font-bold uppercase tracking-wider">PDF</span>
              <span className="text-[10px] text-gray-400 mt-1 truncate max-w-full">Certificate File</span>
            </div>
          ) : (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          )}
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
            <button
              type="button"
              onClick={triggerInput}
              disabled={uploading}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              title="Replace image"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-colors"
              title="Delete image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerInput}
          className={`border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 p-6 ${aspectClass} ${
            isDragActive 
              ? 'border-blue-500 bg-blue-500/5' 
              : 'border-white/10 hover:border-white/20 hover:bg-white/5 bg-white/5'
          }`}
        >
          {uploading ? (
            <div className="w-full px-4 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-blue-400">Uploading...</span>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-6 h-6 text-gray-500 mb-2 group-hover:text-white" />
              <span className="text-xs text-gray-400 text-center font-medium px-2">{label}</span>
              <span className="text-[10px] text-gray-500 mt-1">Drag & drop</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
