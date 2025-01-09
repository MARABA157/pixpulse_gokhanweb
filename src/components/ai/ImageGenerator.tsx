import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Simüle edilmiş AI görsel oluşturma
  const generateImage = async () => {
    setLoading(true);
    
    // Simüle edilmiş bekleme süresi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sabit Unsplash görselleri listesi
    const aiImages = [
      'https://images.unsplash.com/photo-1686191128892-3b960bb41da1',
      'https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9',
      'https://images.unsplash.com/photo-1683009427666-340595e57e43',
      'https://images.unsplash.com/photo-1683009427619-e3dcc9b05da7'
    ];
    
    // Rastgele bir görsel seç
    const randomImage = aiImages[Math.floor(Math.random() * aiImages.length)];
    setGeneratedImage(randomImage);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Görsel Oluşturucu</h2>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={generateImage}
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50"
          >
            <Wand2 className="w-5 h-5" />
            <span>{loading ? 'Oluşturuluyor...' : 'Görsel Oluştur'}</span>
          </button>
        </div>

        <div className="relative min-h-[300px] rounded-lg overflow-hidden bg-gray-50">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : generatedImage ? (
            <img
              src={generatedImage}
              alt="Generated AI Art"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Görsel oluşturmak için butona tıklayın
            </div>
          )}
        </div>
      </div>
    </div>
  );
}