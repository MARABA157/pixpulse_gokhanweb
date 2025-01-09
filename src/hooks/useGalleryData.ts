import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from '../config/firebase';

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
      const trendingQuery = query(
        collection(db, 'artworks'),
        orderBy('likes', 'desc'),
        limit(8)
      );
      
      const trendingSnapshot = await getDocs(trendingQuery);
      const trendingData = trendingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryArtwork[];
      
      setTrendingArtworks(trendingData);

      // Son eklenen eserleri yükle
      const recentQuery = query(
        collection(db, 'artworks'),
        orderBy('createdAt', 'desc'),
        limit(8)
      );
      
      const recentSnapshot = await getDocs(recentQuery);
      const recentData = recentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryArtwork[];
      
      setRecentArtworks(recentData);

      // Öne çıkan sanatçıları yükle
      const artistsQuery = query(
        collection(db, 'users'),
        where('isArtist', '==', true),
        orderBy('followers', 'desc'),
        limit(4)
      );
      
      const artistsSnapshot = await getDocs(artistsQuery);
      const artistsData = artistsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setFeaturedArtists(artistsData);

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
    refreshData
  };
};
