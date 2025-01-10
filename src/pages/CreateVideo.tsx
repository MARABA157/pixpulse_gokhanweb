import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image";
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
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          samples: 1,
          steps: 30
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.artifacts || !data.artifacts[0]) {
        throw new Error('Invalid API response format');
      }

      // Base64 görüntüyü URL'e çevir
      const imageBase64 = data.artifacts[0].base64;
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      setVideoUrl(imageUrl);
      toast.success('Görsel başarıyla oluşturuldu!');
    } catch (err) {
      console.error('Video generation error:', err);
      toast.error(err instanceof Error ? err.message : 'Görsel oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">AI Video Oluşturucu</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Videonuz için bir açıklama yazın..."
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateVideo}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Oluşturuluyor...
              </>
            ) : (
              <>
                <FaVideo />
                Video Oluştur
              </>
            )}
          </motion.button>
        </div>

        {videoUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Oluşturulan Görsel:</h2>
            <div className="rounded-lg overflow-hidden">
              <img 
                src={videoUrl} 
                alt="Generated content"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateVideo;
