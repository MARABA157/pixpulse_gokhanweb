import React from 'react';
import CreateTutorialForm from '../components/tutorials/CreateTutorialForm';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function CreateTutorial() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Yeni Eğitim Oluştur</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <CreateTutorialForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}