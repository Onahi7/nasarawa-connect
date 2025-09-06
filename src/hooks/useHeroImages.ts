import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface HeroImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export const useHeroImages = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetch: fetchImages };
};