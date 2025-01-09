import React from 'react';
import { useTutorialDetail } from '../hooks/useTutorialDetail';
import TutorialContent from '../components/tutorials/TutorialContent';
import TutorialSidebar from '../components/tutorials/TutorialSidebar';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function TutorialDetail() {
  const tutorialId = window.location.pathname.split('/').pop() || '';
  const { tutorial, loading, error } = useTutorialDetail(tutorialId);

  if (loading) return <LoadingSpinner />;
  if (error || !tutorial) return <div>Eğitim bulunamadı</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TutorialContent tutorial={tutorial} />
        </div>
        <div className="lg:col-span-1">
          <TutorialSidebar tutorial={tutorial} />
        </div>
      </div>
    </div>
  );
}