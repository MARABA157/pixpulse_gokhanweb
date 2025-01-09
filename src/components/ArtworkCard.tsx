import React from 'react';

interface ArtworkCardProps {
  imageUrl: string;
  title: string;
  artist: string;
  price: number;
}

export default function ArtworkCard({ imageUrl, title, artist, price }: ArtworkCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">Sanatçı: {artist}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-purple-600 font-bold">{price} TL</span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200">
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
}