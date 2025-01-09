import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { TutorialLevel } from '../types/tutorial';
import toast from 'react-hot-toast';

interface TutorialFormData {
  title: string;
  content: string;
  level: TutorialLevel;
  duration: number;
}

export function useCreateTutorial() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const createTutorial = async (formData: TutorialFormData) => {
    if (!user) {
      toast.error('Eğitim oluşturmak için giriş yapmalısınız');
      return false;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('tutorials')
        .insert([{
          title: formData.title,
          content: formData.content,
          level: formData.level,
          duration: formData.duration,
          author_id: user.id
        }]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating tutorial:', error);
      toast.error('Eğitim oluşturulurken bir hata oluştu');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTutorial,
    loading
  };
}