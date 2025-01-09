import { useState, useEffect } from 'react';
import { Artwork, Categories } from '../types/artwork';
import { supabase } from '../lib/supabase';

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Categories | null>(null);

  useEffect(() => {
    loadArtworks();
  }, [category]);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      let query = supabase.from('artworks').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      setArtworks(data);
    } catch (error) {
      console.error('Error loading artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (newCategory: Categories | null) => {
    setCategory(newCategory);
  };

  return {
    artworks,
    loading,
    filterByCategory
  };
}