import React from 'react';
import { Tutorial } from '../../types/tutorial';
import { Clock, Eye, ThumbsUp, ChevronRight } from 'lucide-react';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Başlangıç': return 'bg-green-100 text-green-700';
      case 'Orta Seviye': return 'bg-blue-100 text-blue-700';
      case 'İleri Seviye': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{tutorial.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${getLevelColor(tutorial.level)}`}>
            {tutorial.level}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{tutorial.duration} dk</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={16} />
            <span>{tutorial.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsUp size={16} />
            <span>{tutorial.likes}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            {tutorial.author.avatar ? (
              <img 
                src={tutorial.author.avatar} 
                alt={tutorial.author.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-semibold">
                  {tutorial.author.name[0].toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-gray-600">{tutorial.author.name}</span>
          </div>

          <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700">
            <span>Eğitime Git</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}