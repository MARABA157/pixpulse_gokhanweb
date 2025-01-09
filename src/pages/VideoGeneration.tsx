import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface VideoPrompt {
  description: string;
  duration: number;
  style: string;
}

const VideoGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState<VideoPrompt>({
    description: '',
    duration: 10,
    style: 'realistic'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const styleOptions = [
    'realistic',
    'anime',
    'cartoon',
    '3D animation',
    'cinematic',
    'artistic'
  ];

  const handleGenerate = async () => {
    if (!prompt.description) {
      toast.error('Lütfen bir video açıklaması girin');
      return;
    }

    setIsGenerating(true);
    try {
      // Burada gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simüle edilmiş bekleme
      
      // Örnek video URL'si
      setGeneratedVideoUrl('https://example.com/sample-video.mp4');
      toast.success('Video başarıyla oluşturuldu!');
    } catch (error) {
      toast.error('Video oluşturulurken bir hata oluştu');
      console.error('Video generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            AI Video Oluşturucu
          </h1>

          <div className="bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6 mb-8">
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Video Açıklaması</label>
              <textarea
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                value={prompt.description}
                onChange={(e) => setPrompt({ ...prompt, description: e.target.value })}
                placeholder="Videoda ne olmasını istediğinizi detaylı bir şekilde açıklayın..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Video Süresi (saniye)</label>
                <input
                  type="number"
                  min={5}
                  max={60}
                  value={prompt.duration}
                  onChange={(e) => setPrompt({ ...prompt, duration: parseInt(e.target.value) })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Video Stili</label>
                <select
                  value={prompt.style}
                  onChange={(e) => setPrompt({ ...prompt, style: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {styleOptions.map((style) => (
                    <option key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg px-6 py-4 font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2" />
                  Video Oluşturuluyor...
                </div>
              ) : (
                'Video Oluştur'
              )}
            </button>
          </div>

          {generatedVideoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Oluşturulan Video</h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                <video
                  src={generatedVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                >
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
              </div>
              <div className="mt-4 flex gap-4">
                <a
                  href={generatedVideoUrl}
                  download
                  className="flex-1 bg-purple-600 text-white rounded-lg px-6 py-3 font-semibold text-center hover:bg-purple-700 transition-colors duration-200"
                >
                  Videoyu İndir
                </a>
                <button
                  onClick={() => setGeneratedVideoUrl(null)}
                  className="flex-1 bg-gray-700 text-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-600 transition-colors duration-200"
                >
                  Yeni Video Oluştur
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VideoGeneration;
