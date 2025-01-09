import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { features } from '../data/features';
import { exploreImages } from '../data/explore';

const backgrounds = [
  {
    id: 1,
    title: "Deniz",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Kumsal",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Şehir",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Sokak",
    image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=1920&auto=format&fit=crop"
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
    <div className="min-h-screen flex flex-col">
      {/* Background Images */}
      <div className="fixed inset-0 w-full h-full">
        {backgrounds.map((bg, index) => (
          <div
            key={bg.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentBackground ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <img
              src={bg.image}
              alt={bg.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        {/* Hero Section */}
        <div className="flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              PixelPulse
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-white"
            >
              Yapay Zeka ile Fotoğraflarınızı Dönüştürün
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                {user ? "Dashboard'a Git" : "Ücretsiz Başla"}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-lg bg-gradient-to-br ${feature.gradient} text-white`}
              >
                <feature.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="mb-4">{feature.description}</p>
                <Link
                  to={feature.to}
                  className="inline-block bg-black hover:bg-gray-900 transition-colors px-6 py-2 rounded-full text-sm font-medium text-white"
                >
                  Oluştur
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explore Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Keşfet</h2>
            <div className="space-y-8">
              <div className="overflow-hidden">
                <div className="animate-scroll-right flex gap-4">
                  {[...exploreImages.row1, ...exploreImages.row1].map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Explore ${index + 1}`}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="animate-scroll-left flex gap-4">
                  {[...exploreImages.row2, ...exploreImages.row2].map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Explore ${index + 5}`}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
