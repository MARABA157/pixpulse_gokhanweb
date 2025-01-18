import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import ArtworkCard from '../components/gallery/ArtworkCard';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  creator: {
    username: string;
    avatar_url?: string;
  };
  likes: number;
  has_liked?: boolean;
  has_saved?: boolean;
}

export default function Explore() {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchArtworks();
  }, [user]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('artworks')
        .select(`
          id,
          title,
          description,
          image_url,
          creator:profiles(username, avatar_url),
          likes:likes(count),
          has_liked:likes(user_id)
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (user) {
        query = query.eq('has_liked.user_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      const formattedArtworks = data.map(artwork => ({
        ...artwork,
        creator: artwork.creator,
        likes: artwork.likes?.[0]?.count || 0,
        has_liked: user ? artwork.has_liked?.length > 0 : false
      }));

      setArtworks(formattedArtworks);
    } catch (error: any) {
      console.error('Error fetching artworks:', error);
      toast.error('Resimler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArtworks();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Resim ara..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Ara
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              imageUrl={artwork.image_url}
              description={artwork.description}
              creator={artwork.creator}
              likes={artwork.likes}
              hasLiked={artwork.has_liked}
              onLike={fetchArtworks}
            />
          ))}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {searchQuery ? 'Aramanıza uygun resim bulunamadı' : 'Henüz hiç resim yok'}
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {searchQuery ? 'Farklı anahtar kelimeler deneyebilirsiniz' : 'İlk resmi yükleyen siz olun!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
