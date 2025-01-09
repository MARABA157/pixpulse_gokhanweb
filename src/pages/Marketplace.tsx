import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Grid, List, Sparkles,
  TrendingUp, Clock, DollarSign, Heart,
  Eye, MessageCircle
} from 'lucide-react';
import { marketplaceService } from '../services/marketplace';
import { MarketplaceArtwork } from '../types/marketplace';

export default function Marketplace() {
  const [artworks, setArtworks] = useState<MarketplaceArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'createdAt' | 'likes'>('createdAt');
  const [lastDoc, setLastDoc] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'digital-art', name: 'Dijital Sanat' },
    { id: 'illustration', name: 'İllüstrasyon' },
    { id: 'photography', name: 'Fotoğraf' },
    { id: '3d', name: '3D' },
    { id: 'animation', name: 'Animasyon' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'En Yeni', icon: Clock },
    { value: 'price', label: 'Fiyat', icon: DollarSign },
    { value: 'likes', label: 'Popüler', icon: TrendingUp },
  ];

  useEffect(() => {
    loadArtworks();
  }, [selectedCategory, sortBy]);

  const loadArtworks = async (loadMore = false) => {
    try {
      setLoading(true);
      const category = selectedCategory === 'all' ? undefined : selectedCategory;
      const { artworks: newArtworks, lastDoc: newLastDoc } = await marketplaceService.getArtworks(
        category,
        sortBy,
        loadMore ? lastDoc : null
      );

      setArtworks(loadMore ? [...artworks, ...newArtworks] : newArtworks);
      setLastDoc(newLastDoc);
    } catch (error) {
      console.error('Error loading artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            NFT Marketplace
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Benzersiz dijital sanat eserlerini keşfedin, satın alın ve satın
          </p>
        </div>

        {/* Arama ve Filtreler */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-96 relative">
              <input
                type="text"
                placeholder="Sanat eseri veya sanatçı ara..."
                className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Kategoriler */}
          <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full ${selectedCategory === category.id ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} transition-colors whitespace-nowrap`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Eserler Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <Link
                key={artwork.id}
                to={`/marketplace/${artwork.id}`}
                className="group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.isAuction && (
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Açık Artırma
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={artwork.artist.avatar}
                      alt={artwork.artist.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-400 text-sm">{artwork.artist.name}</span>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-1">{artwork.title}</h3>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-purple-500">
                      <Sparkles size={16} />
                      <span className="font-semibold">
                        {artwork.price.amount} {artwork.price.currency}
                      </span>
                    </div>
                    {artwork.highestBid && (
                      <div className="text-sm text-gray-400">
                        En yüksek teklif: {artwork.highestBid.amount} {artwork.highestBid.currency}
                      </div>
                    )}
                  </div>

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
                    {artwork.endTime && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(artwork.endTime).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {artworks.map((artwork) => (
              <Link
                key={artwork.id}
                to={`/marketplace/${artwork.id}`}
                className="block bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors"
              >
                <div className="flex gap-6 p-4">
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={artwork.artist.avatar}
                        alt={artwork.artist.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-gray-400">{artwork.artist.name}</span>
                      {artwork.isAuction && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                          Açık Artırma
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{artwork.description}</p>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2 text-purple-500">
                        <Sparkles size={20} />
                        <span className="font-semibold text-lg">
                          {artwork.price.amount} {artwork.price.currency}
                        </span>
                      </div>
                      {artwork.highestBid && (
                        <div className="text-gray-400">
                          En yüksek teklif: {artwork.highestBid.amount} {artwork.highestBid.currency}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-gray-400">
                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {artwork.likes} beğeni
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {artwork.views} görüntülenme
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {artwork.bids.length} teklif
                      </span>
                      {artwork.endTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {new Date(artwork.endTime).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Daha Fazla Yükle */}
        {lastDoc && (
          <div className="text-center mt-12">
            <button
              onClick={() => loadArtworks(true)}
              disabled={loading}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Yükleniyor...' : 'Daha Fazla Göster'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}