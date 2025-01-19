import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Collection } from '../types/artwork';

export function useCollections() {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchCollections();
  }, [user]);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setError('Failed to fetch collections');
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (name: string, description?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('collections')
        .insert([
          {
            user_id: user.id,
            name,
            description,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setCollections((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      setCollections((prev) => prev.filter((collection) => collection.id !== id));
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error;
    }
  };

  const updateCollection = async (
    id: string,
    updates: Partial<Omit<Collection, 'id' | 'user_id' | 'created_at'>>
  ) => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;

      setCollections((prev) =>
        prev.map((collection) =>
          collection.id === id ? { ...collection, ...data } : collection
        )
      );

      return data;
    } catch (error) {
      console.error('Error updating collection:', error);
      throw error;
    }
  };

  return {
    collections,
    loading,
    error,
    createCollection,
    deleteCollection,
    updateCollection,
    refetch: fetchCollections,
  };
}

export default useCollections;
