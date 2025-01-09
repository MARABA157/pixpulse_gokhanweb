import React, { useState } from 'react';
import { useCreateTutorial } from '../../hooks/useCreateTutorial';
import { TutorialLevel } from '../../types/tutorial';
import { Clock, BookOpen, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateTutorialForm() {
  const { createTutorial, loading } = useCreateTutorial();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    level: TutorialLevel.BEGINNER,
    duration: 30
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createTutorial(formData);
    if (success) {
      setFormData({ title: '', content: '', level: TutorialLevel.BEGINNER, duration: 30 });
      toast.success('Eğitim başarıyla oluşturuldu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eğitim Başlığı
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="AI ile Portre Çizimi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          İçerik
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-48"
          placeholder="Markdown formatında eğitim içeriği..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seviye
          </label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value as TutorialLevel })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {Object.values(TutorialLevel).map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Süre (dakika)
          </label>
          <input
            type="number"
            min="5"
            max="180"
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
        >
          <BookOpen size={20} />
          <span>{loading ? 'Oluşturuluyor...' : 'Eğitimi Oluştur'}</span>
        </button>
      </div>
    </form>
  );
}