import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = [
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    alt: 'Maldivler Plajı'
  },
  {
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80',
    alt: 'Tropikal Kumsal'
  },
  {
    url: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=2000&q=80',
    alt: 'New York Şehir Manzarası'
  },
  {
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80',
    alt: 'Okyanus Kıyısı'
  },
  {
    url: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=2000&q=80',
    alt: 'Dubai Gökdelenleri'
  },
  {
    url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2000&q=80',
    alt: 'Tropik Ada'
  }
];

const BackgroundSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(backgrounds.length).fill(false));

  useEffect(() => {
    // Resimleri önceden yükle
    backgrounds.forEach((bg, index) => {
      const img = new Image();
      img.src = bg.url;
      img.onload = () => {
        setIsLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Tüm resimlerin yüklenip yüklenmediğini kontrol et
  const allImagesLoaded = isLoaded.every(Boolean);

  if (!allImagesLoaded) {
    return (
      <div className="fixed inset-0 w-full h-full -z-10 bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${backgrounds[currentIndex].url})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundSlider;
