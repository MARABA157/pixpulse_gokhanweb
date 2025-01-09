import React, { useState } from 'react';
import { motion } from 'framer-motion';

const styles = [
  { id: 1, name: 'Gerçekçi', description: 'Fotoğraf gibi gerçekçi görüntüler' },
  { id: 2, name: 'Anime', description: 'Anime ve manga tarzı çizimler' },
  { id: 3, name: 'Dijital Sanat', description: 'Modern dijital sanat eserleri' },
  { id: 4, name: 'Yağlı Boya', description: 'Klasik yağlı boya tablo tarzı' },
  { id: 5, name: 'Piksel', description: 'Retro piksel sanat stili' },
];

const AIPage = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500"
          >
            AI Görsel Üretici
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Yapay zeka ile hayalinizdeki görselleri saniyeler içinde oluşturun
          </motion.p>

          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 bg-black/50 text-white rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Görseli tanımlayın... (örn: 'Gün batımında uçan bir ejderha')"
            />
            
            {/* Stil Seçimi */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Stil Seçin</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map((style) => (
                  <motion.button
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedStyle === style.id
                        ? 'bg-blue-500/20 ring-2 ring-blue-500'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <h4 className="text-white font-medium mb-1">{style.name}</h4>
                    <p className="text-sm text-gray-400">{style.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Ayarlar */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">Boyut</h4>
                <select className="w-full bg-black/50 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="512x512">512 x 512</option>
                  <option value="768x768">768 x 768</option>
                  <option value="1024x1024">1024 x 1024</option>
                </select>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">Kalite</h4>
                <select className="w-full bg-black/50 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  <option value="standard">Standart</option>
                  <option value="hd">HD</option>
                  <option value="4k">4K</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button 
                className="px-6 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-all"
              >
                Önizle
              </button>
              <button 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">Hızlı Üretim</h3>
              <p className="text-gray-300">
                Saniyeler içinde yüksek kaliteli görseller oluşturun
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">Detaylı Kontrol</h3>
              <p className="text-gray-300">
                Prompt ile görselinizi istediğiniz gibi özelleştirin
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">Sınırsız Üretim</h3>
              <p className="text-gray-300">
                İstediğiniz kadar görsel oluşturun ve düzenleyin
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Örnek Görseller */}
      <section className="py-16 px-4 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
            Örnek Çalışmalar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-xl overflow-hidden relative group"
              >
                <img
                  src={`https://image.pollinations.ai/prompt/${encodeURIComponent(
                    `Example ${i} beautiful artwork, high quality, detailed`
                  )}`}
                  alt={`Örnek ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">Örnek Çalışma {i}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPage;
