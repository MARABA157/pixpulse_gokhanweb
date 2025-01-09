import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Yapay Zeka ile Sanat Üretmenin İpuçları',
    excerpt: 'Daha iyi sonuçlar almak için kullanabileceğiniz prompt teknikleri ve öneriler.',
    image: 'https://image.pollinations.ai/prompt/An%20artist%20working%20with%20holographic%20AI%20interface,%20futuristic%20art%20studio,%208k',
    author: 'Ahmet Yılmaz',
    date: '6 Ocak 2025',
    category: 'Rehber'
  },
  {
    id: 2,
    title: 'Bu Ay En Çok Beğenilen AI Sanat Eserleri',
    excerpt: 'Topluluğumuzun en çok beğeni alan çalışmalarını derledik.',
    image: 'https://image.pollinations.ai/prompt/A%20gallery%20wall%20with%20various%20AI%20generated%20artworks,%20modern%20exhibition,%208k',
    author: 'Zeynep Kaya',
    date: '5 Ocak 2025',
    category: 'Galeri'
  },
  {
    id: 3,
    title: 'Dijital Sanatçılar için AI Araçları',
    excerpt: 'Yaratıcılığınızı artıracak en iyi yapay zeka araçlarının listesi.',
    image: 'https://image.pollinations.ai/prompt/Digital%20art%20tools%20and%20brushes%20floating%20in%20space,%20holographic%20interface,%208k',
    author: 'Mehmet Demir',
    date: '4 Ocak 2025',
    category: 'Teknoloji'
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            AI sanat dünyasından en son haberler, ipuçları ve ilham veren içerikler
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
