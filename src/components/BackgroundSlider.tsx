import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Arka plan resimleri
import city1 from '../assets/backgrounds/city1.jpg';
import city2 from '../assets/backgrounds/city2.jpg';
import beach1 from '../assets/backgrounds/beach1.jpg';
import beach2 from '../assets/backgrounds/beach2.jpg';

const backgrounds = [city1, city2, beach1, beach2];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 2000); // 2 saniyede bir değiştir

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgrounds[currentIndex]})`,
            }}
          >
            {/* Karanlık overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
