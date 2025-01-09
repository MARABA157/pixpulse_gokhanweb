import React from 'react';
import { Competition } from '../../types/competition';
import { Trophy, Calendar, Users } from 'lucide-react';

interface CompetitionHistoryProps {
  competitions: Competition[];
  loading: boolean;
}

export default function CompetitionHistory({ competitions, loading }: CompetitionHistoryProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white p-6 rounded-lg">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Geçmiş Yarışmalar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((competition) => (
          <div 
            key={competition.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{competition.title}</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Tamamlandı
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{competition.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-500" size={20} />
                  <span>{competition.prize} TL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-blue-500" size={20} />
                  <span>{new Date(competition.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-purple-500" size={20} />
                  <span>{competition.participants} Katılımcı</span>
                </div>
              </div>

              {competition.winner && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-semibold text-purple-700 mb-2">Kazanan Eser</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={competition.winner.imageUrl} 
                      alt={competition.winner.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{competition.winner.title}</p>
                      <p className="text-sm text-gray-600">by {competition.winner.artist}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}