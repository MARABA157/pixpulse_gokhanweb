import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, TrendingUp, Clock, Users, ChevronRight,
  Heart, Eye, MessageSquare 
} from 'lucide-react';

// Test verileri
const TRENDING_ARTWORKS = [
  {
    id: '1',
    title: 'Neon Dreams',
    image: 'https://source.unsplash.com/random/1',
    artist: {
      id: '1',
      name: 'Ayşe Yılmaz',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    style: 'Digital Art',
    likes: 1234,
    views: 5678
  },
  {
    id: '2',
    title: 'Cosmic Journey',
    image: 'https://source.unsplash.com/random/2',
    artist: {
      id: '2',
      name: 'Mehmet Demir',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    style: 'Abstract',
    likes: 890,
    views: 4321
  },
  {
    id: '3',
    title: 'Digital Harmony',
    image: 'https://source.unsplash.com/random/3',
    artist: {
      id: '3',
      name: 'Zeynep Kaya',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    style: 'Surreal',
    likes: 567,
    views: 3210
  },
  {
    id: '4',
    title: 'Future Vision',
    image: 'https://source.unsplash.com/random/4',
    artist: {
      id: '4',
      name: 'Can Yıldız',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    style: 'Futuristic',
    likes: 432,
    views: 2109
  }
];

const RECENT_ARTWORKS = [
  {
    id: '5',
    title: 'Urban Dreams',
    image: 'https://source.unsplash.com/random/5',
    artist: {
      id: '5',
      name: 'Elif Şahin',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    style: 'Urban',
    likes: 321,
    views: 1987
  },
  {
    id: '6',
    title: 'Nature\'s Call',
    image: 'https://source.unsplash.com/random/6',
    artist: {
      id: '6',
      name: 'Burak Kaya',
      avatar: 'https://i.pravatar.cc/150?img=6'
    },
    style: 'Nature',
    likes: 234,
    views: 876
  },
  {
    id: '7',
    title: 'Abstract Mind',
    image: 'https://source.unsplash.com/random/7',
    artist: {
      id: '7',
      name: 'Selin Yılmaz',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    style: 'Abstract',
    likes: 543,
    views: 2345
  },
  {
    id: '8',
    title: 'Digital World',
    image: 'https://source.unsplash.com/random/8',
    artist: {
      id: '8',
      name: 'Mert Demir',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    style: 'Digital',
    likes: 765,
    views: 3456
  }
];

const FEATURED_ARTISTS = [
  {
    id: '1',
    name: 'Ayşe Yılmaz',
    avatar: 'https://i.pravatar.cc/150?img=1',
    followers: 12345,
    artworks: 89
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: 9876,
    artworks: 67
  },
  {
    id: '3',
    name: 'Zeynep Kaya',
    avatar: 'https://i.pravatar.cc/150?img=3',
    followers: 7654,
    artworks: 45
  },
  {
    id: '4',
    name: 'Can Yıldız',
    avatar: 'https://i.pravatar.cc/150?img=4',
    followers: 5432,
    artworks: 34
  }
];

export default function Gallery() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
          <img
            src="https://source.unsplash.com/random/1920x1080/?digital-art"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI Art Market
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Yapay zeka ile oluşturulan benzersiz sanat eserlerini keşfedin, 
            oluşturun ve koleksiyonunuza ekleyin
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/ai-create"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sanat Oluştur
            </Link>
            <Link
              to="/marketplace"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Marketplace'i Keşfet
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Arama ve Filtreler */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sanat eseri veya sanatçı ara..."
                className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
            <button className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Trend Eserler */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-purple-500" size={24} />
              <h2 className="text-2xl font-bold">Trend Eserler</h2>
            </div>
            <Link
              to="/explore"
              className="flex items-center gap-1 text-purple-500 hover:text-purple-400"
            >
              Tümünü Gör
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRENDING_ARTWORKS.map((artwork) => (
              <Link
                key={artwork.id}
                to={`/artwork/${artwork.id}`}
                className="group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={artwork.artist.avatar}
                      alt={artwork.artist.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-400 text-sm">
                      {artwork.artist.name}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-1">
                    {artwork.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {artwork.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {artwork.views}
                      </span>
                    </div>
                    <span>{artwork.style}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Son Eklenenler */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Clock className="text-purple-500" size={24} />
              <h2 className="text-2xl font-bold">Son Eklenenler</h2>
            </div>
            <Link
              to="/explore"
              className="flex items-center gap-1 text-purple-500 hover:text-purple-400"
            >
              Tümünü Gör
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECENT_ARTWORKS.map((artwork) => (
              <Link
                key={artwork.id}
                to={`/artwork/${artwork.id}`}
                className="group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={artwork.artist.avatar}
                      alt={artwork.artist.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-400 text-sm">
                      {artwork.artist.name}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-1">
                    {artwork.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {artwork.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {artwork.views}
                      </span>
                    </div>
                    <span>{artwork.style}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Öne Çıkan Sanatçılar */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Users className="text-purple-500" size={24} />
              <h2 className="text-2xl font-bold">Öne Çıkan Sanatçılar</h2>
            </div>
            <Link
              to="/artists"
              className="flex items-center gap-1 text-purple-500 hover:text-purple-400"
            >
              Tümünü Gör
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_ARTISTS.map((artist) => (
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h3 className="font-semibold mb-2">{artist.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{artist.followers} takipçi</span>
                    <span>{artist.artworks} eser</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}