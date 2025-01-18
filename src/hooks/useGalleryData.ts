import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Artwork } from '../types/gallery';

export interface GalleryArtwork {
  id: string;
  title: string;
  description: string;
  image: string;
  artist: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  views: number;
  createdAt: string;
  category: string;
  style: string;
  tags: string[];
}

export const useGalleryData = () => {
  const [trendingArtworks, setTrendingArtworks] = useState<GalleryArtwork[]>([]);
  const [recentArtworks, setRecentArtworks] = useState<GalleryArtwork[]>([]);
  const [featuredArtists, setFeaturedArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryData();
  }, []);

  const loadGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Trend eserleri yükle
      let query = supabase
        .from('artworks')
        .select('*')
        .order('likes', { ascending: false })
        .limit(8);

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        const trendingData = data.map((artwork: any) => ({
          id: artwork.id,
          title: artwork.title,
          description: artwork.description,
          image: artwork.image,
          artist: {
            id: artwork.artist_id,
            name: artwork.artist_name,
            avatar: artwork.artist_avatar,
          },
          likes: artwork.likes,
          views: artwork.views,
          createdAt: artwork.created_at,
          category: artwork.category,
          style: artwork.style,
          tags: artwork.tags,
        })) as GalleryArtwork[];

        setTrendingArtworks(trendingData);
      }

      // Son eklenen eserleri yükle
      query = supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8);

      const { data: recentData, error: recentError } = await query;

      if (recentError) throw recentError;

      if (recentData) {
        const recentArtworksData = recentData.map((artwork: any) => ({
          id: artwork.id,
          title: artwork.title,
          description: artwork.description,
          image: artwork.image,
          artist: {
            id: artwork.artist_id,
            name: artwork.artist_name,
            avatar: artwork.artist_avatar,
          },
          likes: artwork.likes,
          views: artwork.views,
          createdAt: artwork.created_at,
          category: artwork.category,
          style: artwork.style,
          tags: artwork.tags,
        })) as GalleryArtwork[];

        setRecentArtworks(recentArtworksData);
      }

      // Öne çıkan sanatçıları yükle
      query = supabase
        .from('users')
        .select('*')
        .eq('is_artist', true)
        .order('followers', { ascending: false })
        .limit(4);

      const { data: artistsData, error: artistsError } = await query;

      if (artistsError) throw artistsError;

      if (artistsData) {
        const artistsDataMapped = artistsData.map((artist: any) => ({
          id: artist.id,
          ...artist,
        }));

        setFeaturedArtists(artistsDataMapped);
      }
    } catch (err) {
      console.error('Error loading gallery data:', err);
      setError('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadGalleryData();
  };

  return {
    trendingArtworks,
    recentArtworks,
    featuredArtists,
    loading,
    error,
    refreshData,
  };
};
