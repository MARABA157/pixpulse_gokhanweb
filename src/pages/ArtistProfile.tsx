import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, Link as LinkIcon, Twitter, Instagram,
  Heart, MessageCircle, Share2, Grid, BookMarked,
  Settings, Award, Users, Star
} from 'lucide-react';

export default function ArtistProfile() {
  const { artistId } = useParams();
  const [activeTab, setActiveTab] = useState('works');

  // Örnek sanatçı verisi
  const artist = {
    name: 'Ayşe Yılmaz',
    username: '@ayseyilmaz',
    avatar: 'https://i.pravatar.cc/300?img=1',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200',
    location: 'İstanbul, Türkiye',
    bio: 'Dijital sanat ve AI art konusunda tutkulu bir sanatçı. Teknoloji ve sanatı birleştirerek yeni deneyimler yaratmayı seviyorum.',
    website: 'www.ayseyilmaz.art',
    twitter: '@ayseyilmaz',
    instagram: '@ayseyilmaz.art',
    stats: {
      followers: '12.5K',
      following: '892',
      likes: '45.2K'
    },
    achievements: [
      { icon: Star, label: 'Top Sanatçı', color: 'text-yellow-500' },
      { icon: Award, label: 'Verified', color: 'text-blue-500' },
    ]
  };

  const artworks = [
    {
      id: 1,
      title: 'Neon Dreams',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800',
      likes: '1.2K',
      comments: 342
    },
    {
      id: 2,
      title: 'Digital Harmony',
      image: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?q=80&w=800',
      likes: '3.4K',
      comments: 567
    },
    {
      id: 3,
      title: 'Cosmic Journey',
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=800',
      likes: '2.8K',
      comments: 421
    },
    // Daha fazla eser eklenebilir
  ];

  const collections = [
    {
      id: 1,
      title: 'En İyiler',
      count: 24,
      cover: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800'
    },
    {
      id: 2,
      title: 'Portreler',
      count: 18,
      cover: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?q=80&w=800'
    },
    // Daha fazla koleksiyon eklenebilir
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Kapak Fotoğrafı */}
      <div className="relative h-80">
        <img
          src={artist.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
      </div>

      {/* Profil Bilgileri */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-32">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar ve Temel Bilgiler */}
              <div className="flex-shrink-0">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-32 h-32 rounded-xl border-4 border-gray-800"
                />
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{artist.name}</h1>
                    <p className="text-gray-400">{artist.username}</p>
                  </div>
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                      Mesaj Gönder
                    </button>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Takip Et
                    </button>
                    <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                      <Settings size={20} />
                    </button>
                  </div>
                </div>

                {/* Bio ve Linkler */}
                <p className="text-gray-300 mb-4 max-w-2xl">
                  {artist.bio}
                </p>

                <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {artist.location}
                  </span>
                  <a href={`https://${artist.website}`} className="flex items-center gap-1 hover:text-white">
                    <LinkIcon size={16} />
                    {artist.website}
                  </a>
                  <a href={`https://twitter.com/${artist.twitter}`} className="flex items-center gap-1 hover:text-white">
                    <Twitter size={16} />
                    {artist.twitter}
                  </a>
                  <a href={`https://instagram.com/${artist.instagram}`} className="flex items-center gap-1 hover:text-white">
                    <Instagram size={16} />
                    {artist.instagram}
                  </a>
                </div>

                {/* İstatistikler */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-gray-400" />
                    <div>
                      <div className="font-semibold">{artist.stats.followers}</div>
                      <div className="text-sm text-gray-400">Takipçi</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-gray-400" />
                    <div>
                      <div className="font-semibold">{artist.stats.following}</div>
                      <div className="text-sm text-gray-400">Takip</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={20} className="text-gray-400" />
                    <div>
                      <div className="font-semibold">{artist.stats.likes}</div>
                      <div className="text-sm text-gray-400">Beğeni</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Başarılar */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
              {artist.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-full"
                >
                  <achievement.icon size={16} className={achievement.color} />
                  <span className="text-sm font-medium">{achievement.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="mt-8">
          <div className="flex gap-8 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('works')}
              className={\`pb-4 px-2 \${
                activeTab === 'works'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              } transition-colors flex items-center gap-2\`}
            >
              <Grid size={20} />
              Eserler
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={\`pb-4 px-2 \${
                activeTab === 'collections'
                  ? 'text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              } transition-colors flex items-center gap-2\`}
            >
              <BookMarked size={20} />
              Koleksiyonlar
            </button>
          </div>

          {/* Eserler Grid */}
          {activeTab === 'works' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden"
                >
                  <div className="aspect-square">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Heart size={16} /> {artwork.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={16} /> {artwork.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Koleksiyonlar Grid */}
          {activeTab === 'collections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden"
                >
                  <div className="aspect-[3/2]">
                    <img
                      src={collection.cover}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-1">{collection.title}</h3>
                      <p className="text-gray-300">{collection.count} eser</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
