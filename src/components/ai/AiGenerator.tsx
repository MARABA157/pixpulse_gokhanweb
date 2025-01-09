import React from 'react';
import { useAiGeneration } from '../../hooks/useAiGeneration';
import GenerationButton from './GenerationButton';
import GenerationDisplay from './GenerationDisplay';

export default function AiGenerator() {
  const { loading, generatedImage, generatedVideo, style, generate } = useAiGeneration();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Sanat Oluşturucu</h2>
        
        <div className="flex justify-center mb-6">
          <GenerationButton onClick={generate} loading={loading} />
        </div>

        <GenerationDisplay 
          loading={loading}
          image={generatedImage}
          video={generatedVideo}
          style={style}
        />
      </div>
    </div>
  );
}