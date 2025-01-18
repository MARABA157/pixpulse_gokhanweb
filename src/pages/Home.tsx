import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import ArtworkCard from '../components/gallery/ArtworkCard';
import BackgroundSlider from '../components/BackgroundSlider';
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

export default function Home() {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, [user]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      
      const { data: artworksData, error } = await supabase
        .from('artworks')
        .select(`
          *,
          creator:profiles!artworks_creator_id_fkey(username, avatar_url),
          likes(count),
          user_likes:likes!inner(user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching artworks:', error);
        toast.error('Sanat eserleri yüklenirken bir hata oluştu');
        return;
      }

      const formattedArtworks = artworksData.map(artwork => ({
        ...artwork,
        likes_count: artwork.likes?.[0]?.count || 0,
        is_liked: user ? artwork.user_likes?.some(like => like.user_id === user.id) : false
      }));

      setArtworks(formattedArtworks);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BackgroundSlider />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              imageUrl={artwork.image_url}
              description={artwork.description}
              creator={artwork.creator}
              likes={artwork.likes_count}
              hasLiked={artwork.is_liked}
              onLike={fetchArtworks}
            />
          ))}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Henüz hiç resim yok
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              İlk resmi yükleyen siz olun!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
