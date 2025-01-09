import React, { useState } from 'react';
import { usePromptTemplates } from '../../hooks/usePromptTemplates';
import { Save, Tag, FileText, Category } from 'lucide-react';

interface PromptTemplateFormProps {
  onSuccess?: () => void;
}

export default function PromptTemplateForm({ onSuccess }: PromptTemplateFormProps) {
  const { saveTemplate } = usePromptTemplates();
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    category: 'art',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const template = await saveTemplate({
      name: formData.name,
      content: formData.content,
      category: formData.category as 'art' | 'animation' | 'style',
      tags: formData.tags.split(',').map(tag => tag.trim())
    });

    if (template && onSuccess) {
      setFormData({ name: '', content: '', category: 'art', tags: '' });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FileText size={16} className="inline mr-1" />
          Şablon Adı
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Portre Çizimi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Category size={16} className="inline mr-1" />
          Kategori
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="art">Sanat</option>
          <option value="animation">Animasyon</option>
          <option value="style">Stil</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <Tag size={16} className="inline mr-1" />
          Etiketler
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="portre, dijital, modern (virgülle ayırın)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Şablon İçeriği
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
          placeholder="Şablon içeriğini buraya yazın..."
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
      >
        <Save size={20} />
        <span>Şablonu Kaydet</span>
      </button>
    </form>
  );
}