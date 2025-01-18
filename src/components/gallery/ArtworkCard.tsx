import React from 'react';
import { Artwork } from '../../types/artwork';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLikes } from '../../hooks/useLikes';

interface ArtworkCardProps {
  artwork: {
    id: string;
    title: string;
    imageUrl: string;
    artist: string;
    likes?: number;
    createdAt: string;
  };
  onLike?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function ArtworkCard({ artwork, onLike, onClick }: ArtworkCardProps) {
  const { user } = useAuthContext();
  const { isLiked, toggleLike } = useLikes(artwork.id);

  const handleLikeClick = () => {
    if (!user) return;
    toggleLike();
    if (onLike) onLike(artwork.id);
  };

  const handleClick = () => {
    if (onClick) onClick(artwork.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-200" onClick={handleClick}>
      <div className="relative group">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">{artwork.title}</h3>
            <p className="text-sm text-gray-600">by {artwork.artist}</p>
          </div>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            {artwork.category}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-gray-500">
          <button 
            onClick={handleLikeClick}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{artwork.likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <MessageCircle size={20} />
            <span>{artwork.comments}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-500">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}