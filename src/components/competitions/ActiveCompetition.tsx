import React from 'react';
import { Competition } from '../../types/competition';
import { Trophy, Clock, Users } from 'lucide-react';

interface ActiveCompetitionProps {
  competition: Competition;
}

export default function ActiveCompetition({ competition }: ActiveCompetitionProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-xl text-white p-8 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{competition.title}</h2>
        <div className="flex items-center space-x-2">
          <Trophy size={24} className="text-yellow-300" />
          <span className="font-bold">{competition.prize} TL Ödül</span>
        </div>
      </div>

      <p className="mb-6 text-lg">{competition.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center space-x-3">
          <Clock size={20} />
          <div>
            <p className="text-sm opacity-75">Kalan Süre</p>
            <p className="font-semibold">{competition.remainingTime}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Users size={20} />
          <div>
            <p className="text-sm opacity-75">Katılımcı</p>
            <p className="font-semibold">{competition.participants} Sanatçı</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-200">
        Yarışmaya Katıl
      </button>
    </div>
  );
}