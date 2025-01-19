import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Camera,
  MessageSquareText,
  Film,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import AIChatPrompt from '../components/prompts/AIChatPrompt';
import ImageGenerationPrompt from '../components/prompts/ImageGenerationPrompt';
import VideoGenerationPrompt from '../components/prompts/VideoGenerationPrompt';
import PlaceholderImage from '../components/PlaceholderImage';

interface CityTheme {
  id: number;
  name: string;
  image: string;
  description: string;
}

const cityThemes: CityTheme[] = [
  {
    id: 1,
    name: 'İstanbul',
    image: 'istanbul',
    description: 'Tarihi yarımada ve boğazın büyüleyici manzarası',
  },
  {
    id: 2,
    name: 'Tokyo',
    image: 'tokyo',
    description: 'Modern teknoloji ve geleneksel kültürün buluşması',
  },
  {
    id: 3,
    name: 'Paris',
    image: 'paris',
    description: 'Romantik sokaklar ve sanatın başkenti',
  },
  {
    id: 4,
    name: 'New York',
    image: 'newyork',
    description: 'Gökdelenlerin ve kültürel çeşitliliğin merkezi',
  },
];

const Home: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isImagePromptOpen, setIsImagePromptOpen] = useState(false);
  const [isVideoPromptOpen, setIsVideoPromptOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % cityThemes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % cityThemes.length);
  };

  const prevTheme = () => {
    setCurrentTheme((prev) => (prev - 1 + cityThemes.length) % cityThemes.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section with City Themes */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <PlaceholderImage
              text={`${cityThemes[currentTheme].name} City`}
              width={1600}
              height={900}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl font-bold mb-4"
                >
                  {cityThemes[currentTheme].name}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl"
                >
                  {cityThemes[currentTheme].description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevTheme}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextTheme}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* AI Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          AI Yaratıcılık Merkezi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center mb-4">
              <MessageSquareText className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold">AI Chat</h3>
            </div>
            <p className="mb-4">Yapay zeka ile sohbet edin ve yaratıcı fikirler keşfedin</p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
            >
              <Plus className="w-5 h-5 mr-2" />
              Sohbet Başlat
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-600 to-red-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center mb-4">
              <ImageIcon className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold">Resim Oluştur</h3>
            </div>
            <p className="mb-4">Hayalinizdeki görselleri yapay zeka ile oluşturun</p>
            <button
              onClick={() => setIsImagePromptOpen(true)}
              className="flex items-center text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
            >
              <Plus className="w-5 h-5 mr-2" />
              Resim Oluştur
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-6 text-white"
          >
            <div className="flex items-center mb-4">
              <Film className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-semibold">Video Oluştur</h3>
            </div>
            <p className="mb-4">Etkileyici videolar oluşturun ve düzenleyin</p>
            <button
              onClick={() => setIsVideoPromptOpen(true)}
              className="flex items-center text-white bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
            >
              <Plus className="w-5 h-5 mr-2" />
              Video Oluştur
            </button>
          </motion.div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Keşfet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10 }}
                className="relative rounded-lg overflow-hidden group"
              >
                <PlaceholderImage
                  text={`City Wallpaper ${item}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-semibold">
                      Şehir Manzarası {item}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Etkileyici şehir fotoğrafları
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">PixPulse</h4>
              <p className="text-gray-400">
                Yapay zeka ile yaratıcılığınızı keşfedin
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Özellikler</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Chat</li>
                <li>Resim Oluşturma</li>
                <li>Video Oluşturma</li>
                <li>Şehir Temaları</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kaynaklar</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Blog</li>
                <li>Dokümantasyon</li>
                <li>Topluluk</li>
                <li>Destek</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@pixpulse.com</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PixPulse. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* AI Prompts */}
      <AIChatPrompt isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ImageGenerationPrompt
        isOpen={isImagePromptOpen}
        onClose={() => setIsImagePromptOpen(false)}
      />
      <VideoGenerationPrompt
        isOpen={isVideoPromptOpen}
        onClose={() => setIsVideoPromptOpen(false)}
      />
    </div>
  );
};

export default Home;
