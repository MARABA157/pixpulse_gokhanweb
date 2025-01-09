import React from 'react';
import TutorialList from '../components/tutorials/TutorialList';
import TutorialFilters from '../components/tutorials/TutorialFilters';
import { useTutorials } from '../hooks/useTutorials';

export default function Tutorials() {
  const { tutorials, loading, filterByLevel } = useTutorials();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">AI Sanat Eğitimleri</h1>
      
      <TutorialFilters onLevelChange={filterByLevel} />
      
      <div className="mt-8">
        <TutorialList tutorials={tutorials} loading={loading} />
      </div>
    </div>
  );
}