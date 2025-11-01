import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Save, Globe, Mail, Phone, MapPin, Shield } from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();
  const { settings, refetch } = useSiteSettings();
  
  const [formData, setFormData] = useState({
    site_name: "NAPPS Nasarawa",
    site_title: "NAPPS Nasarawa State",
    site_description: "National Association of Proprietors of Private Schools - Nasarawa State Chapter",
    primary_color: "#2563eb",
    secondary_color: "#64748b",
    logo_url: "/logo.png",
    contact_email: "info@nappsnasarawa.com",
    contact_phone: "+234-XXX-XXX-XXXX",
    contact_address: "Lafia, Nasarawa State, Nigeria",
    hero_title: "Welcome to NAPPS Nasarawa State",
    hero_subtitle: "National Association of Proprietors of Private Schools",
    footer_text: "© 2024 NAPPS Nasarawa State. All rights reserved.",
    social_facebook: "",
    social_twitter: "",
    social_instagram: "",
    social_linkedin: "",
    seo_keywords: "NAPPS, Nasarawa, private schools, education, Nigeria",
    google_analytics_id: ""
  });

  useEffect(() => {
    if (settings && settings.length > 0) {
      const settingsObj = settings.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value || '';
        return acc;
      }, {} as Record<string, string>);
      
      setFormData(prev => ({ ...prev, ...settingsObj }));
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert form data to settings array
      const settingsToUpdate = Object.entries(formData).map(([key, value]) => ({
        setting_key: key,
        setting_value: value,
        setting_type: getCategory(key)
      }));

      // Delete existing settings and insert new ones
      const { error: deleteError } = await supabase
        .from('site_settings')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all existing

      if (deleteError) throw deleteError;

      const { error: insertError } = await supabase
        .from('site_settings')
        .insert(settingsToUpdate);

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Site settings updated successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const getCategory = (key: string): string => {
    if (key.startsWith('contact_')) return 'contact';
    if (key.startsWith('social_')) return 'social';
    if (key.startsWith('seo_') || key === 'google_analytics_id') return 'seo';
    if (key.includes('color') || key === 'logo_url') return 'appearance';
    return 'general';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-500">Configure your website settings and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_title">Site Title</Label>
                  <Input
                    id="site_title"
                    value={formData.site_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, site_title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={formData.site_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="footer_text">Footer Text</Label>
                <Input
                  id="footer_text"
                  value={formData.footer_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, footer_text: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Email Address</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Phone Number</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="contact_address">Address</Label>
                <Textarea
                  id="contact_address"
                  value={formData.contact_address}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact_address: e.target.value }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social_facebook">Facebook URL</Label>
                  <Input
                    id="social_facebook"
                    value={formData.social_facebook}
                    onChange={(e) => setFormData(prev => ({ ...prev, social_facebook: e.target.value }))}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div>
                  <Label htmlFor="social_twitter">Twitter URL</Label>
                  <Input
                    id="social_twitter"
                    value={formData.social_twitter}
                    onChange={(e) => setFormData(prev => ({ ...prev, social_twitter: e.target.value }))}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social_instagram">Instagram URL</Label>
                  <Input
                    id="social_instagram"
                    value={formData.social_instagram}
                    onChange={(e) => setFormData(prev => ({ ...prev, social_instagram: e.target.value }))}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
                <div>
                  <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                  <Input
                    id="social_linkedin"
                    value={formData.social_linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, social_linkedin: e.target.value }))}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <Input
                    id="primary_color"
                    type="color"
                    value={formData.primary_color}
                    onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <Input
                    id="secondary_color"
                    type="color"
                    value={formData.secondary_color}
                    onChange={(e) => setFormData(prev => ({ ...prev, secondary_color: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>SEO & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo_keywords">SEO Keywords</Label>
                <Input
                  id="seo_keywords"
                  value={formData.seo_keywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, seo_keywords: e.target.value }))}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              
              <div>
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  value={formData.google_analytics_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, google_analytics_id: e.target.value }))}
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;