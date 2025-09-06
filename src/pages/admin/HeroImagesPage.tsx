import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useHeroImages } from "@/hooks/useHeroImages";
import { Plus, Edit, Trash2, Upload, Eye } from "lucide-react";

const HeroImagesPage = () => {
  const { toast } = useToast();
  const { images, refetch } = useHeroImages();
  
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    call_to_action_text: "",
    call_to_action_url: "",
    display_order: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('hero_images')
        .insert({
          title: formData.title,
          description: formData.subtitle,
          image_url: formData.image_url,
          display_order: formData.display_order,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero image created successfully",
      });

      setFormData({
        title: "",
        subtitle: "",
        image_url: "",
        call_to_action_text: "",
        call_to_action_url: "",
        display_order: 1
      });
      setIsCreating(false);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create hero image",
        variant: "destructive",
      });
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero image?")) return;

    try {
      const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero image deleted successfully",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hero image",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>
            <p className="text-gray-500">Manage homepage carousel images and content</p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-napps-blue hover:bg-napps-blue/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Image
          </Button>
        </div>

        {/* Create Form */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Hero Image</CardTitle>
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
                      placeholder="Hero image title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      type="number"
                      min="1"
                      value={formData.display_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Hero image subtitle or description"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">Image URL *</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="call_to_action_text">CTA Button Text</Label>
                    <Input
                      id="call_to_action_text"
                      value={formData.call_to_action_text}
                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_text: e.target.value }))}
                      placeholder="Learn More"
                    />
                  </div>
                  <div>
                    <Label htmlFor="call_to_action_url">CTA Button URL</Label>
                    <Input
                      id="call_to_action_url"
                      value={formData.call_to_action_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, call_to_action_url: e.target.value }))}
                      placeholder="/about"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-napps-green hover:bg-napps-green/90">
                    Add Hero Image
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

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img 
                  src={image.image_url} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>Order: {image.display_order}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteImage(image.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {images.length === 0 && !isCreating && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No hero images yet</h3>
              <p className="text-gray-500 mb-4">Add your first hero image to get started.</p>
              <Button onClick={() => setIsCreating(true)} className="bg-napps-blue hover:bg-napps-blue/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Hero Image
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default HeroImagesPage;