import React from 'react';
import { Wand2, RefreshCw } from 'lucide-react';

interface GenerationButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function GenerationButton({ onClick, loading }: GenerationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50"
    >
      {loading ? (
        <RefreshCw className="w-5 h-5 animate-spin" />
      ) : (
        <Wand2 className="w-5 h-5" />
      )}
      <span>
        {loading ? 'AI Sanat Oluşturuluyor...' : 'AI Sanat Oluştur'}
      </span>
    </button>
  );
}