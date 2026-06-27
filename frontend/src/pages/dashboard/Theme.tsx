import React from 'react';
import { Palette, Check, Save } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const colorPalettes = [
  { name: 'Ocean Blue', primary: '#3B82F6', background: '#050505', class: 'from-blue-500 to-cyan-500' },
  { name: 'Royal Purple', primary: '#8B5CF6', background: '#050505', class: 'from-purple-500 to-indigo-500' },
  { name: 'Emerald Green', primary: '#10B981', background: '#050505', class: 'from-emerald-500 to-teal-500' },
  { name: 'Sunset Orange', primary: '#F97316', background: '#050505', class: 'from-orange-500 to-red-500' },
  { name: 'Neon Pink', primary: '#EC4899', background: '#050505', class: 'from-pink-500 to-rose-500' },
  { name: 'Minimal Mono', primary: '#FFFFFF', background: '#050505', class: 'from-gray-300 to-gray-500' },
];

const fonts = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Fira Code', value: '"Fira Code", monospace' },
];

export default function Theme() {
  const { theme, setTheme } = usePortfolioStore();

  const handleSave = () => {
    // In a real app, this would save to the backend.
    // For now, Zustand handles the state immediately.
    alert('Theme settings saved!');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Theme</h1>
          <p className="text-gray-400">Customize the look and feel of your portfolio.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <Save className="w-4 h-4" />
          Save Theme
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Color Palette</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {colorPalettes.map((palette) => {
              const isActive = theme.primary_color === palette.primary;
              return (
                <button
                  key={palette.name}
                  onClick={() => setTheme({ ...theme, primary_color: palette.primary, background_color: palette.background })}
                  className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all ${
                    isActive ? 'border-blue-500 bg-white/10' : 'border-white/10 hover:border-white/20 bg-black/30'
                  }`}
                >
                  <div className={`w-full h-12 rounded-xl mb-3 bg-gradient-to-br ${palette.class}`} />
                  <div className="font-medium text-white text-sm mb-1">{palette.name}</div>
                  <div className="text-xs text-gray-500">{palette.primary}</div>
                  
                  {isActive && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white mb-6">Typography</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fonts.map((font) => {
              const isActive = theme.font_family === font.name;
              return (
                <button
                  key={font.name}
                  onClick={() => setTheme({ ...theme, font_family: font.name })}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isActive ? 'border-blue-500 bg-white/10' : 'border-white/10 hover:border-white/20 bg-black/30'
                  }`}
                >
                  <div>
                    <div className="text-2xl text-white mb-1" style={{ fontFamily: font.value }}>Aa</div>
                    <div className="font-medium text-gray-300 text-sm">{font.name}</div>
                  </div>
                  {isActive && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
