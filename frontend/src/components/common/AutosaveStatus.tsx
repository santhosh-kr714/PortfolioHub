import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface AutosaveStatusProps {
  saving: boolean;
}

export default function AutosaveStatus({ saving }: AutosaveStatusProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
      {saving ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-emerald-500">Saved</span>
        </>
      )}
    </div>
  );
}
