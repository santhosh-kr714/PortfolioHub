import React, { useState } from 'react';
import { FileText, Upload, Trash2, Save, Download, File as FileIcon } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Resume() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasResume, setHasResume] = useState(false); // Simulate backend state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHasResume(true);
    setIsUploading(false);
    setFile(null);
  };

  const handleDelete = () => {
    setHasResume(false);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Resume</h1>
        <p className="text-gray-400">Upload your latest resume for visitors to download.</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
        {hasResume ? (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-black/30 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Resume.pdf</h3>
                <p className="text-sm text-gray-400">Uploaded recently</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm font-medium">
                <Download className="w-4 h-4" /> Download
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-2 border-dashed border-white/10 hover:border-blue-500/50 transition-colors rounded-2xl p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Upload your resume</h3>
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                PDF format recommended. Maximum file size 5MB.
              </p>
              
              <input 
                type="file" 
                id="resume-upload" 
                accept=".pdf,.doc,.docx" 
                className="hidden" 
                onChange={handleFileChange}
              />
              <label 
                htmlFor="resume-upload"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <FileIcon className="w-4 h-4" />
                Select File
              </label>
            </div>

            {file && (
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 bg-black/30 border border-white/10 rounded-xl">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">{file.name}</span>
                  <span className="text-sm text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setFile(null)}
                    className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-colors text-sm font-medium"
                  >
                    {isUploading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isUploading ? 'Uploading...' : 'Save Resume'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
