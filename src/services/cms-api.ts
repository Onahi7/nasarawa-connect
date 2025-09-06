/**
 * CMS API Service for managing homepage content and team members
 * This service connects to the backend CMS controller endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Types for CMS data structures
export interface HomepageContent {
  _id?: string;
  section: 'hero' | 'about' | 'elder-omaku' | 'team' | 'events' | 'gallery' | 'footer';
  title: string;
  subtitle?: string;
  content: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
  displayOrder?: number;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  _id?: string;
  name: string;
  title: string;
  category: 'executive' | 'board' | 'leadership' | 'staff' | 'advisory';
  bio?: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  displayOrder?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface AnalyticsData {
  totalHomepageContent: number;
  totalTeamMembers: number;
  activeContent: number;
  featuredMembers: number;
  sectionBreakdown: Record<string, number>;
  categoryBreakdown: Record<string, number>;
}

class CMSApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/cms`;
  }

  // =============== HOMEPAGE CONTENT MANAGEMENT ===============

  /**
   * Get all homepage content with optional filtering
   */
  async getHomepageContent(params?: {
    section?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ data: HomepageContent[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${this.baseUrl}/homepage?${queryParams}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage content: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get specific homepage content by ID
   */
  async getHomepageContentById(id: string): Promise<HomepageContent> {
    const response = await fetch(`${this.baseUrl}/homepage/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage content: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Create new homepage content
   */
  async createHomepageContent(data: Omit<HomepageContent, '_id' | 'createdAt' | 'updatedAt'>): Promise<HomepageContent> {
    const response = await fetch(`${this.baseUrl}/homepage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create homepage content: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Update existing homepage content
   */
  async updateHomepageContent(id: string, data: Partial<HomepageContent>): Promise<HomepageContent> {
    const response = await fetch(`${this.baseUrl}/homepage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update homepage content: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Delete homepage content
   */
  async deleteHomepageContent(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/homepage/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete homepage content: ${response.statusText}`);
    }
  }

  // =============== TEAM MEMBER MANAGEMENT ===============

  /**
   * Get all team members with optional filtering
   */
  async getTeamMembers(params?: {
    category?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ data: TeamMember[]; total: number }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${this.baseUrl}/team-members?${queryParams}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Get specific team member by ID
   */
  async getTeamMemberById(id: string): Promise<TeamMember> {
    const response = await fetch(`${this.baseUrl}/team-members/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch team member: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Create new team member
   */
  async createTeamMember(data: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> {
    const response = await fetch(`${this.baseUrl}/team-members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create team member: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Update existing team member
   */
  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    const response = await fetch(`${this.baseUrl}/team-members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update team member: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Delete team member
   */
  async deleteTeamMember(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/team-members/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete team member: ${response.statusText}`);
    }
  }

  // =============== FILE UPLOAD MANAGEMENT ===============

  /**
   * Upload image file (avatar, team photo, homepage image)
   */
  async uploadImage(file: File, type: 'avatar' | 'team-photo' | 'homepage-image' | 'document'): Promise<{ url: string; publicId: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await fetch(`${this.baseUrl}/upload-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Delete uploaded file from storage
   */
  async deleteFile(publicId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/delete-file`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.statusText}`);
    }
  }

  // =============== BULK OPERATIONS ===============

  /**
   * Bulk create team members
   */
  async bulkCreateTeamMembers(members: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>[]): Promise<TeamMember[]> {
    const response = await fetch(`${this.baseUrl}/team-members/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ members }),
    });

    if (!response.ok) {
      throw new Error(`Failed to bulk create team members: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Bulk update team members
   */
  async bulkUpdateTeamMembers(updates: { id: string; data: Partial<TeamMember> }[]): Promise<TeamMember[]> {
    const response = await fetch(`${this.baseUrl}/team-members/bulk-update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updates }),
    });

    if (!response.ok) {
      throw new Error(`Failed to bulk update team members: ${response.statusText}`);
    }
    return response.json();
  }

  // =============== ANALYTICS & STATISTICS ===============

  /**
   * Get CMS analytics and statistics
   */
  async getAnalytics(): Promise<AnalyticsData> {
    const response = await fetch(`${this.baseUrl}/analytics`);
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`);
    }
    return response.json();
  }

  // =============== HELPER METHODS ===============

  /**
   * Get available homepage sections
   */
  getHomepageSections(): string[] {
    return ['hero', 'about', 'elder-omaku', 'team', 'events', 'gallery', 'footer'];
  }

  /**
   * Get available team member categories
   */
  getTeamMemberCategories(): string[] {
    return ['executive', 'board', 'leadership', 'staff', 'advisory'];
  }
}

// Create and export singleton instance
export const cmsApi = new CMSApiService();
export default cmsApi;