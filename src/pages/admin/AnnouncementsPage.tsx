import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

const AnnouncementsPage = () => {
  const { toast } = useToast();
  const { announcements, refetch } = useAnnouncements();
  
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "success" | "error",
    show_on_all_pages: true,
    background_color: "#1e40af",
    text_color: "#ffffff",
    start_date: "",
    end_date: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('announcements')
        .insert({
          title: formData.title,
          message: formData.message,
          type: formData.type,
          show_on_all_pages: formData.show_on_all_pages,
          background_color: formData.background_color,
          text_color: formData.text_color,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          display_order: announcements.length + 1,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Announcement created successfully",
      });

      setFormData({
        title: "",
        message: "",
        type: "info",
        show_on_all_pages: true,
        background_color: "#1e40af",
        text_color: "#ffffff",
        start_date: "",
        end_date: ""
      });
      setIsCreating(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create announcement",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Announcement ${!currentStatus ? 'activated' : 'deactivated'}`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update announcement",
        variant: "destructive",
      });
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Announcement deleted successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-500">Manage site-wide announcements and notifications</p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-napps-blue hover:bg-napps-blue/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Announcement
          </Button>
        </div>

        {/* Create Form */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Announcement title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "info" | "warning" | "success" | "error") => 
                        setFormData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Announcement message"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="background_color">Background Color</Label>
                    <Input
                      id="background_color"
                      type="color"
                      value={formData.background_color}
                      onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="text_color">Text Color</Label>
                    <Input
                      id="text_color"
                      type="color"
                      value={formData.text_color}
                      onChange={(e) => setFormData(prev => ({ ...prev, text_color: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="start_date">Start Date (Optional)</Label>
                    <Input
                      id="start_date"
                      type="datetime-local"
                      value={formData.start_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End Date (Optional)</Label>
                    <Input
                      id="end_date"
                      type="datetime-local"
                      value={formData.end_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show_on_all_pages"
                    checked={formData.show_on_all_pages}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_on_all_pages: checked }))}
                  />
                  <Label htmlFor="show_on_all_pages">Show on all pages</Label>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">
                    Create Announcement
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Announcements List */}
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="p-4 text-white"
                  style={{
                    backgroundColor: announcement.background_color || '#1e40af',
                    color: announcement.text_color || '#ffffff'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <p className="mt-1 opacity-90">{announcement.message}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm opacity-75">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs uppercase">
                          {announcement.type}
                        </span>
                        {announcement.show_on_all_pages && (
                          <span>📢 All Pages</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleActive(announcement.id, announcement.is_active)}
                        className="text-white hover:bg-white/20"
                      >
                        {announcement.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="text-white hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {announcements.length === 0 && !isCreating && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements yet</h3>
              <p className="text-gray-500 mb-4">Create your first announcement to get started.</p>
              <Button onClick={() => setIsCreating(true)} className="bg-napps-blue hover:bg-napps-blue/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Announcement
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AnnouncementsPage;