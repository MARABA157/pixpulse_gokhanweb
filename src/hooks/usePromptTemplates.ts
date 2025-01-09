import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { PromptTemplate } from '../types/prompt';
import toast from 'react-hot-toast';

export function usePromptTemplates() {
  const { user } = useAuthContext();
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadTemplates();
    }
  }, [user]);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_templates')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data.map(template => ({
        ...template,
        createdAt: new Date(template.created_at)
      })));
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Şablonlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = async (template: Omit<PromptTemplate, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) {
      toast.error('Şablon kaydetmek için giriş yapmalısınız');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('prompt_templates')
        .insert([{
          ...template,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      const newTemplate = {
        ...data,
        createdAt: new Date(data.created_at)
      };
      
      setTemplates(prev => [newTemplate, ...prev]);
      toast.success('Şablon başarıyla kaydedildi');
      return newTemplate;
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Şablon kaydedilirken bir hata oluştu');
      return null;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prompt_templates')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      setTemplates(prev => prev.filter(t => t.id !== id));
      toast.success('Şablon başarıyla silindi');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Şablon silinirken bir hata oluştu');
    }
  };

  return {
    templates,
    loading,
    saveTemplate,
    deleteTemplate
  };
}