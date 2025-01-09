import React from 'react';
import { usePromptTemplates } from '../hooks/usePromptTemplates';
import PromptTemplateForm from '../components/prompts/PromptTemplateForm';
import PromptTemplateList from '../components/prompts/PromptTemplateList';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function PromptTemplates() {
  const { templates, loading, deleteTemplate } = usePromptTemplates();

  if (loading) return <LoadingSpinner />;

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Prompt Şablonlarım</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Yeni Şablon Oluştur</h2>
            <div className="bg-white rounded-lg shadow-xl p-6">
              <PromptTemplateForm />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Mevcut Şablonlar</h2>
            <PromptTemplateList
              templates={templates}
              onDelete={deleteTemplate}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}