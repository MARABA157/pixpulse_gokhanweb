import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = [
  '/images/city/city1.jpg',
  '/images/city/city2.jpg',
  '/images/city/city3.jpg',
  '/images/city/city4.jpg',
];

const RotatingBackground: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={backgrounds[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Background"
        />
      </AnimatePresence>
    </div>
  );
};

export default RotatingBackground;
