import { useState, useEffect } from 'react';

export interface Announcement {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isActive: boolean;
  showOnAllPages: boolean;
  backgroundColor: string | null;
  textColor: string | null;
  startDate: string | null;
  endDate: string | null;
  displayOrder: number;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/connect-hub/announcements`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch announcements: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAnnouncements(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch announcements');
      console.error('Announcements fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return { announcements, loading, error, refetch: fetchAnnouncements };
};