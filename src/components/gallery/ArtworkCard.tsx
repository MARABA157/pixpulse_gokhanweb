import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, BookmarkPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Artwork } from '../../types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
  onLike?: () => Promise<void>;
  onSave?: () => Promise<void>;
  onShare?: () => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onLike,
  onSave,
  onShare,
}) => {
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like artworks');
      return;
    }
    if (onLike) {
      try {
        await onLike();
        toast.success(artwork.has_liked ? 'Removed like' : 'Added like');
      } catch (error) {
        console.error('Error liking artwork:', error);
        toast.error('Failed to like artwork');
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save artworks');
      return;
    }
    if (onSave) {
      try {
        await onSave();
        toast.success('Artwork saved to collection');
      } catch (error) {
        console.error('Error saving artwork:', error);
        toast.error('Failed to save artwork');
      }
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // Default share behavior
      navigator.share?.({
        title: artwork.title,
        text: artwork.description,
        url: window.location.href,
      }).catch((error) => {
        console.error('Error sharing:', error);
        // Fallback to copying link
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/artwork/${artwork.id}`}>
        <div className="relative h-48">
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
          {artwork.is_for_sale && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
              For Sale
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Link to={`/artwork/${artwork.id}`}>
            <h3 className="text-lg font-semibold hover:text-blue-600 truncate">
              {artwork.title}
            </h3>
          </Link>
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`p-1 rounded-full hover:bg-gray-100 ${
                artwork.has_liked ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <Heart
                size={20}
                className={artwork.has_liked ? 'fill-current' : ''}
              />
            </button>
            <button
              onClick={handleSave}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <BookmarkPlus size={20} />
            </button>
            <button
              onClick={handleShare}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
        <Link to={`/profile/${artwork.creator.username}`}>
          <p className="text-sm text-gray-600 hover:text-blue-600">
            by {artwork.creator.username}
          </p>
        </Link>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {artwork.description}
        </p>
        {artwork.price && (
          <p className="text-sm font-semibold text-blue-600 mt-2">
            ${artwork.price.toFixed(2)}
          </p>
        )}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>{artwork.likes_count} likes</span>
          <span>{new Date(artwork.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;