import { useState, useEffect } from 'react';
import { Competition } from '../types/competition';
import { supabase } from '../lib/supabase';

export function useCompetitions() {
  const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
  const [pastCompetitions, setPastCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      setLoading(true);
      
      // Aktif yarışmayı yükle
      const { data: activeData, error: activeError } = await supabase
        .from('competitions')
        .select(`
          *,
          submissions:competition_submissions(
            artwork:artworks(*)
          )
        `)
        .eq('status', 'active')
        .single();

      if (activeError && activeError.code !== 'PGRST116') throw activeError;

      // Geçmiş yarışmaları yükle
      const { data: pastData, error: pastError } = await supabase
        .from('competitions')
        .select(`
          *,
          submissions:competition_submissions(
            artwork:artworks(*)
          ),
          winner:artworks(*)
        `)
        .eq('status', 'completed')
        .order('end_date', { ascending: false });

      if (pastError) throw pastError;

      if (activeData) {
        setActiveCompetition({
          ...activeData,
          startDate: new Date(activeData.start_date),
          endDate: new Date(activeData.end_date),
          remainingTime: getRemainingTime(new Date(activeData.end_date)),
          participants: activeData.submissions.length,
          submissions: activeData.submissions.map((s: any) => s.artwork)
        });
      }

      setPastCompetitions(pastData.map((comp: any) => ({
        ...comp,
        startDate: new Date(comp.start_date),
        endDate: new Date(comp.end_date),
        participants: comp.submissions.length,
        submissions: comp.submissions.map((s: any) => s.artwork)
      })));

    } catch (error) {
      console.error('Error loading competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRemainingTime = (endDate: Date): string => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days} gün ${hours} saat`;
  };

  return {
    activeCompetition,
    pastCompetitions,
    loading
  };
}