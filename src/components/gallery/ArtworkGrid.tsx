import React from 'react';
import { Artwork } from '../../types/artwork';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface ArtworkGridProps {
  artworks: Artwork[];
  loading: boolean;
}

export default function ArtworkGrid({ artworks, loading }: ArtworkGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
            <p className="text-gray-600 mb-4">by {artwork.artist}</p>
            
            <div className="flex items-center justify-between text-gray-500">
              <button className="flex items-center space-x-1 hover:text-red-500">
                <Heart size={20} />
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
      ))}
    </div>
  );
}