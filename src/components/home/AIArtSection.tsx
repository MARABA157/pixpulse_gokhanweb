import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Zap } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const AIArtSection: React.FC = () => {
  const { t } = useTranslation();

  const backgroundVariants = {
    animate: {
      background: [
        'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
        'linear-gradient(45deg, #4ECDC4, #45B7D1)',
        'linear-gradient(45deg, #45B7D1, #FF6B6B)',
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
    tap: { scale: 0.95 },
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t('aiArt.features.feature1.title'),
      description: t('aiArt.features.feature1.description'),
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: t('aiArt.features.feature2.title'),
      description: t('aiArt.features.feature2.description'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('aiArt.features.feature3.title'),
      description: t('aiArt.features.feature3.description'),
    },
  ];

  return (
    <section className="relative overflow-hidden py-20">
      <motion.div
        variants={backgroundVariants}
        animate="animate"
        className="absolute inset-0 opacity-10"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {t('aiArt.title')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              {t('aiArt.description')}
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-purple-600 mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg flex items-center gap-2 group"
            >
              {t('aiArt.tryButton')}
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 mix-blend-overlay" />
              <img
                src="/images/ai-art-preview.jpg"
                alt="AI Art Preview"
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-30 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIArtSection;
