import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { UserPreferences } from '../types/preferences';
import toast from 'react-hot-toast';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'tr',
  aiStyle: {
    artStyle: 'modern',
    colorPalette: 'vibrant',
    complexity: 'moderate'
  },
  notifications: {
    email: true,
    browser: true
  },
  displayMode: 'grid',
  autoplay: true
};

export function usePreferences() {
  const { user } = useAuthContext();
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('preferences')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!user) {
      toast.error('Tercihlerinizi kaydetmek için giriş yapmalısınız');
      return;
    }

    try {
      setLoading(true);
      const updatedPreferences = { ...preferences, ...newPreferences };

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          preferences: updatedPreferences
        });

      if (error) throw error;

      setPreferences(updatedPreferences);
      toast.success('Tercihleriniz kaydedildi');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Tercihleriniz kaydedilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return {
    preferences,
    loading,
    updatePreferences
  };
}