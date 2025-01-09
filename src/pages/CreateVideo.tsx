import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_REPLICATE_API_KEY;
const MODEL_VERSION = "2b017650c1ac101584b12b0694c90768edac949d798e8251b7156ef4d44a5e68";

// Yeni arka plan resimleri
const backgrounds = [
  '/backgrounds/mountain.jpg',
  '/backgrounds/forest.jpg',
  '/backgrounds/sunset.jpg',
  '/backgrounds/aurora.jpg',
];

const CreateVideo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [currentBackground, setCurrentBackground] = useState(0);

  // Arka plan değiştirme efekti
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Her 5 saniyede bir değiş

    return () => clearInterval(interval);
  }, []);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-8 relative"
      style={{
        backgroundImage: `url(${backgrounds[currentBackground]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="max-w-4xl mx-auto bg-black bg-opacity-80 p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Video Oluştur</h1>
        
        <div className="mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Videonuz için bir açıklama yazın..."
            className="w-full p-4 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold ${
              isGenerating ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isGenerating ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Oluşturuluyor...</span>
              </>
            ) : (
              <>
                <FaVideo />
                <span>Video Oluştur</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-500 bg-opacity-20 rounded-lg flex items-center space-x-2 text-red-300">
            <FaExclamationCircle />
            <span>{error}</span>
          </div>
        )}

        {generatedVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Oluşturulan Video:</h2>
            <video
              src={generatedVideo}
              controls
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreateVideo;
