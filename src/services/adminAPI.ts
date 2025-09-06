// Admin API service for Connect Hub
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => localStorage.getItem('admin_token');

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

export const adminAPI = {
  // Authentication
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    return response.json();
  },

  // Data seeding
  seedInitialData: async () => {
    return apiCall('/connect-hub/admin/seed-data', { method: 'POST' });
  },

  // Hero Images
  getHeroImages: async (query: any = {}) => {
    const params = new URLSearchParams(query).toString();
    return apiCall(`/connect-hub/admin/hero-images${params ? `?${params}` : ''}`);
  },

  createHeroImage: async (data: any) => {
    return apiCall('/connect-hub/admin/hero-images', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateHeroImage: async (id: string, data: any) => {
    return apiCall(`/connect-hub/admin/hero-images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteHeroImage: async (id: string) => {
    return apiCall(`/connect-hub/admin/hero-images/${id}`, { method: 'DELETE' });
  },

  // Members
  getMembers: async (query: any = {}) => {
    const params = new URLSearchParams(query).toString();
    return apiCall(`/connect-hub/admin/members${params ? `?${params}` : ''}`);
  },

  createMember: async (data: any) => {
    return apiCall('/connect-hub/admin/members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateMember: async (id: string, data: any) => {
    return apiCall(`/connect-hub/admin/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteMember: async (id: string) => {
    return apiCall(`/connect-hub/admin/members/${id}`, { method: 'DELETE' });
  },

  // Announcements
  getAnnouncements: async (query: any = {}) => {
    const params = new URLSearchParams(query).toString();
    return apiCall(`/connect-hub/admin/announcements${params ? `?${params}` : ''}`);
  },

  createAnnouncement: async (data: any) => {
    return apiCall('/connect-hub/admin/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateAnnouncement: async (id: string, data: any) => {
    return apiCall(`/connect-hub/admin/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteAnnouncement: async (id: string) => {
    return apiCall(`/connect-hub/admin/announcements/${id}`, { method: 'DELETE' });
  },

  // Site Settings
  getSettings: async () => {
    return apiCall('/connect-hub/admin/settings');
  },

  createSetting: async (data: any) => {
    return apiCall('/connect-hub/admin/settings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateSetting: async (key: string, data: any) => {
    return apiCall(`/connect-hub/admin/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteSetting: async (key: string) => {
    return apiCall(`/connect-hub/admin/settings/${key}`, { method: 'DELETE' });
  },

  // Analytics
  getAnalytics: async () => {
    return apiCall('/connect-hub/admin/analytics');
  },
};

export default adminAPI;