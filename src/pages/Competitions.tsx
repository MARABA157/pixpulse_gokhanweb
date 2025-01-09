import React from 'react';
import ActiveCompetition from '../components/competitions/ActiveCompetition';
import CompetitionHistory from '../components/competitions/CompetitionHistory';
import { useCompetitions } from '../hooks/useCompetitions';

export default function Competitions() {
  const { activeCompetition, pastCompetitions, loading } = useCompetitions();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">AI Sanat Yarışmaları</h1>
      
      {activeCompetition && (
        <ActiveCompetition competition={activeCompetition} />
      )}
      
      <CompetitionHistory competitions={pastCompetitions} loading={loading} />
    </div>
  );
}