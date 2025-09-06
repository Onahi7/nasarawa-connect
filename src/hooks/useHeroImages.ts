import { useState, useEffect } from 'react';

export interface HeroImage {
  _id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  buttonText?: string;
  buttonLink?: string;
}

export const useHeroImages = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/connect-hub/hero-images`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch hero images: ${response.statusText}`);
      }
      
      const data = await response.json();
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      console.error('Hero images fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetch: fetchImages };
};