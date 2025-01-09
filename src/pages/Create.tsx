import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Upload, Save, Undo, Redo, Download, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function Create() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      // Pollinations.ai API'si ile görsel üret
      const response = await fetch('https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt), {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
      toast.success('Görsel başarıyla oluşturuldu!');
    } catch (err) {
      console.error('Görsel üretme hatası:', err);
      setError('Görsel üretilirken bir hata oluştu. Lütfen tekrar deneyin.');
      toast.error('Görsel üretilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!imageUrl || !user) return;

    setSaving(true);
    try {
      // Görsel URL'inden blob al
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Firebase Storage'a yükle
      const storage = getStorage();
      const filename = `artworks/${user.uid}/${Date.now()}.png`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      // Firestore'a kaydet
      const db = getFirestore();
      await addDoc(collection(db, 'artworks'), {
        userId: user.uid,
        prompt: prompt,
        imageUrl: downloadUrl,
        createdAt: new Date().toISOString(),
      });

      toast.success('Görsel başarıyla kaydedildi!');
    } catch (err) {
      console.error('Kaydetme hatası:', err);
      toast.error('Görsel kaydedilirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    if (imageUrl) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pixelpulse-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('İndirme hatası:', err);
        toast.error('Görsel indirilirken bir hata oluştu');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            AI ile <span className="text-gradient">Sanat Üret</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Hayal ettiğin her şeyi sanata dönüştür
          </p>
        </div>

        {/* Prompt Girişi */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Sanatını tarif et... (örn: A cyberpunk city at night with neon lights)"
            className="w-full h-32 bg-black/50 text-white placeholder-gray-400 rounded-xl p-4 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wand2 className="w-4 h-4" />
              <span>Pollinations.ai ile üretim</span>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className={`btn btn-primary px-6 py-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Üretiliyor...' : 'Üret'}
            </button>
          </div>
        </div>

        {/* Sonuç Alanı */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6"
        >
          <div className="aspect-square bg-black/50 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated artwork"
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload className="w-12 h-12 text-gray-500" />
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Araç Çubuğu */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                disabled={!imageUrl}
                onClick={() => setImageUrl(null)}
              >
                <Undo className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors opacity-50 cursor-not-allowed">
                <Redo className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="btn btn-secondary px-4 py-2 disabled:opacity-50"
                disabled={!imageUrl}
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 mr-2" />
                İndir
              </button>
              <button
                className="btn btn-primary px-4 py-2 disabled:opacity-50"
                disabled={!imageUrl || !user || saving}
                onClick={handleSave}
              >
                <Save className="w-5 h-5 mr-2" />
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button
                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                disabled={!imageUrl}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!user && imageUrl && (
            <div className="mt-4 p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-400">
              Görseli kaydetmek için giriş yapmanız gerekiyor.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
