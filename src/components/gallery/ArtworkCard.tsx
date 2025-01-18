import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabase';
import { toast } from 'react-hot-toast';
import { Heart, Save, Share2 } from 'lucide-react';

interface ArtworkCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  creator: {
    username: string;
    avatar_url?: string;
  };
  likes: number;
  hasLiked: boolean;
  onLike?: () => void;
}

export default function ArtworkCard({
  id,
  title,
  imageUrl,
  description,
  creator,
  likes,
  hasLiked,
  onLike,
}: ArtworkCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast.error('Beğenmek için giriş yapmalısınız');
      return;
    }

    try {
      setLoading(true);

      if (isLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ user_id: user.id, artwork_id: id });

        if (error) throw error;

        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: user.id, artwork_id: id });

        if (error) throw error;

        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }

      if (onLike) onLike();
    } catch (error) {
      console.error('Like error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Kaydetmek için giriş yapmalısınız');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('saves')
        .insert({ user_id: user.id, artwork_id: id });

      if (error) throw error;

      toast.success('Kaydedildi');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: title,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Paylaşım yapılamadı');
    }
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-between">
          <Link
            to={`/profile/${creator.username}`}
            className="text-white hover:underline"
          >
            {creator.username}
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={loading}
              className="text-white hover:text-pink-500 transition-colors"
            >
              <Heart
                className={`h-6 w-6 ${isLiked ? 'fill-current text-pink-500' : ''}`}
              />
              <span className="sr-only">Like</span>
              {likeCount > 0 && (
                <span className="ml-1 text-sm">{likeCount}</span>
              )}
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="text-white hover:text-yellow-500 transition-colors"
            >
              <Save className="h-6 w-6" />
              <span className="sr-only">Save</span>
            </button>

            <button
              onClick={handleShare}
              className="text-white hover:text-blue-500 transition-colors"
            >
              <Share2 className="h-6 w-6" />
              <span className="sr-only">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}