import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Hero from './home/Hero';
import FeaturedArtworks from './home/FeaturedArtworks';
import Profile from './Profile';
import LoadingSpinner from './ui/LoadingSpinner';

export default function MainContent() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Profile />;
  }

  return (
    <main className="container mx-auto px-4">
      <Hero />
      <FeaturedArtworks />
    </main>
  );
}