import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Edit2, Grid, Heart, Image, Settings, Share2 } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const stats = [
    { label: 'Eserler', value: '127', icon: Image },
    { label: 'Beğeniler', value: '3.4K', icon: Heart },
    { label: 'Koleksiyonlar', value: '12', icon: Grid },
    { label: 'Paylaşımlar', value: '245', icon: Share2 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profil Başlığı */}
      <div className="relative">
        {/* Kapak Fotoğrafı */}
        <div className="h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl overflow-hidden relative">
          <button className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
            <Camera size={20} />
          </button>
        </div>

        {/* Profil Fotoğrafı */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-3xl">
                  {user?.email?.[0].toUpperCase()}
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              <Camera size={16} />
            </button>
          </div>
        </div>

        {/* Profil Düzenleme Butonu */}
        <div className="absolute top-4 right-4 space-x-2">
          <button className="bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors inline-flex items-center space-x-2">
            <Edit2 size={16} />
            <span>Profili Düzenle</span>
          </button>
          <button className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Profil Bilgileri */}
      <div className="mt-20 mb-8">
        <h1 className="text-2xl font-bold text-white">
          {user?.displayName || 'Kullanıcı Adı'}
        </h1>
        <p className="text-gray-400 mt-1">@{user?.email?.split('@')[0] || 'kullanici'}</p>
        <p className="text-gray-300 mt-4 max-w-2xl">
          Dijital sanat tutkunu. AI ile sanat üretmeyi seviyorum. Minimalist tasarımlar ve soyut kompozisyonlar üzerine çalışıyorum.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-center mb-2">
              <stat.icon size={24} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sekmeler */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          <button className="text-purple-500 border-b-2 border-purple-500 px-4 py-2">
            Eserlerim
          </button>
          <button className="text-gray-400 hover:text-white px-4 py-2">
            Koleksiyonlarım
          </button>
          <button className="text-gray-400 hover:text-white px-4 py-2">
            Beğendiklerim
          </button>
        </nav>
      </div>

      {/* Eserler Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-800 rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
              <Image size={32} className="text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
