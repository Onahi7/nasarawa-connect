import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  is_active: boolean;
  show_on_all_pages: boolean;
  background_color: string | null;
  text_color: string | null;
  start_date: string | null;
  end_date: string | null;
  display_order: number;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setAnnouncements((data || []) as Announcement[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return { announcements, loading, error, refetch: fetchAnnouncements };
};