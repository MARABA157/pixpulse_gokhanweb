import React, { useState } from 'react';
import { Wand2, Image, Download, Share2, Heart, MessageCircle, Sparkles, RefreshCw } from 'lucide-react';

export default function AiCreate() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  const artStyles = [
    { id: 'realistic', name: 'Gerçekçi', example: 'https://images.unsplash.com/photo-1544511916-0148ccdeb877?q=80&w=200' },
    { id: 'anime', name: 'Anime', example: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=200' },
    { id: 'oil-painting', name: 'Yağlı Boya', example: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=200' },
    { id: 'watercolor', name: 'Suluboya', example: 'https://images.unsplash.com/photo-1580196969807-cc6de06c05be?q=80&w=200' },
    { id: 'digital-art', name: 'Dijital Art', example: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=200' },
    { id: '3d', name: '3D', example: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=200' },
  ];

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle) return;
    
    setIsGenerating(true);
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setGeneratedImage('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI ile Sanat Oluştur
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hayal ettiğiniz sanat eserini yapay zeka ile oluşturun. 
            Tarzınızı seçin, açıklamanızı yazın ve AI'ın sihirini izleyin.
          </p>
        </div>

        {/* Stil Seçimi */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Sanat Stili Seçin</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {artStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative rounded-xl overflow-hidden aspect-square group ${selectedStyle === style.id ? 'ring-2 ring-purple-500' : ''}`}
              >
                <img
                  src={style.example}
                  alt={style.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 flex items-center justify-center bg-black/50 ${selectedStyle === style.id ? 'bg-black/70' : 'group-hover:bg-black/60'}`}>
                  <span className="font-medium">{style.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Girişi */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Sanat eserinizi detaylı bir şekilde açıklayın... (örn: 'Yağmurlu bir günde neon ışıklarıyla aydınlanmış Tokyo sokağı')"
              className="w-full h-32 bg-gray-700 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Wand2 size={20} />
                <span>AI ile güçlendirildi</span>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!prompt || !selectedStyle || isGenerating}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold 
                  hover:opacity-90 transition-opacity inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Oluştur
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Oluşturulan Görsel */}
        {generatedImage && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
                <img
                  src={generatedImage}
                  alt="Oluşturulan sanat"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-gray-400">
                  <button className="hover:text-white transition-colors flex items-center gap-2">
                    <Heart size={20} />
                    <span>1.2K</span>
                  </button>
                  <button className="hover:text-white transition-colors flex items-center gap-2">
                    <MessageCircle size={20} />
                    <span>234</span>
                  </button>
                  <button className="hover:text-white transition-colors flex items-center gap-2">
                    <Share2 size={20} />
                    <span>89</span>
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <Share2 size={18} />
                    Paylaş
                  </button>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                    <Download size={18} />
                    İndir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}