/**
 * Custom hooks for CMS data management
 * These hooks provide easy access to CMS API with loading states and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { cmsApi, type HomepageContent, type TeamMember, type AnalyticsData } from '@/services/cms-api';
import { useToast } from '@/hooks/use-toast';

// =============== HOMEPAGE CONTENT HOOKS ===============

export function useHomepageContent(params?: {
  section?: string;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}) {
  const [data, setData] = useState<HomepageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cmsApi.getHomepageContent(params);
      setData(response.data);
      setTotal(response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch homepage content';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [params, toast]);

  const createContent = async (contentData: Omit<HomepageContent, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newContent = await cmsApi.createHomepageContent(contentData);
      setData(prev => [...prev, newContent]);
      setTotal(prev => prev + 1);
      toast({
        title: 'Success',
        description: 'Homepage content created successfully',
      });
      return newContent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create homepage content';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateContent = async (id: string, contentData: Partial<HomepageContent>) => {
    try {
      const updatedContent = await cmsApi.updateHomepageContent(id, contentData);
      setData(prev => prev.map(item => item._id === id ? updatedContent : item));
      toast({
        title: 'Success',
        description: 'Homepage content updated successfully',
      });
      return updatedContent;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update homepage content';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await cmsApi.deleteHomepageContent(id);
      setData(prev => prev.filter(item => item._id !== id));
      setTotal(prev => prev - 1);
      toast({
        title: 'Success',
        description: 'Homepage content deleted successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete homepage content';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    content: data,
    loading,
    error,
    total,
    refetch: fetchData,
    createContent,
    updateContent,
    deleteContent,
  };
}

// =============== TEAM MEMBERS HOOKS ===============

export function useTeamMembers(params?: {
  category?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  limit?: number;
  offset?: number;
}) {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cmsApi.getTeamMembers(params);
      setData(response.data);
      setTotal(response.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team members';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [params, toast]);

  const createMember = async (memberData: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newMember = await cmsApi.createTeamMember(memberData);
      setData(prev => [...prev, newMember]);
      setTotal(prev => prev + 1);
      toast({
        title: 'Success',
        description: 'Team member created successfully',
      });
      return newMember;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create team member';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateMember = async (id: string, memberData: Partial<TeamMember>) => {
    try {
      const updatedMember = await cmsApi.updateTeamMember(id, memberData);
      setData(prev => prev.map(item => item._id === id ? updatedMember : item));
      toast({
        title: 'Success',
        description: 'Team member updated successfully',
      });
      return updatedMember;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update team member';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await cmsApi.deleteTeamMember(id);
      setData(prev => prev.filter(item => item._id !== id));
      setTotal(prev => prev - 1);
      toast({
        title: 'Success',
        description: 'Team member deleted successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete team member';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  const bulkCreateMembers = async (members: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>[]) => {
    try {
      const newMembers = await cmsApi.bulkCreateTeamMembers(members);
      setData(prev => [...prev, ...newMembers]);
      setTotal(prev => prev + newMembers.length);
      toast({
        title: 'Success',
        description: `${newMembers.length} team members created successfully`,
      });
      return newMembers;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to bulk create team members';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    members: data,
    loading,
    error,
    total,
    refetch: fetchData,
    createMember,
    updateMember,
    deleteMember,
    bulkCreateMembers,
  };
}

// =============== FILE UPLOAD HOOKS ===============

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const uploadImage = async (file: File, type: 'avatar' | 'team-photo' | 'homepage-image' | 'document') => {
    try {
      setUploading(true);
      setError(null);
      const result = await cmsApi.uploadImage(file, type);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (publicId: string) => {
    try {
      await cmsApi.deleteFile(publicId);
      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete file';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  };

  return {
    uploading,
    error,
    uploadImage,
    deleteFile,
  };
}

// =============== ANALYTICS HOOKS ===============

export function useCMSAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const analytics = await cmsApi.getAnalytics();
      setData(analytics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics: data,
    loading,
    error,
    refetch: fetchAnalytics,
  };
}

// =============== SINGLE ITEM HOOKS ===============

export function useHomepageContentItem(id: string) {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const content = await cmsApi.getHomepageContentById(id);
        setData(content);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch homepage content';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  return { content: data, loading, error };
}

export function useTeamMemberItem(id: string) {
  const [data, setData] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const member = await cmsApi.getTeamMemberById(id);
        setData(member);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team member';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  return { member: data, loading, error };
}