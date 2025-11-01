import { useState, useEffect } from 'react';

export interface Member {
  _id: string;
  name: string;
  position: string;
  bio: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  email?: string;
  phone?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/connect-hub/members`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
      }
      
      const data = await response.json();
      setMembers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch members');
      console.error('Members fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return { members, loading, error, refetch: fetchMembers };
};