import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Edit, Plus, Upload, Eye } from 'lucide-react';

interface HeroImage {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  buttonText?: string;
  buttonLink?: string;
}

interface Member {
  _id?: string;
  name: string;
  position: string;
  bio?: string;
  imageUrl?: string;
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

const AdminDashboard: React.FC = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Authentication token (you'll need to implement proper auth)
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const [heroImagesRes, membersRes] = await Promise.all([
        apiCall('/connect-hub/admin/hero-images'),
        apiCall('/connect-hub/admin/members'),
      ]);
      
      setHeroImages(heroImagesRes.data || heroImagesRes);
      setMembers(membersRes.data || membersRes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seedInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiCall('/connect-hub/admin/seed-data', {
        method: 'POST',
      });
      setSuccess('Initial data seeded successfully!');
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seed data');
    } finally {
      setLoading(false);
    }
  };

  const deleteHeroImage = async (id: string) => {
    try {
      await apiCall(`/connect-hub/admin/hero-images/${id}`, {
        method: 'DELETE',
      });
      setSuccess('Hero image deleted successfully!');
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete hero image');
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await apiCall(`/connect-hub/admin/members/${id}`, {
        method: 'DELETE',
      });
      setSuccess('Member deleted successfully!');
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete member');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">NAPPS Connect Hub Admin Dashboard</h1>
        <p className="text-gray-600">Manage hero images, team members, and site content</p>
      </div>

      {error && (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Button 
          onClick={seedInitialData} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Seeding...' : 'Seed Initial Data'}
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Click this to populate the database with initial hero images and team members
        </p>
      </div>

      <Tabs defaultValue="hero-images" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hero-images">Hero Images</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="hero-images" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Hero Images</h2>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Hero Image
            </Button>
          </div>

          <div className="grid gap-4">
            {heroImages.map((image) => (
              <Card key={image._id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-gray-600 mb-2">{image.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Order: {image.displayOrder}</span>
                      <span className={`px-2 py-1 rounded ${
                        image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {image.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    {image.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={image.imageUrl} 
                          alt={image.title}
                          className="w-32 h-20 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => image._id && deleteHeroImage(image._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Team Members</h2>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member._id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {member.imageUrl && (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="w-16 h-16 object-cover rounded-full border"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.position}</p>
                      <p className="text-gray-600 text-sm mt-1">{member.bio}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span>Order: {member.displayOrder}</span>
                        <span className={`px-2 py-1 rounded ${
                          member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {member.email && (
                          <span>{member.email}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => member._id && deleteMember(member._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;