import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const GRADIO_API_URL = "https://ysharma-animatediff.hf.space/api/predict";

// Yeni arka plan resimleri
const backgrounds = [
  '/backgrounds/mountain.jpg',
  '/backgrounds/forest.jpg',
  '/backgrounds/sunset.jpg',
  '/backgrounds/aurora.jpg',
];

const CreateVideo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateVideo = async () => {
    if (!prompt) {
      toast.error('Lütfen bir prompt girin');
      return;
    }

    setLoading(true);
    setError('');
    setVideoUrl('');

    try {
      const response = await fetch(GRADIO_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [
            prompt,  // Text prompt
            8,       // Number of frames
            24,      // FPS
            "ddim",  // Scheduler
            7.5,     // Guidance scale
            25,      // Num inference steps
            false,   // Use NSFW checker
            1234,    // Seed
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Gradio returns an array of results, video will be in data[0]
      const videoResult = data.data[0];
      setVideoUrl(videoResult);
      toast.success('Video başarıyla oluşturuldu!');
    } catch (err) {
      console.error('Video generation error:', err);
      setError('Video oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      toast.error('Video oluşturulamadı');
    } finally {
      setLoading(false);
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
            onClick={generateVideo}
            disabled={loading}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold ${
              loading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {loading ? (
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

        {videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Oluşturulan Video:</h2>
            <video
              src={videoUrl}
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
