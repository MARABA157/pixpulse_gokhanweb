import React from 'react';
import ArtworkCard from '../ArtworkCard';
import { ArtworkType } from '../../types/artwork';

const featuredArtworks: ArtworkType[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1706001151251-69843c11c4a3",
    title: "Dijital Rüya",
    artist: "Ayşe Yılmaz",
    price: 1500
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1705947120085-f8891c206b2d",
    title: "Soyut Düşünceler",
    artist: "Mehmet Demir",
    price: 2000
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1706463629335-d92264bbfd6f",
    title: "Yapay Evren",
    artist: "Zeynep Kaya",
    price: 1750
  }
];

export default function FeaturedArtworks() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Öne Çıkan Eserler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArtworks.map((artwork, index) => (
          <ArtworkCard key={index} {...artwork} />
        ))}
      </div>
    </section>
  );
}