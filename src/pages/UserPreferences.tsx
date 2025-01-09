import React from 'react';
import PreferencesForm from '../components/preferences/PreferencesForm';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function UserPreferences() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Kullanıcı Tercihleri</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <PreferencesForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}