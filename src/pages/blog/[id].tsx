import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

interface BlogData {
  [key: number]: BlogPost;
}

const blogData: BlogData = {
  1: {
    id: 1,
    title: 'Yapay Zeka ile Sanat Üretmenin İpuçları',
    content: `
      Yapay zeka ile sanat üretirken daha iyi sonuçlar almak için bazı önemli noktalara dikkat etmek gerekiyor. 
      İşte size yardımcı olacak bazı ipuçları:

      1. Detaylı Promptlar Kullanın
      Yapay zekaya ne kadar detaylı talimat verirseniz, o kadar istediğiniz sonuca yakın çıktılar alırsınız. 
      Örneğin "bir manzara" yerine "güneş batımında, mor ve turuncu tonlarında bulutların olduğu, deniz kenarında bir manzara" 
      şeklinde daha detaylı bir prompt kullanın.

      2. Stil Belirtin
      İstediğiniz sanat stilini mutlaka belirtin. Örneğin: yağlı boya, dijital art, pixel art, minimalist, 
      empresyonist gibi stiller kullanabilirsiniz.

      3. Referans Sanatçılar Ekleyin
      Beğendiğiniz sanatçıların stillerini referans gösterebilirsiniz. "Van Gogh tarzında" veya 
      "Picasso'nun mavi dönemi stilinde" gibi ifadeler kullanabilirsiniz.
    `,
    image: 'https://image.pollinations.ai/prompt/An%20artist%20working%20with%20holographic%20AI%20interface,%20futuristic%20art%20studio,%208k',
    author: 'Ahmet Yılmaz',
    date: '6 Ocak 2025',
    category: 'Rehber'
  }
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error('Blog ID bulunamadı');
        }

        const postData = blogData[Number(id)];
        if (!postData) {
          throw new Error('Blog yazısı bulunamadı');
        }

        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20 py-20">
      <article className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden"
        >
          <div className="relative h-96">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
              {post.category}
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {post.title}
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
