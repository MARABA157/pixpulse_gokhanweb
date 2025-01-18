import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { features } from '../data/features';
import { exploreImages } from '../data/explore';
import BackgroundSlider from '../components/BackgroundSlider';

const backgrounds = [
  {
    id: 1,
    title: "Deniz",
    image: "/images/backgrounds/beach.jpg"
  },
  {
    id: 2,
    title: "Kumsal",
    image: "/images/backgrounds/sunset.jpg"
  },
  {
    id: 3,
    title: "Şehir",
    image: "/images/backgrounds/city.jpg"
  },
  {
    id: 4,
    title: "Sokak",
    image: "/images/backgrounds/street.jpg"
  }
];

const Home: React.FC = () => {
  const { user } = useAuth();
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BackgroundSlider />
      <div className="min-h-screen flex flex-col items-center justify-center text-white relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Pixel Pulse
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Dijital sanatın kalbi burada atıyor. Eserlerinizi paylaşın, keşfedin ve ilham alın.
          </p>
          <div className="space-x-4">
            <Link
              to="/gallery"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Galeriyi Keşfet
            </Link>
            <Link
              to="/create"
              className="inline-block bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Eser Oluştur
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
