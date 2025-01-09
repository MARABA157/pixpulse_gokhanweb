import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_KEY = "r8_7JG1Y0Ue9zBzqPGLPFgDXcnXEfL0sPxlRdgZL";
const MODEL_VERSION = "2b017650c1ac101584b12b0694c90768edac949d798e8251b7156ef4d44a5e68";

const CreateVideo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Lütfen bir açıklama girin');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    setGeneratedVideo(null);
    
    try {
      // İlk API isteği - Tahmin oluşturma
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${API_KEY}`
        },
        body: JSON.stringify({
          version: MODEL_VERSION,
          input: {
            prompt: prompt
          }
        })
      });

      if (!response.ok) {
        throw new Error('Video oluşturma başlatılamadı');
      }

      const prediction = await response.json();
      
      // Tahmin durumunu kontrol et
      let videoUrl = null;
      let attempts = 0;
      const maxAttempts = 60; // 5 dakika (5s aralıklarla)
      
      while (attempts < maxAttempts) {
        const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
          headers: {
            'Authorization': `Token ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });
        
        const result = await statusResponse.json();
        
        if (result.status === 'succeeded') {
          videoUrl = result.output;
          break;
        } else if (result.status === 'failed') {
          throw new Error('Video oluşturma başarısız oldu');
        }
        
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5s bekle
      }
      
      if (videoUrl) {
        setGeneratedVideo(videoUrl);
        toast.success('Video başarıyla oluşturuldu!');
      } else {
        throw new Error('Video oluşturma zaman aşımına uğradı');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Video oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      toast.error('Video oluşturulamadı');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <img
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop"
          alt="Film Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-xl"
          >
            <div className="flex items-center mb-6">
              <FaVideo className="text-4xl text-blue-500 mr-4" />
              <h1 className="text-3xl font-bold text-white">Video Oluştur</h1>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                  Video Açıklaması
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Videonuzu açıklayın... Örnek: Güneş batarken sahilde yürüyen bir çift"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={4}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                  isGenerating
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                {isGenerating ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Video Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <FaVideo />
                    <span>Video Oluştur</span>
                  </>
                )}
              </button>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-900 bg-opacity-50 p-4 rounded-lg">
                  <FaExclamationCircle />
                  <p>{error}</p>
                </div>
              )}

              {generatedVideo && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Oluşturulan Video:</h2>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
                    <video
                      src={generatedVideo}
                      controls
                      className="w-full h-full object-contain"
                    >
                      Tarayıcınız video oynatmayı desteklemiyor.
                    </video>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
