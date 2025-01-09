import React from 'react';
import VideoGenerator from '../components/video/VideoGenerator';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function SellArt() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Eserinizi Satışa Çıkarın</h1>
        <VideoGenerator />
      </div>
    </ProtectedRoute>
  );
}