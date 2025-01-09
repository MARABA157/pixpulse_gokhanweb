import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useLikes(artworkId: string) {
  const { user } = useAuthContext();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user) {
      checkLikeStatus();
    }
  }, [user, artworkId]);

  const checkLikeStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('artwork_likes')
        .select('*')
        .eq('artwork_id', artworkId)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setIsLiked(!!data);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      toast.error('Beğenmek için giriş yapmalısınız');
      return;
    }

    try {
      if (isLiked) {
        const { error } = await supabase
          .from('artwork_likes')
          .delete()
          .eq('artwork_id', artworkId)
          .eq('user_id', user.id);

        if (error) throw error;
        setIsLiked(false);
      } else {
        const { error } = await supabase
          .from('artwork_likes')
          .insert([{ artwork_id: artworkId, user_id: user.id }]);

        if (error) throw error;
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Bir hata oluştu');
    }
  };

  return {
    isLiked,
    toggleLike,
  };
}