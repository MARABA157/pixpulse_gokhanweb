import React from 'react';
import { Tutorial } from '../../types/tutorial';
import { Eye, ThumbsUp, Share2 } from 'lucide-react';

interface TutorialSidebarProps {
  tutorial: Tutorial;
}

export default function TutorialSidebar({ tutorial }: TutorialSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Eğitmen</h2>
        <div className="flex items-center space-x-3">
          {tutorial.author.avatar ? (
            <img 
              src={tutorial.author.avatar}
              alt={tutorial.author.name}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-lg">
                {tutorial.author.name[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium">{tutorial.author.name}</p>
            <p className="text-sm text-gray-600">AI Sanat Eğitmeni</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">İstatistikler</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="text-gray-400" size={20} />
              <span>Görüntülenme</span>
            </div>
            <span className="font-medium">{tutorial.views}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="text-gray-400" size={20} />
              <span>Beğeni</span>
            </div>
            <span className="font-medium">{tutorial.likes}</span>
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200">
        <Share2 size={20} />
        <span>Eğitimi Paylaş</span>
      </button>
    </div>
  );
}