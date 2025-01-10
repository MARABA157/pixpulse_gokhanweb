import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_URL = "https://api.stability.ai/v1/generation/stable-video-diffusion/text-to-video";
const API_KEY = import.meta.env.VITE_STABILITY_API_KEY;

const CreateVideo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const generateVideo = async () => {
    if (!prompt) {
      toast.error('Lütfen bir prompt girin');
      return;
    }

    if (!API_KEY) {
      toast.error('API anahtarı bulunamadı');
      return;
    }

    setLoading(true);
    setVideoUrl('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1
            }
          ],
          height: 576,
          width: 1024,
          num_frames: 24,
          fps: 8
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.artifacts || !data.artifacts[0]) {
        throw new Error('Invalid API response format');
      }

      const videoResult = data.artifacts[0].video;
      if (!videoResult) {
        throw new Error('No video URL in response');
      }

      setVideoUrl(videoResult);
      toast.success('Video başarıyla oluşturuldu!');
    } catch (err) {
      console.error('Video generation error:', err);
      toast.error(err instanceof Error ? err.message : 'Video oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-gray-900 bg-opacity-90 p-8 rounded-xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Video Oluştur</h1>

        <div className="space-y-6">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Videonuzu tanımlayın..."
              className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {videoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
    </div>
  );
};

export default CreateVideo;
