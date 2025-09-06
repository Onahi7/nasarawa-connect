import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useHeroImages } from "@/hooks/useHeroImages";
import { useMembers } from "@/hooks/useMembers";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useTeamMembers, useHomepageContent, useCMSAnalytics } from "@/hooks/useCMS";
import adminAPI from "@/services/adminAPI";
import { useState } from "react";
import { 
  Users, 
  Image, 
  Megaphone, 
  Eye, 
  TrendingUp,
  Settings,
  Calendar,
  Activity,
  Crown,
  FileText,
  Layout,
  Star,
  Camera,
  Database
} from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { images: heroImages, loading: heroLoading, refetch: refetchHero } = useHeroImages();
  const { members, loading: membersLoading, refetch: refetchMembers } = useMembers();
  const { announcements, loading: announcementsLoading, refetch: refetchAnnouncements } = useAnnouncements();
  
  // CMS Data
  const { members: cmsMembers, loading: cmsLoading } = useTeamMembers();
  const { content: homepageContent, loading: contentLoading } = useHomepageContent();
  const { analytics, loading: analyticsLoading } = useCMSAnalytics();

  const [seedingData, setSeedingData] = useState(false);

  const handleSeedData = async () => {
    setSeedingData(true);
    try {
      await adminAPI.seedInitialData();
      toast({
        title: "Success",
        description: "Initial data seeded successfully! Hero images and team members have been populated.",
      });
      // Refetch all data
      refetchHero();
      refetchMembers();
      refetchAnnouncements();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to seed initial data",
        variant: "destructive",
      });
    } finally {
      setSeedingData(false);
    }
  };

  const stats = [
    {
      title: "Hero Images",
      value: heroLoading ? "..." : heroImages.length.toString(),
      icon: <Image className="w-6 h-6" />,
      color: "bg-blue-500",
      description: "Active carousel images"
    },
    {
      title: "Team Members",
      value: (membersLoading || cmsLoading) ? "..." : (members.length + cmsMembers.length).toString(),
      icon: <Users className="w-6 h-6" />,
      color: "bg-green-500",
      description: "Leadership profiles"
    },
    {
      title: "Homepage Content",
      value: contentLoading ? "..." : homepageContent.length.toString(),
      icon: <Layout className="w-6 h-6" />,
      color: "bg-purple-500",
      description: "Content sections"
    },
    {
      title: "Announcements",
      value: announcementsLoading ? "..." : announcements.length.toString(),
      icon: <Megaphone className="w-6 h-6" />,
      color: "bg-yellow-500",
      description: "Active notifications"
    }
  ];

  const quickActions = [
    {
      title: "Add Hero Image",
      description: "Upload new carousel image",
      icon: <Image className="w-8 h-8" />,
      href: "/admin/hero-images",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Manage Elder Omaku",
      description: "Update Elder's photos & content",
      icon: <Crown className="w-8 h-8" />,
      href: "/admin/homepage-content",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Add Team Member",
      description: "Create new leadership profile",
      icon: <Users className="w-8 h-8" />,
      href: "/admin/members",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Homepage Content",
      description: "Manage homepage sections",
      icon: <FileText className="w-8 h-8" />,
      href: "/admin/homepage-content",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Create Announcement",
      description: "Post new notification",
      icon: <Megaphone className="w-8 h-8" />,
      href: "/admin/announcements",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      title: "Site Settings",
      description: "Configure portal settings",
      icon: <Settings className="w-8 h-8" />,
      href: "/admin/settings",
      color: "bg-gray-50 text-gray-600"
    }
  ];

  const recentActivity = [
    {
      action: "Homepage content updated",
      description: "Elder Omaku section content modified",
      time: "1 hour ago",
      icon: <Crown className="w-5 h-5" />
    },
    {
      action: "Team member added",
      description: "New leadership profile created via CMS",
      time: "2 hours ago",
      icon: <Users className="w-5 h-5" />
    },
    {
      action: "Hero image uploaded",
      description: "New banner image added to carousel",
      time: "3 hours ago",
      icon: <Image className="w-5 h-5" />
    },
    {
      action: "Announcement created",
      description: "Registration deadline reminder posted",
      time: "5 hours ago",
      icon: <Megaphone className="w-5 h-5" />
    }
  ];

  // CMS Analytics Summary
  const cmsStats = analytics ? [
    {
      title: "Elder Omaku Content",
      value: analytics.sectionBreakdown['elder-omaku'] || 0,
      icon: <Crown className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Featured Members",
      value: analytics.featuredMembers,
      icon: <Star className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Gallery Items",
      value: analytics.sectionBreakdown['gallery'] || 0,
      icon: <Camera className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-800"
    }
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-napps-blue to-napps-green rounded-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
              <p className="text-blue-100">
                Manage your NAPPS portal content, Elder Omaku photos, team members, and homepage sections.
              </p>
            </div>
            <Button 
              onClick={handleSeedData}
              disabled={seedingData}
              className="bg-white text-napps-blue hover:bg-gray-100"
            >
              <Database className="w-4 h-4 mr-2" />
              {seedingData ? 'Seeding...' : 'Seed Initial Data'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3 text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CMS Analytics */}
        {!analyticsLoading && analytics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Content Management Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cmsStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <a
                      key={index}
                      href={action.href}
                      className="block p-4 border rounded-lg hover:shadow-md transition-all hover:border-napps-blue"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          {action.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-green-900">CMS System Operational</h3>
                <p className="text-sm text-green-600">Content management running smoothly</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-blue-900">Active Users</h3>
                <p className="text-sm text-blue-600">125 users online</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-purple-900">Performance</h3>
                <p className="text-sm text-purple-600">Excellent response times</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;